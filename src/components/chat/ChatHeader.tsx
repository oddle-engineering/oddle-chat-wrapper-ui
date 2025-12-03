import React from 'react';
import { CloseIcon, FullscreenIcon, CollapseIcon, SettingsIcon } from '../icons';
import { CustomHeaderProps } from '../../types';

interface ChatHeaderProps extends CustomHeaderProps {
  headerName?: string;
  customHeader?: (props: CustomHeaderProps) => React.ReactNode;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  headerName,
  customHeader,
  mode,
  isCollapsed,
  isModalOpen,
  devMode = false,
  onClose,
  onToggleFullscreen,
  onToggleCollapse,
  onOpenSettings,
}) => {
  // If custom header is provided, render it with all control props
  if (customHeader) {
    return (
      <div className="chat-wrapper__header chat-wrapper__header--custom">
        {customHeader({
          mode,
          isCollapsed,
          isModalOpen,
          devMode,
          onClose,
          onToggleFullscreen,
          onToggleCollapse,
          onOpenSettings,
        })}
      </div>
    );
  }

  // Default header implementation
  const renderCloseButton = () => {
    if (mode === "modal" && isModalOpen && onClose) {
      return (
        <button
          className="chat-wrapper__close-button"
          onClick={onClose}
          title="Close chat"
        >
          <CloseIcon size={20} />
        </button>
      );
    }
    return null;
  };

  const renderModeToggleButton = () => {
    if (
      (mode === "sidebar" || mode === "fullscreen") &&
      !isCollapsed &&
      onToggleFullscreen
    ) {
      const isFullscreen = mode === "fullscreen";

      return (
        <button
          className={
            isFullscreen
              ? "chat-wrapper__minimize-button"
              : "chat-wrapper__fullscreen-button"
          }
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Switch to sidebar" : "Switch to fullscreen"}
        >
          <FullscreenIcon size={20} isFullscreen={isFullscreen} />
        </button>
      );
    }
    return null;
  };

  const renderCollapseButton = () => {
    const shouldShow =
      (mode === "sidebar" || mode === "fullscreen") &&
      !isCollapsed &&
      onToggleCollapse;

    if (shouldShow) {
      return (
        <button
          className="chat-wrapper__collapse-button"
          onClick={onToggleCollapse}
          title="Collapse chat"
        >
          <CollapseIcon size={20} />
        </button>
      );
    }
    return null;
  };

  const renderSettingsButton = () => {
    if (!devMode || !onOpenSettings) return null;

    return (
      <button
        className="chat-wrapper__settings-button"
        onClick={onOpenSettings}
        title="Developer Settings"
      >
        <SettingsIcon size={16} />
      </button>
    );
  };

  return (
    <div className="chat-wrapper__header">
      <div className="chat-wrapper__title-area">
        <h2 className="chat-wrapper__title">{headerName}</h2>
      </div>
      <div className="chat-wrapper__header-controls">
        {renderSettingsButton()}
        {renderModeToggleButton()}
        {renderCollapseButton()}
        {renderCloseButton()}
      </div>
    </div>
  );
};