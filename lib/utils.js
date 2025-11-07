import { REGEX_PATTERNS, DATE_FORMATS } from "@/config/constants";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function CN(...inputs) {
    return twMerge(clsx(inputs));
}

export function CAPITALIZE_FIRST_LETTER(string) {
    if (!string || typeof string !== "string") {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function TRUNCATE_TEXT(text, maxLength, suffix = "...") {
    if (!text || text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

export function FORMAT_DATE(
    dateString,
    options = DATE_FORMATS.FULL,
    locale = "en-US",
) {
    if (!dateString) {
        return "";
    }

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return date.toLocaleDateString(locale, options);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "";
    }
}

export function GET_RELATIVE_TIME(dateString) {
    if (!dateString) {
        return "";
    }

    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
            }
        }

        return "just now";
    } catch (error) {
        console.error("Error calculating relative time:", error);
        return "";
    }
}

export function IS_VALID_URL(url) {
    if (!url || typeof url !== "string") {
        return false;
    }
    return REGEX_PATTERNS.URL.test(url);
}

export function IS_VALID_EMAIL(email) {
    if (!email || typeof email !== "string") {
        return false;
    }
    return REGEX_PATTERNS.EMAIL.test(email);
}

export function IS_BROWSER() {
    return typeof window !== "undefined";
}

export function GET_STORAGE_ITEM(key, defaultValue = null) {
    if (!IS_BROWSER()) {
        return defaultValue;
    }

    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage (${key}):`, error);
        return defaultValue;
    }
}

export function SET_STORAGE_ITEM(key, value) {
    if (!IS_BROWSER()) {
        return false;
    }

    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing to localStorage (${key}):`, error);
        return false;
    }
}

export function REMOVE_STORAGE_ITEM(key) {
    if (!IS_BROWSER()) {
        return false;
    }

    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing from localStorage (${key}):`, error);
        return false;
    }
}

export function GROUP_BY(array, keyFn) {
    if (!Array.isArray(array)) {
        return {};
    }

    return array.reduce((result, item) => {
        const key = keyFn(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {});
}

export function UNIQUE_ARRAY(array, keyFn) {
    if (!Array.isArray(array)) {
        return [];
    }

    if (!keyFn) {
        return [...new Set(array)];
    }

    const seen = new Set();
    return array.filter((item) => {
        const key = keyFn(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

export function DEEP_CLONE(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Array) {
        return obj.map((item) => DEEP_CLONE(item));
    }

    if (obj instanceof Object) {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = DEEP_CLONE(obj[key]);
            }
        }
        return clonedObj;
    }
}

export function DEBOUNCE(func, wait = 300) {
    let timeoutId;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeoutId);
            func(...args);
        };

        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
    };
}

export function FORMAT_NUMBER(num) {
    if (typeof num !== "number" || isNaN(num)) {
        return "0";
    }
    return num.toLocaleString();
}

export function GET_NEXT_ROUNDED_LEVEL(rounded) {
    const roundedLevels = ["primary", "secondary", "tertiary"];
    const currentIndex = roundedLevels.indexOf(rounded);
    if (currentIndex === -1 || currentIndex === roundedLevels.length - 1) {
        return rounded;
    }
    return roundedLevels[currentIndex + 1];
}
