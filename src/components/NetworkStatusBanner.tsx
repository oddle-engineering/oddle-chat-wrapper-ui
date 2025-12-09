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
            <div className="network-status-banner__icon">
              <span className="network-status-banner__icon-text">!</span>
            </div>
            <span className="network-status-banner__message">
              No internet connection — please check your network settings and try again
            </span>
          </>
        )}
      </div>
    </div>
  );
}