import { useEffect, useState } from 'react';
import './ConnectionNotification.css';

export interface ConnectionNotificationProps {
  /** Whether the client is connected */
  isConnected: boolean;
  /** Whether initial connection is in progress (fetching ticket) */
  isConnecting?: boolean;
  /** Whether reconnection is in progress */
  isReconnecting?: boolean;
  /** Current reconnection attempt number */
  reconnectAttempt?: number;
  /** Maximum reconnection attempts */
  maxReconnectAttempts?: number;
  /** Callback when user clicks retry */
  onRetry?: () => void;
  /** Auto-hide success messages after this duration (ms) */
  autoHideDuration?: number;
}

type NotificationState = 'connected' | 'disconnected' | 'reconnecting' | 'error' | 'hidden' | 'connecting';

/**
 * ConnectionNotification - Subtle banner notification for connection status
 * 
 * Shows a non-blocking top banner when connection is lost or reconnecting.
 * Chat conversation remains visible and accessible during reconnection.
 * 
 * @example
 * ```tsx
 * <ConnectionNotification
 *   isConnected={isConnected}
 *   isReconnecting={isReconnecting}
 *   reconnectAttempt={2}
 *   maxReconnectAttempts={5}
 *   onRetry={() => connectChatClient()}
 * />
 * ```
 */
export function ConnectionNotification({
  isConnected,
  isConnecting = false,
  isReconnecting = false,
  reconnectAttempt = 0,
  maxReconnectAttempts = Infinity,
  onRetry,
  autoHideDuration = 3000,
}: ConnectionNotificationProps) {
  const [notificationState, setNotificationState] = useState<NotificationState>('hidden');
  const [wasDisconnected, setWasDisconnected] = useState(false);

  useEffect(() => {

    // Track connection state changes
    if (isConnecting) {
      // Initial connection - show loading bubbles
      setNotificationState('connecting');
    } else if (!isConnected && !isReconnecting) {
      // Disconnected - but don't show notification, let reconnecting handle it
      setWasDisconnected(true);
      
      if (maxReconnectAttempts !== Infinity && reconnectAttempt >= maxReconnectAttempts) {
        // Only show error if max attempts reached
        setNotificationState('error');
      } else {
        // Hide notification when just disconnected, wait for reconnecting state
        setNotificationState('hidden');
      }
    } else if (isReconnecting) {
      // Reconnecting - show subtle banner
      setNotificationState('reconnecting');
    } else if (isConnected && wasDisconnected) {
      // Reconnected - hide banner
      setNotificationState('hidden');
      setWasDisconnected(false);
    } else if (isConnected && !wasDisconnected) {
      // Initial connection successful - hide
      setNotificationState('hidden');
    }
  }, [isConnected, isConnecting, isReconnecting, reconnectAttempt, maxReconnectAttempts, wasDisconnected, autoHideDuration]);

  if (notificationState === 'hidden') {
    return null;
  }

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  const getContent = () => {
    switch (notificationState) {
      case 'connecting':
        return {
          icon: '🔄',
          title: 'Connecting...',
          message: 'Establishing connection to the server',
        };
      
      case 'reconnecting':
        return {
          icon: '🔄',
          title: 'Reconnecting...',
          message: maxReconnectAttempts === Infinity 
            ? `Attempting to restore connection (${reconnectAttempt})`
            : `Attempting to restore connection (${reconnectAttempt}/${maxReconnectAttempts})`,
        };
      
      case 'error':
        return {
          icon: '❌',
          title: 'Connection Failed',
          message: 'Unable to connect to the server. Please check your internet connection and try again.',
        };
      
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  // For connecting state, show full overlay with bubbles
  if (notificationState === 'connecting') {
    return (
      <div className={`connection-notification connection-notification--${notificationState}`}>
        <div className="connection-notification__bubbles">
          <div className="connection-notification__bubble"></div>
          <div className="connection-notification__bubble"></div>
          <div className="connection-notification__bubble"></div>
        </div>
      </div>
    );
  }

  // For reconnecting state, show subtle top banner (non-blocking)
  if (notificationState === 'reconnecting') {
    return (
      <div className={`connection-notification connection-notification--banner connection-notification--${notificationState}`}>
        <div className="connection-notification__banner-content">
          <span className="connection-notification__banner-spinner"></span>
          <span className="connection-notification__banner-text">
            Reconnecting... (attempt {reconnectAttempt})
          </span>
        </div>
      </div>
    );
  }

  // For error state, show full overlay with retry button
  return (
    <div className={`connection-notification connection-notification--${notificationState}`}>
      <div className="connection-notification__content">
        <div className="connection-notification__icon">{content.icon}</div>
        <div className="connection-notification__title">{content.title}</div>
        <div className="connection-notification__message">{content.message}</div>
        
        {onRetry && (
          <div className="connection-notification__actions">
            <button
              className="connection-notification__retry-btn primary"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

