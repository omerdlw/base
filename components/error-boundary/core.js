"use client";

import React from "react";
import { ErrorUI } from "./ui";

export class ErrorBoundaryCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === "development") {
      console.error(":: SYSTEM FAILURE ::", error);
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
        if (typeof this.props.fallback === "function") {
          return this.props.fallback({
            error: this.state.error,
            resetError: this.resetError,
          });
        }
        return this.props.fallback;
      }

      return (
        <ErrorUI
          errorInfo={this.state.errorInfo}
          variant={this.props.variant}
          resetError={this.resetError}
          message={this.props.message}
          error={this.state.error}
          title={this.props.title}
        />
      );
    }

    return this.props.children;
  }
}
