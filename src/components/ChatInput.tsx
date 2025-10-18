import { useState, useCallback } from "react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  ChatStatus,
} from "./PromptInput";
import { sanitizeMessage, sanitizeFileName } from "../utils/security";

interface ChatInputProps {
  placeholder?: string;
  disabled?: boolean;
  chatStatus: ChatStatus;
  uploadedMedia: string[];
  fileUploadEnabled?: boolean;
  onSubmit: (message: string, media: string[]) => void;
  onFileUpload: (files: File[]) => void;
  onClearMedia: () => void;
  onStopGeneration?: () => void;
}

export const ChatInput = ({
  placeholder = "What would you like to know?",
  disabled = false,
  chatStatus,
  uploadedMedia,
  fileUploadEnabled = false,
  onSubmit,
  onFileUpload,
  onClearMedia,
  onStopGeneration,
}: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const rawMessage = formData.get("message") as string;
      
      if (rawMessage?.trim()) {
        // Sanitize the user message for security
        const sanitizedMessage = sanitizeMessage(rawMessage.trim(), false);
        
        // Check if sanitization removed everything
        if (!sanitizedMessage.trim()) {
          console.warn('Message was blocked due to security concerns');
          // Optionally show user feedback
          return;
        }
        
        onSubmit(sanitizedMessage, uploadedMedia);
        setInput("");
        onClearMedia();
      }
    },
    [onSubmit, uploadedMedia, onClearMedia]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    // For real-time input, we can be less strict than final submission
    // Just prevent the most dangerous content while typing
    const sanitizedValue = rawValue
      .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
    
    setInput(sanitizedValue);
  }, []);

  const handleFileUploadClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,text/*,.pdf,.doc,.docx";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        // Validate and sanitize file names for security
        const validFiles = Array.from(files).filter(file => {
          const sanitizedName = sanitizeFileName(file.name);
          if (sanitizedName !== file.name) {
            console.warn(`File name sanitized: ${file.name} -> ${sanitizedName}`);
          }
          
          // Check file size (limit to 10MB)
          if (file.size > 10 * 1024 * 1024) {
            console.warn(`File too large: ${file.name} (${file.size} bytes)`);
            return false;
          }
          
          // Basic file type validation
          const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'text/plain', 'text/csv',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ];
          
          if (!allowedTypes.includes(file.type)) {
            console.warn(`File type not allowed: ${file.name} (${file.type})`);
            return false;
          }
          
          return true;
        });
        
        if (validFiles.length > 0) {
          onFileUpload(validFiles);
        }
      }
    };
    input.click();
  }, [onFileUpload]);

  return (
    <PromptInput onSubmit={handleSubmit}>
      <PromptInputTextarea
        name="message"
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <PromptInputToolbar>
        <PromptInputTools>
          {fileUploadEnabled && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PromptInputButton
                variant="ghost"
                size="icon"
                onClick={handleFileUploadClick}
                title={
                  uploadedMedia.length > 0
                    ? `${uploadedMedia.length} file(s) attached`
                    : "Attach files"
                }
                disabled={disabled}
                style={{
                  position: "relative",
                  color: uploadedMedia.length > 0 ? "#3b82f6" : undefined,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49L13.1 2.41a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83L15.9 5.24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {uploadedMedia.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "50%",
                      width: "12px",
                      height: "12px",
                      fontSize: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {uploadedMedia.length > 9 ? "9+" : uploadedMedia.length}
                  </span>
                )}
              </PromptInputButton>
              <span
                onClick={handleFileUploadClick}
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginLeft: "4px",
                  cursor: "pointer",
                }}
              >
                {uploadedMedia.length > 0
                  ? `${uploadedMedia.length} file(s)`
                  : "Upload files"}
              </span>
            </div>
          )}
        </PromptInputTools>
        <PromptInputSubmit
          status={chatStatus}
          disabled={!input.trim() && chatStatus !== "streaming"}
          onClick={
            chatStatus === "streaming" && onStopGeneration
              ? () => {
                  onStopGeneration();
                }
              : undefined
          }
        />
      </PromptInputToolbar>
    </PromptInput>
  );
};