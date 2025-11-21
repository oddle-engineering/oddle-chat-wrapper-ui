import '../styles/network-status-banner.css';

interface NetworkStatusBannerProps {
  isVisible: boolean;
  isReconnecting?: boolean;
}

export function NetworkStatusBanner({ 
  isVisible, 
  isReconnecting = false 
}: NetworkStatusBannerProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="network-status-banner">
      <div className="network-status-banner__content">
        {isReconnecting ? (
          <>
            <div className="network-status-banner__spinner" />
            <span>Reconnecting...</span>
          </>
        ) : (
          <>
            <div className="network-status-banner__icon">⚠️</div>
            <span>No internet connection</span>
          </>
        )}
      </div>
    </div>
  );
}