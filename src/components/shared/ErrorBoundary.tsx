"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallbackMessage?: string;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

const DEFAULT_MESSAGE =
  "A courtroom malfunction has occurred. Please refresh to continue.";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error("[ErrorBoundary] Caught error:", error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12 px-4">
          <span
            className="text-4xl mb-4 block"
            role="img"
            aria-label="Warning"
          >
            &#x26A0;&#xFE0F;
          </span>
          <h2 className="text-xl font-serif font-bold text-amber-200 mb-2">
            Order in the Court!
          </h2>
          <p className="text-amber-400/70 text-sm font-serif mb-6 max-w-md mx-auto">
            {this.props.fallbackMessage ?? DEFAULT_MESSAGE}
          </p>
          <button
            onClick={this.handleReset}
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-white rounded font-serif transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
