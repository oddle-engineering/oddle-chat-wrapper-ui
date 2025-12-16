import { useEffect, useRef } from "react";

interface UseMetadataSyncProps {
  metadata?: any;
  chatClient: any;
  currentProviderResId: string | null;
  isLoadingConversation: boolean;
  messages?: any[];
  entityId?: string;
  entityType?: string;
}

/**
 * Hook to handle metadata synchronization across all scenarios:
 *
 * Case 1 — Draft + Empty Metadata:
 * - Draft state: no providerResId, no messages
 * - Tracks metadata changes, waits for thread creation
 *
 * Case 2 — Thread exists + Metadata prop changes:
 * - Thread exists: has providerResId
 * - Makes immediate API calls for metadata updates
 *
 * Case 3 — Thread loaded with metadata:
 * - Handled by conversation loader, no action needed here
 */
export function useMetadataSync({
  metadata,
  chatClient,
  currentProviderResId,
  isLoadingConversation,
  messages = [],
  entityId,
  entityType,
}: UseMetadataSyncProps) {
  const lastMetadataRef = useRef<any>(undefined);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Skip during conversation loading to avoid overwriting existing metadata
    if (isLoadingConversation) {
      return;
    }

    // Skip if we don't have a chat client
    if (!chatClient) {
      return;
    }

    // Determine state: draft vs existing thread
    const isDraftState = !currentProviderResId && messages.length === 0;
    const isExistingThread = !!currentProviderResId;

    // For draft state, need entity info to eventually make API calls
    if (isDraftState && (!entityId || !entityType)) {
      return;
    }

    // For existing thread, need providerResId
    if (isExistingThread && !currentProviderResId) {
      return;
    }

    // Mark as initialized
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      lastMetadataRef.current = metadata;
      return;
    }

    // Check if metadata has changed
    const metadataChanged = lastMetadataRef.current !== metadata;

    if (!metadataChanged) {
      return;
    }

    // Check if new metadata is meaningful
    const hasNewMetadata = metadata && Object.keys(metadata).length > 0;

    if (!hasNewMetadata) {
      lastMetadataRef.current = metadata;
      return;
    }

    // Handle metadata update based on state
    if (isDraftState) {
      // Case 1: Draft state - track metadata, will be applied during thread creation

      lastMetadataRef.current = metadata;
    } else if (isExistingThread) {
      // Case 2: Existing thread - make immediate API call

      chatClient
        .updateMetadata(currentProviderResId, { metadata })
        .then(() => {
          lastMetadataRef.current = metadata;
        })
        .catch(() => {
          // Silent failure - metadata sync is not critical
        });
    }
  }, [
    metadata,
    currentProviderResId,
    chatClient,
    isLoadingConversation,
    messages.length,
    entityId,
    entityType,
  ]);

  return {
    // Debug info
    lastMetadata: lastMetadataRef.current,
    hasInitialized: hasInitializedRef.current,
    isDraftState: !currentProviderResId && messages.length === 0,
    isExistingThread: !!currentProviderResId,
  };
}
