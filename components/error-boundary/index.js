"use client";

import React from "react";
import { ErrorBoundaryCore } from "./core";

export default function ErrorBoundary(props) {
  return <ErrorBoundaryCore {...props} />;
}

export function GlobalError({ children }) {
  return (
    <ErrorBoundaryCore
      message="The application encountered an unrecoverable error."
      title="CRITICAL SYSTEM FAILURE"
      variant="full"
    >
      {children}
    </ErrorBoundaryCore>
  );
}

export function ModuleError({ children, name }) {
  return (
    <ErrorBoundaryCore
      message="This module has crashed. Try resetting it."
      title={`${name || "Module"} Failed`}
      variant="module"
    >
      {children}
    </ErrorBoundaryCore>
  );
}

export function ComponentError({ children, message }) {
  return (
    <ErrorBoundaryCore variant="inline" message={message}>
      {children}
    </ErrorBoundaryCore>
  );
}

export function withErrorBoundary(Component, errorProps = {}) {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundaryCore {...errorProps}>
        <Component {...props} />
      </ErrorBoundaryCore>
    );
  };
}
