import { useTranslations } from '../i18n';
import '../styles/network-status-banner.css';

interface NetworkStatusBannerProps {
  isVisible: boolean;
  isReconnecting?: boolean;
}

export function NetworkStatusBanner({
  isVisible,
  isReconnecting = false
}: NetworkStatusBannerProps) {
  const { t } = useTranslations();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="network-status-banner">
      <div className="network-status-banner__content">
        {isReconnecting ? (
          <>
            <div className="network-status-banner__spinner" />
            <span>{t('chat.connection.reconnecting')}</span>
          </>
        ) : (
          <>
            <div className="network-status-banner__icon">
              <span className="network-status-banner__icon-text">!</span>
            </div>
            <span className="network-status-banner__message">
              {t('chat.errors.connection')}
            </span>
          </>
        )}
      </div>
    </div>
  );
}