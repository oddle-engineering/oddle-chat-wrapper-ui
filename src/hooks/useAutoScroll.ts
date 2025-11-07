import { useEffect, useRef, useCallback, RefObject } from "react";

/**
 * Custom hook for managing auto-scroll behavior
 * 
 * Handles smooth scrolling to the bottom of a scrollable element
 * with optimized animation frame scheduling and cleanup.
 * 
 * @param messagesEndRef - Ref to the element to scroll to
 * @param messages - Messages array that triggers scroll
 * @param streamingContent - Streaming content that triggers scroll (only when non-empty)
 * @returns scrollToBottom function for manual triggering
 */
export function useAutoScroll(
  messagesEndRef: RefObject<HTMLDivElement>,
  messages: any[],
  streamingContent: string
) {
  const scrollAnimationFrame = useRef<number | null>(null);

  const scrollToBottom = useCallback(() => {
    // Cancel any pending scroll animation
    if (scrollAnimationFrame.current) {
      cancelAnimationFrame(scrollAnimationFrame.current);
    }

    // Schedule smooth scroll on next frame
    scrollAnimationFrame.current = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      scrollAnimationFrame.current = null;
    });
  }, [messagesEndRef]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-scroll when streaming content changes (only if there's content)
  useEffect(() => {
    if (streamingContent) {
      scrollToBottom();
    }
  }, [streamingContent, scrollToBottom]);

  // Cleanup scroll animation on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationFrame.current) {
        cancelAnimationFrame(scrollAnimationFrame.current);
      }
    };
  }, []);

  return scrollToBottom;
}
