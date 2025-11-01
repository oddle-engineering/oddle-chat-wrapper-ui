import { Component, ReactNode } from 'react';

interface FileUploadErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  failedFiles?: string[];
}

interface FileUploadErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, failedFiles?: string[]) => void;
  onRetry?: () => void;
  allowRetry?: boolean;
}

export class FileUploadErrorBoundary extends Component<FileUploadErrorBoundaryProps, FileUploadErrorBoundaryState> {
  constructor(props: FileUploadErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<FileUploadErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error) {
    console.error('FileUploadErrorBoundary caught an error:', error);
    
    // Extract failed file information from error if available
    const failedFiles = this.extractFailedFiles(error);
    
    this.setState({ failedFiles });

    if (this.props.onError) {
      this.props.onError(error, failedFiles);
    }
  }

  private extractFailedFiles(error: Error): string[] {
    // Try to extract file names from error message
    const fileNamePattern = /file[s]?\s*['":]?\s*([^,\n]+)/gi;
    const matches = error.message.match(fileNamePattern);
    
    if (matches) {
      return matches.map(match => match.replace(/file[s]?\s*['":]?\s*/i, '').trim());
    }
    
    return [];
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      failedFiles: undefined,
    });

    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  handleDismiss = () => {
    this.setState({
      hasError: false,
      error: undefined,
      failedFiles: undefined,
    });
  };

  render() {
    const { hasError, error, failedFiles } = this.state;
    const { children, allowRetry = true } = this.props;

    if (hasError && error) {
      const isFileUploadError = error.message.includes('upload') ||
                               error.message.includes('file') ||
                               error.message.includes('attachment');

      if (isFileUploadError) {
        return (
          <div className="chat-wrapper__file-upload-error">
            <div className="chat-wrapper__error-content">
              <div className="chat-wrapper__error-icon">📁</div>
              <h3 className="chat-wrapper__error-title">File Upload Error</h3>
              <p className="chat-wrapper__error-message">
                {this.getFileUploadErrorMessage(error)}
              </p>
              
              {failedFiles && failedFiles.length > 0 && (
                <div className="chat-wrapper__failed-files">
                  <p className="chat-wrapper__failed-files-title">Failed files:</p>
                  <ul className="chat-wrapper__failed-files-list">
                    {failedFiles.map((fileName, index) => (
                      <li key={index} className="chat-wrapper__failed-file">
                        {fileName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="chat-wrapper__error-actions">
                {allowRetry && (
                  <button
                    className="chat-wrapper__error-retry"
                    onClick={this.handleRetry}
                    type="button"
                  >
                    Try Again
                  </button>
                )}
                <button
                  className="chat-wrapper__error-dismiss"
                  onClick={this.handleDismiss}
                  type="button"
                >
                  Continue Without Files
                </button>
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

  private getFileUploadErrorMessage(error: Error): string {
    if (error.message.includes('size') || error.message.includes('large')) {
      return 'File size is too large. Please try with smaller files.';
    }
    
    if (error.message.includes('type') || error.message.includes('format')) {
      return 'File type is not supported. Please try with different file types.';
    }
    
    if (error.message.includes('network') || error.message.includes('connection')) {
      return 'Network error during upload. Please check your connection and try again.';
    }
    
    if (error.message.includes('timeout')) {
      return 'Upload timed out. Please try again with smaller files or better connection.';
    }
    
    return 'Failed to upload files. Please try again.';
  }
}