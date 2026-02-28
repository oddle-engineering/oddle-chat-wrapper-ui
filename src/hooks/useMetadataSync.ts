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
 * Check if metadata has at least one non-null value
 */
function hasValidMetadataValues(metadata: any): boolean {
  if (!metadata || typeof metadata !== 'object') return false;

  const keys = Object.keys(metadata);
  if (keys.length === 0) return false;

  // Check if at least one value is not null/undefined
  return keys.some(key => metadata[key] != null);
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
  const pendingUpdateRef = useRef<Promise<void> | null>(null);
  const lastSentMetadataRef = useRef<any>(undefined);
  const lastProviderResIdRef = useRef<string | null>(null);

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
      lastProviderResIdRef.current = currentProviderResId;
      return;
    }

    // Detect transition from draft to existing thread (thread just created)
    // Only consider it "just created" if we transitioned from draft state (no messages)
    // If messages exist, it means the thread was loaded from server, not newly created
    const threadJustCreated = !lastProviderResIdRef.current && currentProviderResId && messages.length === 0;

    // Check if metadata has changed
    const metadataChanged = lastMetadataRef.current !== metadata;

    // For thread just created scenario: sync metadata even if reference hasn't changed
    // This handles the case where metadata was set before thread creation
    // Skip this if thread was loaded from server (messages.length > 0)
    if (threadJustCreated) {
      console.log('[useMetadataSync] 🆕 Thread just created, syncing initial metadata');
      lastProviderResIdRef.current = currentProviderResId;

      // Check if we have valid metadata to sync
      const hasValidMetadata = hasValidMetadataValues(metadata);

      if (hasValidMetadata && lastSentMetadataRef.current !== metadata) {
        console.log('[useMetadataSync] 📤 Syncing metadata to newly created thread:', metadata);

        // Make the update call for the newly created thread
        const updatePromise = chatClient
          .updateMetadata(currentProviderResId, { metadata })
          .then(() => {
            console.log('[useMetadataSync] ✅ Initial metadata synced successfully');
            lastMetadataRef.current = metadata;
            lastSentMetadataRef.current = metadata;
            pendingUpdateRef.current = null;
          })
          .catch((error: any) => {
            console.error(
              "[useMetadataSync] ❌ Failed to sync initial metadata to new thread:",
              error
            );
            pendingUpdateRef.current = null;
          });

        pendingUpdateRef.current = updatePromise;
      }
      return;
    }

    // Update providerResId tracking
    lastProviderResIdRef.current = currentProviderResId;

    if (!metadataChanged) {
      return;
    }

    // Check if new metadata is meaningful (has at least one non-null value)
    const hasValidMetadata = hasValidMetadataValues(metadata);

    if (!hasValidMetadata) {
      // Update tracking ref but don't make API call for null-only metadata
      lastMetadataRef.current = metadata;
      return;
    }

    // Handle metadata update based on state
    if (isDraftState) {
      // Case 1: Draft state - track metadata, will be applied during thread creation
      console.log('[useMetadataSync] 📝 Draft state: tracking metadata for future sync');
      lastMetadataRef.current = metadata;
    } else if (isExistingThread) {
      // Case 2: Existing thread - make immediate API call
      console.log('[useMetadataSync] 🔄 Existing thread: updating metadata');

      // Deduplication: Check if this exact metadata was already sent
      if (lastSentMetadataRef.current === metadata) {
        return;
      }

      // Deduplication: If there's already a pending update, wait for it to complete
      if (pendingUpdateRef.current) {
        pendingUpdateRef.current.finally(() => {
          // After pending update completes, check if we still need to update
          if (lastSentMetadataRef.current !== metadata) {
            const updatePromise = chatClient
              .updateMetadata(currentProviderResId, { metadata })
              .then(() => {
                console.log('[useMetadataSync] ✅ Metadata updated successfully (queued)');
                lastMetadataRef.current = metadata;
                lastSentMetadataRef.current = metadata;
                pendingUpdateRef.current = null;
              })
              .catch((error: any) => {
                console.error(
                  "[useMetadataSync] ❌ Failed to update existing thread metadata:",
                  error
                );
                pendingUpdateRef.current = null;
              });

            pendingUpdateRef.current = updatePromise;
          }
        });
        return;
      }

      // Make the update call
      const updatePromise = chatClient
        .updateMetadata(currentProviderResId, { metadata })
        .then(() => {
          console.log('[useMetadataSync] ✅ Metadata updated successfully');
          lastMetadataRef.current = metadata;
          lastSentMetadataRef.current = metadata;
          pendingUpdateRef.current = null;
        })
        .catch((error: any) => {
          console.error(
            "[useMetadataSync] ❌ Failed to update existing thread metadata:",
            error
          );
          pendingUpdateRef.current = null;
        });

      pendingUpdateRef.current = updatePromise;
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
