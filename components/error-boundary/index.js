"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";

class ErrorBoundaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });

        if (this.props.showToast) {
            this.props.showToast(
                this.props.errorMessage || error.message || "An error occurred",
                "ERROR",
            );
        }

        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        if (this.props.logError) {
            this.props.logError(error, errorInfo);
        }

        if (process.env.NODE_ENV === "development") {
            console.error("Error Boundary caught an error:", error, errorInfo);
        }
    }

    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });

        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback({
                    error: this.state.error,
                    errorInfo: this.state.errorInfo,
                    resetError: this.resetError,
                });
            }

            if (this.props.showFallback) {
                return (
                    <div className="w-full h-full min-h-[400px] flex items-center justify-center p-8">
                        <div className="max-w-md w-full bg-error/10 dark:bg-error/20 border border-error/30 dark:border-error/40 rounded-primary p-6 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/20 dark:bg-error/40 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-error"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-error mb-2">
                                {this.props.title || "An Error Occurred"}
                            </h3>
                            <p className="text-sm text-error/80 dark:text-error/70 mb-4">
                                {this.props.errorMessage ||
                                    this.state.error?.message ||
                                    "An unexpected error occurred Please try again"}
                            </p>
                            {this.props.showResetButton && (
                                <button
                                    onClick={this.resetError}
                                    className="px-4 py-2 bg-error hover:bg-error/90 dark:bg-error dark:hover:bg-error/90 text-white rounded-secondary font-medium transition-colors"
                                >
                                    {this.props.resetButtonText || "Try Again"}
                                </button>
                            )}
                            {process.env.NODE_ENV === "development" &&
                                this.state.errorInfo && (
                                    <details className="mt-4 text-left">
                                        <summary className="cursor-pointer text-sm text-error hover:text-error/80 dark:hover:text-error/70">
                                            Error Details Dev Mode
                                        </summary>
                                        <pre className="mt-2 text-xs text-error/90 dark:text-error/80 bg-error/10 dark:bg-error/20 p-3 rounded overflow-auto max-h-60">
                                            {
                                                this.state.errorInfo
                                                    .componentStack
                                            }
                                        </pre>
                                    </details>
                                )}
                        </div>
                    </div>
                );
            }

            return this.props.children;
        }

        return this.props.children;
    }
}

export default function ErrorBoundary({
    showFallback = true,
    showToast = true,
    children,
    ...props
}) {
    const toast = useToast();

    return (
        <ErrorBoundaryClass
            showToast={showToast ? toast?.showToast : null}
            showFallback={showFallback}
            {...props}
        >
            {children}
        </ErrorBoundaryClass>
    );
}

export function PageErrorBoundary({ children, ...props }) {
    return (
        <ErrorBoundary
            title="Page Could Not Be Loaded"
            errorMessage="An error occurred while loading the page Please refresh the page"
            onReset={() => window.location.reload()}
            resetButtonText="Refresh Page"
            showResetButton={true}
            showFallback={true}
            {...props}
        >
            {children}
        </ErrorBoundary>
    );
}

export function ComponentErrorBoundary({ children, componentName, ...props }) {
    return (
        <ErrorBoundary
            errorMessage={`An error occurred while loading ${componentName || "this component"}`}
            title={`${componentName || "Component"} Error`}
            showResetButton={true}
            showFallback={true}
            {...props}
        >
            {children}
        </ErrorBoundary>
    );
}

export function SilentErrorBoundary({ children, ...props }) {
    return (
        <ErrorBoundary showFallback={false} showToast={true} {...props}>
            {children}
        </ErrorBoundary>
    );
}

export function CustomErrorBoundary({ children, fallback, ...props }) {
    return (
        <ErrorBoundary fallback={fallback} showFallback={false} {...props}>
            {children}
        </ErrorBoundary>
    );
}

export function ApiErrorBoundary({ children, ...props }) {
    const handleError = (error, errorInfo) => {
        console.log("API Error:", error);
    };

    const handleReset = () => {
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    return (
        <ErrorBoundary
            errorMessage="An error occurred while loading data Please try again"
            title="Data Could Not Be Loaded"
            resetButtonText="Reload"
            showResetButton={true}
            onReset={handleReset}
            onError={handleError}
            showFallback={true}
            {...props}
        >
            {children}
        </ErrorBoundary>
    );
}
