import React from 'react';

interface ChatMainHeaderProps {
  headerName: string;
  headerDescription?: string;
  welcomeHeader?: () => React.ReactNode;
}

export const ChatMainHeader: React.FC<ChatMainHeaderProps> = ({
  headerName,
  headerDescription,
  welcomeHeader,
}) => {
  // Custom welcome header takes precedence
  if (welcomeHeader) {
    return welcomeHeader();
  }

  // Default welcome header implementation
  return (
    <div className="chat-wrapper__main-header">
      <h1 className="chat-wrapper__main-title">{headerName}</h1>
      {headerDescription && (
        <p className="chat-wrapper__description">
          {headerDescription}
        </p>
      )}
    </div>
  );
};