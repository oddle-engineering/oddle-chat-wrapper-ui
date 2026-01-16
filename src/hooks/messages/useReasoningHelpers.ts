import { useCallback } from "react";
import {
  ReasoningDetector,
  REASONING_CONSTANTS,
} from "../../client/constants/reasoning";
import { ProcessingStatus, PROCESSING_STATUS } from "../../constants/chatStatus";
import { useTranslations } from "../../i18n";

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
  const { t } = useTranslations();

  // Determine processing status based on content
  const getReasoningStatus = useCallback(
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
  const getReasoningDuration = useCallback(
    (content: string): string | undefined => {
      return ReasoningDetector.extractDuration(content, t);
    },
    [t]
  );

  // Clean reasoning content (remove markers)
  const getReasoningContentOnly = useCallback(
    (content: string): string => {
      return ReasoningDetector.cleanReasoningContent(content);
    },
    []
  );

  // Get display title for reasoning message
  const getReasoningTitle = useCallback(
    (content: string, isStreaming?: boolean): string => {
      const messageType = ReasoningDetector.getMessageType(
        content,
        isStreaming
      );

      switch (messageType) {
        case REASONING_CONSTANTS.MESSAGE_TYPES.ERROR:
          return t('chat.reasoning.error');
        case REASONING_CONSTANTS.MESSAGE_TYPES.COMPLETED:
          return t('chat.reasoning.completed');
        case REASONING_CONSTANTS.MESSAGE_TYPES.THOUGHT:
          return t('chat.reasoning.thought');
        case REASONING_CONSTANTS.MESSAGE_TYPES.THINKING:
        default:
          return t('chat.reasoning.thinking');
      }
    },
    [t]
  );

  return {
    getReasoningStatus,
    getReasoningDuration,
    getReasoningContentOnly,
    getReasoningTitle,
  };
}
