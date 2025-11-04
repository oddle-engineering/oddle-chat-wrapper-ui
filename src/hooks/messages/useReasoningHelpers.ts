import { useMemo } from "react";
import {
  ReasoningDetector,
  REASONING_CONSTANTS,
} from "../../client/constants/reasoning";
import { ProcessingStatus, PROCESSING_STATUS } from "../../constants/chatStatus";

/**
 * Hook providing reasoning-related helper functions
 * 
 * Responsibilities:
 * - Reasoning status detection
 * - Duration extraction
 * - Content cleaning
 * - Title generation for reasoning messages
 * 
 * All functions are memoized for performance
 */
export function useReasoningHelpers() {
  // Determine processing status based on content
  const getReasoningStatus = useMemo(
    () =>
      (content: string, isStreaming?: boolean): ProcessingStatus => {
        if (isStreaming === false) {
          if (ReasoningDetector.isErrorMessage(content))
            return PROCESSING_STATUS.ERROR;
          return PROCESSING_STATUS.COMPLETED;
        }
        if (ReasoningDetector.isCompletedMessage(content))
          return PROCESSING_STATUS.COMPLETED;
        if (ReasoningDetector.isErrorMessage(content))
          return PROCESSING_STATUS.ERROR;
        return PROCESSING_STATUS.PROCESSING;
      },
    []
  );

  // Extract duration from reasoning content
  const getReasoningDuration = useMemo(
    () =>
      (content: string): string | undefined => {
        return ReasoningDetector.extractDuration(content);
      },
    []
  );

  // Clean reasoning content (remove markers)
  const getReasoningContentOnly = useMemo(
    () =>
      (content: string): string => {
        return ReasoningDetector.cleanReasoningContent(content);
      },
    []
  );

  // Get display title for reasoning message
  const getReasoningTitle = useMemo(
    () =>
      (content: string, isStreaming?: boolean): string => {
        const messageType = ReasoningDetector.getMessageType(
          content,
          isStreaming
        );

        switch (messageType) {
          case REASONING_CONSTANTS.MESSAGE_TYPES.ERROR:
            return "Error";
          case REASONING_CONSTANTS.MESSAGE_TYPES.COMPLETED:
            return "Completed";
          case REASONING_CONSTANTS.MESSAGE_TYPES.THOUGHT:
            return REASONING_CONSTANTS.UI_TEXT.THOUGHT;
          case REASONING_CONSTANTS.MESSAGE_TYPES.THINKING:
          default:
            return REASONING_CONSTANTS.UI_TEXT.THINKING_ELLIPSIS;
        }
      },
    []
  );

  return {
    getReasoningStatus,
    getReasoningDuration,
    getReasoningContentOnly,
    getReasoningTitle,
  };
}
