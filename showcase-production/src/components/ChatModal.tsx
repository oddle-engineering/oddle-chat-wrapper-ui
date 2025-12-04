import { useEffect, useRef } from "react";
import "./ChatModal.css";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const ChatModal = ({
  isOpen,
  onClose,
  children,
  title = "Chat Assistant",
}: ChatModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-modal-overlay" onClick={handleOverlayClick}>
      <div className="chat-modal-content" ref={modalRef}>
        <div className="chat-modal-header">
          <h2 className="chat-modal-title">{title}</h2>
          <button
            className="chat-modal-close-button"
            onClick={onClose}
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="chat-modal-body">{children}</div>
      </div>
    </div>
  );
};
