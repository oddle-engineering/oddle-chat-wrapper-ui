import { Component, ReactNode } from 'react';
import { chatUtils } from '../../utils/chatUtils';

interface WebSocketErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  isRetrying: boolean;
}

interface WebSocketErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
  onRetry?: () => void;
  maxRetries?: number;
  retryDelay?: number;
}

export class WebSocketErrorBoundary extends Component<WebSocketErrorBoundaryProps, WebSocketErrorBoundaryState> {
  private retryCount = 0;
  private retryTimeoutId: number | null = null;

  constructor(props: WebSocketErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      isRetrying: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<WebSocketErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error) {
    console.error('WebSocketErrorBoundary caught an error:', error);
    
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    const { maxRetries = 3, retryDelay = 1000, onRetry } = this.props;

    if (this.retryCount >= maxRetries) {
      console.warn('Max retry attempts reached for WebSocket connection');
      return;
    }

    this.setState({ isRetrying: true });
    this.retryCount++;

    this.retryTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        isRetrying: false,
      });

      if (onRetry) {
        onRetry();
      }
    }, retryDelay * this.retryCount); // Exponential backoff
  };

  handleManualReset = () => {
    this.retryCount = 0;
    this.setState({
      hasError: false,
      error: undefined,
      isRetrying: false,
    });

    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    const { hasError, error, isRetrying } = this.state;
    const { children, maxRetries = 3 } = this.props;

    if (hasError && error) {
      const isWebSocketError = error.message.includes('WebSocket') ||
                              error.message.includes('connection') ||
                              chatUtils.error.isNetworkError(error);

      if (isWebSocketError) {
        return (
          <div className="chat-wrapper__websocket-error">
            <div className="chat-wrapper__error-content">
              <div className="chat-wrapper__error-icon">🔌</div>
              <h3 className="chat-wrapper__error-title">Connection Error</h3>
              <p className="chat-wrapper__error-message">
                Unable to establish connection to the chat server.
              </p>
              <div className="chat-wrapper__error-actions">
                {isRetrying ? (
                  <div className="chat-wrapper__error-retrying">
                    <span>Reconnecting...</span>
                    <div className="chat-wrapper__spinner"></div>
                  </div>
                ) : (
                  <>
                    {this.retryCount < maxRetries && (
                      <button
                        className="chat-wrapper__error-retry"
                        onClick={this.handleRetry}
                        type="button"
                      >
                        Retry Connection ({maxRetries - this.retryCount} attempts left)
                      </button>
                    )}
                    <button
                      className="chat-wrapper__error-reset"
                      onClick={this.handleManualReset}
                      type="button"
                    >
                      Reset Connection
                    </button>
                  </>
                )}
              </div>
              {(() => {
                try {
                  return (import.meta as any).env?.DEV;
                } catch {
                  return false;
                }
              })() && (
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
    }

    return children;
  }
}