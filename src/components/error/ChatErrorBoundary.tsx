import React, { Component, ReactNode } from 'react';
import { chatUtils } from '../../utils/chatUtils';

interface ChatErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ChatErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number | boolean>;
}

export class ChatErrorBoundary extends Component<ChatErrorBoundaryProps, ChatErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ChatErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChatErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error for debugging
    console.error('ChatErrorBoundary caught an error:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ChatErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error boundary if resetKeys have changed
    if (hasError && resetOnPropsChange && resetKeys) {
      const prevResetKeys = prevProps.resetKeys || [];
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevResetKeys[index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  resetErrorBoundary = () => {
    // Clear any existing timeout
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  handleRetry = () => {
    // Add a small delay to prevent immediate re-render issues
    this.resetTimeoutId = window.setTimeout(() => {
      this.resetErrorBoundary();
    }, 100);
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.handleRetry);
      }

      // Default fallback UI
      return (
        <div className="chat-wrapper__error-boundary">
          <div className="chat-wrapper__error-content">
            <div className="chat-wrapper__error-icon">⚠️</div>
            <h3 className="chat-wrapper__error-title">Something went wrong</h3>
            <p className="chat-wrapper__error-message">
              {chatUtils.error.getUserFriendlyErrorMessage(error)}
            </p>
            <div className="chat-wrapper__error-actions">
              <button
                className="chat-wrapper__error-retry"
                onClick={this.handleRetry}
                type="button"
              >
                Try Again
              </button>
            </div>
            {import.meta.env?.DEV && (
              <details className="chat-wrapper__error-details">
                <summary>Error Details (Development)</summary>
                <pre className="chat-wrapper__error-stack">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}