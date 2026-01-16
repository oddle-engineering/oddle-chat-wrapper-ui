import { useCallback } from "react";
import { REASONING_CONSTANTS } from "../../client/constants/reasoning";
import { ProcessingStatus, PROCESSING_STATUS } from "../../constants/chatStatus";
import { useTranslations } from "../../i18n";

/**
 * Hook providing tooling-related helper functions
 *
 * Responsibilities:
 * - Tool status detection
 * - Title generation for tool messages
 *
 * All functions are memoized for performance
 */
export function useToolingHelpers() {
  const { t } = useTranslations();

  // Get display title for tooling message
  const getToolingTitle = useCallback(
    (content: string, isStreaming?: boolean): string => {
      if (isStreaming === false) {
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
          return t('chat.tools.failed');
        return t('chat.tools.completed');
      }
      if (
        content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
        content.includes("✅")
      )
        return t('chat.tools.completed');
      if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
        return t('chat.tools.failed');
      if (content.includes(REASONING_CONSTANTS.HANDLING_MARKER))
        return t('chat.tools.executing');
      return t('chat.tools.executing');
    },
    [t]
  );

  // Determine processing status for tool
  const getToolingStatus = useCallback(
    (content: string, isStreaming?: boolean): ProcessingStatus => {
      if (isStreaming === false) {
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
          return PROCESSING_STATUS.ERROR;
        return PROCESSING_STATUS.COMPLETED;
      }
      if (
        content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
        content.includes("✅")
      )
        return PROCESSING_STATUS.COMPLETED;
      if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
        return PROCESSING_STATUS.ERROR;
      return PROCESSING_STATUS.PROCESSING;
    },
    []
  );

  return {
    getToolingTitle,
    getToolingStatus,
  };
}
