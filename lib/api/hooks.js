"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiClient, ApiError } from "./client";
import { useToast } from "@/hooks/use-toast";

export function useApi(options = {}) {
  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = "Operation successful",
    errorMessage,
  } = options;

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (apiCall) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();

        if (showSuccessToast) {
          toast.success(successMessage);
        }

        onSuccess?.(result);
        return result;
      } catch (err) {
        const apiError =
          err instanceof ApiError ? err : new ApiError(err.message, 0);
        setError(apiError);

        if (showErrorToast) {
          const message = errorMessage || apiError.message || "Bir hata oluştu";
          toast.error(message);
        }

        onError?.(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [
      onSuccess,
      onError,
      showErrorToast,
      showSuccessToast,
      successMessage,
      errorMessage,
      toast,
    ]
  );

  return { execute, loading, error };
}

export function useQuery(endpoint, options = {}) {
  const {
    enabled = true,
    params = {},
    refetchInterval,
    refetchOnMount = true,
    refetchOnFocus = false,
    onSuccess,
    onError,
    showErrorToast = true,
    cacheTime = 5 * 60 * 1000,
    staleTime = 0,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();
  const mountedRef = useRef(true);
  const cacheRef = useRef(new Map());
  const lastFetchRef = useRef(null);

  const cacheKey = `${endpoint}:${JSON.stringify(params)}`;

  const fetchData = useCallback(
    async (showLoadingState = true) => {
      if (!enabled) return;

      const now = Date.now();
      const lastFetch = lastFetchRef.current;
      if (lastFetch && now - lastFetch < staleTime) {
        return;
      }

      const cached = cacheRef.current.get(cacheKey);
      if (cached && now - cached.timestamp < cacheTime) {
        setData(cached.data);
        return;
      }

      if (showLoadingState && !data) {
        setLoading(true);
      }
      setIsFetching(true);
      setError(null);

      try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        const response = await apiClient.get(url);

        if (!mountedRef.current) return;

        setData(response.data);
        lastFetchRef.current = Date.now();

        cacheRef.current.set(cacheKey, {
          data: response.data,
          timestamp: Date.now(),
        });

        onSuccess?.(response.data);
      } catch (err) {
        if (!mountedRef.current) return;

        const apiError =
          err instanceof ApiError ? err : new ApiError(err.message, 0);
        setError(apiError);

        if (showErrorToast) {
          toast.error(apiError.message || "Veri yüklenirken hata oluştu");
        }

        onError?.(apiError);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
          setIsFetching(false);
        }
      }
    },
    [
      endpoint,
      params,
      enabled,
      onSuccess,
      onError,
      showErrorToast,
      toast,
      cacheKey,
      cacheTime,
      staleTime,
      data,
    ]
  );

  useEffect(() => {
    if (refetchOnMount) {
      fetchData();
    }
  }, [endpoint, JSON.stringify(params), enabled]);

  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    const interval = setInterval(() => {
      fetchData(false);
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [refetchInterval, enabled, fetchData]);

  useEffect(() => {
    if (!refetchOnFocus || !enabled) return;

    const handleFocus = () => {
      if (document.visibilityState === "visible") {
        fetchData(false);
      }
    };

    document.addEventListener("visibilitychange", handleFocus);
    return () => document.removeEventListener("visibilitychange", handleFocus);
  }, [refetchOnFocus, enabled, fetchData]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cacheRef.current.delete(cacheKey);
    lastFetchRef.current = null;
  }, [cacheKey]);

  return {
    data,
    loading,
    error,
    isFetching,
    refetch,
    invalidate,
    isSuccess: !loading && !error && data !== null,
    isError: !loading && error !== null,
    isLoading: loading,
  };
}
