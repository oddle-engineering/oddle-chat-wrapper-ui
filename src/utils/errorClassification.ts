/**
 * Error classification for connection and ticket retry logic
 * Helps distinguish between retryable (network) and non-retryable (CORS, auth) errors
 */

export interface ErrorClassification {
  isRetryable: boolean;
  reason: string;
  errorType: 'network' | 'cors' | 'auth' | 'permission' | 'server' | 'unknown';
}

/**
 * Classify an error to determine if it should be retried
 */
export function classifyError(error: any): ErrorClassification {
  const errorMessage = error?.message?.toLowerCase() || '';
  const errorName = error?.name?.toLowerCase() || '';

  // CORS errors - should NOT retry
  if (
    errorMessage.includes('cors') ||
    errorMessage.includes('cross-origin') ||
    errorMessage.includes('blocked by cors') ||
    errorName === 'typeerror' && errorMessage.includes('fetch')
  ) {
    return {
      isRetryable: false,
      reason: 'CORS error detected',
      errorType: 'cors'
    };
  }

  // Authentication/Authorization errors - should NOT retry
  if (
    errorMessage.includes('unauthorized') ||
    errorMessage.includes('forbidden') ||
    errorMessage.includes('authentication') ||
    errorMessage.includes('invalid token') ||
    errorMessage.includes('access denied')
  ) {
    return {
      isRetryable: false,
      reason: 'Authentication/authorization error',
      errorType: 'auth'
    };
  }

  // HTTP status-based errors
  if (error?.status || (error?.response && typeof error.response === 'object')) {
    const status = error.status || error.response?.status;
    
    if (status === 401 || status === 403) {
      return {
        isRetryable: false,
        reason: `HTTP ${status} - authentication/permission denied`,
        errorType: 'auth'
      };
    }
    
    if (status === 404) {
      return {
        isRetryable: false,
        reason: 'HTTP 404 - endpoint not found',
        errorType: 'permission'
      };
    }

    if (status >= 400 && status < 500) {
      return {
        isRetryable: false,
        reason: `HTTP ${status} - client error`,
        errorType: 'permission'
      };
    }

    if (status >= 500) {
      return {
        isRetryable: true,
        reason: `HTTP ${status} - server error (temporary)`,
        errorType: 'server'
      };
    }
  }

  // Network-related errors - should retry
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes('connection') ||
    errorMessage.includes('offline') ||
    errorName === 'networkerror'
  ) {
    return {
      isRetryable: true,
      reason: 'Network connectivity issue',
      errorType: 'network'
    };
  }

  // WebSocket-specific errors
  if (
    errorMessage.includes('websocket') ||
    errorMessage.includes('ws') ||
    errorName === 'websocketerror'
  ) {
    return {
      isRetryable: true,
      reason: 'WebSocket connection issue',
      errorType: 'network'
    };
  }

  // Default to non-retryable for unknown errors to be safe
  return {
    isRetryable: false,
    reason: 'Unknown error type',
    errorType: 'unknown'
  };
}

/**
 * Enhanced error logging with classification
 */
export function logClassifiedError(error: any, context: string): ErrorClassification {
  const classification = classifyError(error);
  
  console.error(`[${context}] Error occurred:`, {
    error: error?.message || error,
    classification,
    shouldRetry: classification.isRetryable
  });
  
  return classification;
}