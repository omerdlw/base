"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import ToastContainer from "@/components/toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = "INFO", duration = 3000) => {
        const id = Date.now().toString();
        const newToast = { id, message, type, duration };
        setToasts((prevToasts) => [newToast, ...prevToasts]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id),
        );
    }, []);

    const value = useMemo(
        () => ({
            showToast,
            removeToast,
            toasts,
        }),
        [toasts, showToast, removeToast],
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastProvider");
    }
    return context;
};
