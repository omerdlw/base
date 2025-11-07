import { HTTP_STATUS } from "@/config/constants";

export class ApiClient {
    constructor(config = {}) {
        this.baseURL = config.baseURL || "";
        this.timeout = config.timeout || 30000;
        this.headers = config.headers || {};
        this.interceptors = {
            request: [],
            response: [],
            error: [],
        };

        this.headers = {
            "Content-Type": "application/json",
            ...this.headers,
        };
    }

    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
        return this;
    }

    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
        return this;
    }

    addErrorInterceptor(interceptor) {
        this.interceptors.error.push(interceptor);
        return this;
    }

    async runRequestInterceptors(config) {
        let modifiedConfig = { ...config };

        for (const interceptor of this.interceptors.request) {
            modifiedConfig = await interceptor(modifiedConfig);
        }

        return modifiedConfig;
    }

    async runResponseInterceptors(response) {
        let modifiedResponse = response;

        for (const interceptor of this.interceptors.response) {
            modifiedResponse = await interceptor(modifiedResponse);
        }

        return modifiedResponse;
    }

    async runErrorInterceptors(error) {
        let modifiedError = error;

        for (const interceptor of this.interceptors.error) {
            modifiedError = await interceptor(modifiedError);
        }

        return modifiedError;
    }

    createTimeoutController() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        return { controller, timeoutId };
    }

    async request(endpoint, options = {}) {
        try {
            const url = endpoint.startsWith("http")
                ? endpoint
                : `${this.baseURL}${endpoint}`;

            let config = {
                method: options.method || "GET",
                headers: {
                    ...this.headers,
                    ...options.headers,
                },
                ...options,
            };

            if (options.body) {
                if (config.headers["Content-Type"] === "application/json") {
                    config.body = JSON.stringify(options.body);
                } else if (options.body instanceof FormData) {
                    delete config.headers["Content-Type"];
                    config.body = options.body;
                } else {
                    config.body = options.body;
                }
            }

            const { controller, timeoutId } = this.createTimeoutController();
            config.signal = controller.signal;

            config = await this.runRequestInterceptors(config);

            let response = await fetch(url, config);

            clearTimeout(timeoutId);

            response = await this.runResponseInterceptors(response);

            const data = await this.parseResponse(response);

            if (!response.ok) {
                throw new ApiError(
                    data.message || `HTTP ${response.status} Error`,
                    response.status,
                    data,
                    response,
                );
            }

            return {
                data,
                status: response.status,
                headers: response.headers,
                ok: response.ok,
            };
        } catch (error) {
            if (error.name === "AbortError") {
                const timeoutError = new ApiError(
                    "Request timeout",
                    408,
                    null,
                    null,
                );
                throw await this.runErrorInterceptors(timeoutError);
            }

            if (error instanceof ApiError) {
                throw await this.runErrorInterceptors(error);
            }

            const networkError = new ApiError(
                error.message || "Network error",
                0,
                null,
                null,
            );
            throw await this.runErrorInterceptors(networkError);
        }
    }

    async parseResponse(response) {
        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
            try {
                return await response.json();
            } catch {
                return null;
            }
        }

        if (contentType?.includes("text/")) {
            return await response.text();
        }

        if (contentType?.includes("application/octet-stream")) {
            return await response.blob();
        }

        // Fallback
        try {
            return await response.json();
        } catch {
            return await response.text();
        }
    }

    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: "GET" });
    }

    async post(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: "POST", body });
    }

    async put(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: "PUT", body });
    }

    async patch(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: "PATCH", body });
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: "DELETE" });
    }

    async upload(endpoint, formData, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "POST",
            body: formData,
            headers: {
                ...options.headers,
            },
        });
    }

    async all(requests) {
        return Promise.all(requests);
    }

    setBaseURL(baseURL) {
        this.baseURL = baseURL;
        return this;
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    removeHeader(key) {
        delete this.headers[key];
        return this;
    }

    setAuthToken(token, type = "Bearer") {
        this.setHeader("Authorization", `${type} ${token}`);
        return this;
    }

    removeAuthToken() {
        this.removeHeader("Authorization");
        return this;
    }
}

export class ApiError extends Error {
    constructor(message, status, data = null, response = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
        this.response = response;
    }

    isStatus(status) {
        return this.status === status;
    }

    isClientError() {
        return this.status >= 400 && this.status < 500;
    }

    isServerError() {
        return this.status >= 500 && this.status < 600;
    }

    isNetworkError() {
        return this.status === 0;
    }

    isTimeoutError() {
        return this.status === 408;
    }

    isUnauthorized() {
        return this.status === HTTP_STATUS.UNAUTHORIZED;
    }

    isForbidden() {
        return this.status === HTTP_STATUS.FORBIDDEN;
    }

    isNotFound() {
        return this.status === HTTP_STATUS.NOT_FOUND;
    }
}

export const apiClient = new ApiClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "",
    timeout: 30000,
});

export async function withRetry(fn, options = {}) {
    const {
        maxRetries = 3,
        delay = 1000,
        backoff = 2,
        shouldRetry = (error) =>
            error.isServerError() || error.isNetworkError(),
    } = options;

    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (attempt === maxRetries) {
                throw error;
            }

            if (!shouldRetry(error)) {
                throw error;
            }

            const waitTime = delay * Math.pow(backoff, attempt);
            await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
    }

    throw lastError;
}

class ApiCache {
    constructor(ttl = 5 * 60 * 1000) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    generateKey(endpoint, params = {}) {
        return `${endpoint}:${JSON.stringify(params)}`;
    }

    set(key, value, ttl = this.ttl) {
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + ttl,
        });
    }

    get(key) {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return entry.value;
    }

    clear() {
        this.cache.clear();
    }

    delete(key) {
        this.cache.delete(key);
    }

    clearPattern(pattern) {
        const regex = new RegExp(pattern);
        for (const key of this.cache.keys()) {
            if (regex.test(key)) {
                this.cache.delete(key);
            }
        }
    }
}

export const apiCache = new ApiCache();

export async function withCache(fn, cacheKey, ttl) {
    const cached = apiCache.get(cacheKey);
    if (cached) {
        return cached;
    }

    const result = await fn();
    apiCache.set(cacheKey, result, ttl);

    return result;
}
