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
 * ConnectionNotification - Full overlay notification for connection status
 * 
 * Displays a full-screen overlay when connection is lost, blocking interaction
 * until connection is restored or user manually retries.
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
  maxReconnectAttempts = 5,
  onRetry,
  autoHideDuration = 3000,
}: ConnectionNotificationProps) {
  const [notificationState, setNotificationState] = useState<NotificationState>('hidden');
  const [wasDisconnected, setWasDisconnected] = useState(false);

  useEffect(() => {
    // Track connection state changes
    if (isConnecting) {
      // Initial connection - show loading
      setNotificationState('connecting');
    } else if (!isConnected && !isReconnecting) {
      // Disconnected
      setWasDisconnected(true);
      
      if (reconnectAttempt >= maxReconnectAttempts) {
        setNotificationState('error');
      } else {
        setNotificationState('disconnected');
      }
    } else if (isReconnecting) {
      // Reconnecting
      setNotificationState('reconnecting');
    } else if (isConnected && wasDisconnected) {
      // Reconnected - hide immediately for overlay
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
      
      case 'disconnected':
        return {
          icon: '⚠️',
          title: 'Connection Lost',
          message: 'The connection to the server was interrupted. Your messages cannot be sent until the connection is restored.',
        };
      
      case 'reconnecting':
        return {
          icon: '🔄',
          title: 'Reconnecting...',
          message: `Attempting to restore connection (${reconnectAttempt}/${maxReconnectAttempts})`,
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

  // For connecting state, show only bubbles
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

  return (
    <div className={`connection-notification connection-notification--${notificationState}`}>
      <div className="connection-notification__content">
        <div className="connection-notification__icon">{content.icon}</div>
        <div className="connection-notification__title">{content.title}</div>
        <div className="connection-notification__message">{content.message}</div>
        
        {notificationState === 'reconnecting' && (
          <div className="connection-notification__actions">
            <button className="connection-notification__retry-btn primary" disabled>
              <span className="connection-notification__spinner"></span>
              Reconnecting...
            </button>
          </div>
        )}
        
        {(notificationState === 'error' || notificationState === 'disconnected') && onRetry && (
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

