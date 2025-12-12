import React from "react";
import { CloseIcon, FullscreenIcon, CollapseIcon } from "../icons";
import { ChatMode } from "../../types";

interface ChatHeaderProps {
  headerName: string;
  mode: ChatMode;
  isCollapsed: boolean;
  isModalOpen?: boolean;
  onClose?: () => void;
  onToggleFullscreen?: () => void;
  onToggleCollapse?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  headerName,
  mode,
  isCollapsed,
  isModalOpen,
  onClose,
  onToggleFullscreen,
  onToggleCollapse,
}) => {
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

  return (
    <div className="chat-wrapper__header">
      <div className="chat-wrapper__title-area">
        <h2 className="chat-wrapper__title">{headerName}</h2>
      </div>
      <div className="chat-wrapper__header-controls">
        {renderModeToggleButton()}
        {renderCollapseButton()}
        {renderCloseButton()}
      </div>
    </div>
  );
};
