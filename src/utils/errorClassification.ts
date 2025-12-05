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

  // Check for connection refused / server unreachable first
  // These are network errors that should be retried
  if (
    errorMessage.includes('connection refused') ||
    errorMessage.includes('econnrefused') ||
    errorMessage.includes('err_connection_refused') ||
    errorMessage.includes('network request failed') ||
    errorMessage.includes('failed to connect')
  ) {
    return {
      isRetryable: true,
      reason: 'Server unreachable or connection refused',
      errorType: 'network'
    };
  }

  // Generic "Failed to fetch" needs more context
  // If it's truly a CORS error, there would be other indicators
  // Otherwise, it's likely a network/connection issue
  if (errorName === 'typeerror' && errorMessage.includes('failed to fetch')) {
    // Check if there are CORS-specific indicators
    if (
      errorMessage.includes('cors') ||
      errorMessage.includes('cross-origin') ||
      errorMessage.includes('blocked by cors')
    ) {
      return {
        isRetryable: false,
        reason: 'CORS policy blocking request',
        errorType: 'cors'
      };
    }
    
    // Otherwise, treat as network/connection issue (server might be down)
    return {
      isRetryable: true,
      reason: 'Network error - server may be unreachable',
      errorType: 'network'
    };
  }

  // Explicit CORS errors - should NOT retry
  if (
    errorMessage.includes('cors') ||
    errorMessage.includes('cross-origin') ||
    errorMessage.includes('blocked by cors')
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
    errorMessage.includes('expired token') ||
    errorMessage.includes('expired authentication') ||
    errorMessage.includes('access denied') ||
    errorMessage.includes('ticket expired') ||
    errorMessage.includes('invalid ticket') ||
    errorMessage.includes('ticket revoked') ||
    errorMessage.includes('ticket not found') ||
    errorMessage.includes('user not found') ||
    errorMessage.includes('entity not found') ||
    errorMessage.includes('permission denied') ||
    errorMessage.includes('invalid credentials')
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