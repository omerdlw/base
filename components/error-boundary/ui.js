"use client";

import React, { useState } from "react";
import { AlertTriangle, RefreshCw, Terminal, Power } from "lucide-react";
import { CN } from "@/lib/utils";

export const ErrorUI = ({
  resetError,
  errorInfo,
  message,
  variant,
  error,
  title,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-error/40 bg-error/10 px-3 py-2 text-sm text-error">
        <AlertTriangle className="h-4 w-4" />
        <span className="font-medium">
          Error: {message || "Component Failed"}
        </span>
        <button
          onClick={resetError}
          className="ml-auto rounded-sm bg-error/20 p-1 hover:bg-error/30"
          title="Retry"
        >
          <RefreshCw className="h-3 w-3" />
        </button>
      </div>
    );
  }

  const isFull = variant === "full";

  return (
    <div
      className={CN(
        "flex flex-col items-center justify-center p-6 text-center",
        isFull
          ? "fixed inset-0 z-50 bg-black/95"
          : "h-full min-h-[300px] w-full rounded-xl bg-black/5"
      )}
    >
      <div className="relative max-w-md w-full">
        <div className="relative overflow-hidden rounded-lg border border-error/30 bg-black/40 p-8 backdrop-blur-sm">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-error/20"></div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error border border-error/20">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
          </div>

          <h2 className="mb-2 text-xl font-bold tracking-tight text-error">
            {title || "SYSTEM FAILURE"}
          </h2>
          <p className="mb-6 text-sm text-neutral-400">
            {message ||
              error?.message ||
              "A critical system error has occurred."}
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetError}
              className="group flex items-center gap-2 rounded-lg bg-error px-4 py-2 text-sm font-medium text-white transition-all hover:bg-error"
            >
              <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
              Retry System
            </button>

            {isFull && (
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <Power className="h-4 w-4" />
                Reboot
              </button>
            )}
          </div>

          <div className="mt-8 border-t border-neutral-800 pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex w-full items-center justify-between text-xs text-neutral-500 hover:text-neutral-300"
            >
              <span className="flex items-center gap-2">
                <Terminal className="h-3 w-3" />
                DIAGNOSTIC LOGS
              </span>
              <span>{showDetails ? "HIDE" : "SHOW"}</span>
            </button>

            {showDetails && (
              <div className="mt-3 max-h-48 overflow-auto rounded border border-neutral-800 bg-black p-3 text-left font-mono text-[10px] text-red-400/80 scrollbar-thin scrollbar-thumb-neutral-800">
                <div className="mb-2 font-bold text-error">
                  &gt; {error?.toString()}
                </div>
                {errorInfo?.componentStack?.split("\n").map((line, i) => (
                  <div key={i} className="opacity-70">
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
