import { useMemo } from "react";
import { REASONING_CONSTANTS } from "../../client/constants/reasoning";
import { ProcessingStatus, PROCESSING_STATUS } from "../../constants/chatStatus";

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
  // Get display title for tooling message
  const getToolingTitle = useMemo(
    () =>
      (content: string, isStreaming?: boolean): string => {
        if (isStreaming === false) {
          if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
            return "Tool Error";
          return "Tool Completed";
        }
        if (
          content.includes(REASONING_CONSTANTS.COMPLETED_MARKER) ||
          content.includes("✅")
        )
          return "Tool Completed";
        if (content.includes(REASONING_CONSTANTS.ERROR_MARKER))
          return "Tool Error";
        if (content.includes(REASONING_CONSTANTS.HANDLING_MARKER))
          return "Tool Processing...";
        return "Tool Processing...";
      },
    []
  );

  // Determine processing status for tool
  const getToolingStatus = useMemo(
    () =>
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
