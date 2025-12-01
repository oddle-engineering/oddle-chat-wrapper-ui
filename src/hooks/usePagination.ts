import { useState, useCallback, useRef } from 'react';
import { Message } from '../types';
import { fetchThreadMessages } from '../utils/threadApi';

interface UsePaginationProps {
  entityId?: string;
  entityType?: string;
  httpApiUrl: string;
  userMpAuthToken: string;
  chatServerKey: string;
  metadata?: any;
  pageSize?: number;
}

interface PaginationState {
  loading: boolean;
  hasMore: boolean;
  total: number;
  error: string | null;
}

export function usePagination({
  entityId,
  entityType,
  httpApiUrl,
  userMpAuthToken,
  chatServerKey,
  metadata,
  pageSize = 10,
}: UsePaginationProps) {
  const [state, setState] = useState<PaginationState>({
    loading: false,
    hasMore: true,
    total: 0,
    error: null,
  });

  const currentOffsetRef = useRef(0);
  const loadedMessageIdsRef = useRef(new Set<string>());

  const loadMoreMessages = useCallback(async (
    currentMessages: Message[]
  ): Promise<{ messages: Message[]; shouldPrepend: boolean }> => {
    if (!entityId || !httpApiUrl || !userMpAuthToken || !chatServerKey) {
      console.warn('usePagination: Missing required parameters for loading more messages');
      return { messages: [], shouldPrepend: false };
    }

    if (state.loading || !state.hasMore) {
      return { messages: [], shouldPrepend: false };
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Get the oldest message ID for "before" pagination
      const oldestMessage = currentMessages[0];
      const beforeMessageId = oldestMessage?.id;

      console.log('usePagination: Loading more messages', {
        beforeMessageId,
        pageSize,
        currentOffset: currentOffsetRef.current,
      });

      const response = await fetchThreadMessages(
        httpApiUrl,
        {
          entityId,
          entityType,
          metadata,
          limit: pageSize,
          offset: currentOffsetRef.current,
          before: beforeMessageId, // Load messages before the oldest current message
        },
        {
          userMpAuthToken,
          chatServerKey,
        }
      );

      console.log(`usePagination: Loaded ${response.messages.length} more messages`);

      // Filter out any messages we already have (deduplication)
      const newMessages = response.messages.filter(
        message => !loadedMessageIdsRef.current.has(message.id)
      );

      // Update loaded message IDs
      newMessages.forEach(message => {
        loadedMessageIdsRef.current.add(message.id);
      });

      // Update pagination state
      setState(prev => ({
        ...prev,
        loading: false,
        hasMore: response.pagination?.hasMore ?? false,
        total: response.pagination?.total ?? prev.total,
      }));

      // Update offset for next load
      if (response.pagination?.nextOffset !== undefined) {
        currentOffsetRef.current = response.pagination.nextOffset;
      } else {
        currentOffsetRef.current += pageSize;
      }

      return { 
        messages: newMessages.reverse(), // Reverse to maintain chronological order when prepending
        shouldPrepend: true 
      };

    } catch (error) {
      console.error('usePagination: Error loading more messages:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load more messages',
      }));
      return { messages: [], shouldPrepend: false };
    }
  }, [entityId, entityType, httpApiUrl, userMpAuthToken, chatServerKey, metadata, pageSize, state.loading, state.hasMore]);

  const reset = useCallback(() => {
    setState({
      loading: false,
      hasMore: true,
      total: 0,
      error: null,
    });
    currentOffsetRef.current = 0;
    loadedMessageIdsRef.current.clear();
  }, []);

  const initializeWithMessages = useCallback((messages: Message[]) => {
    // Track initial message IDs
    loadedMessageIdsRef.current.clear();
    messages.forEach(message => {
      loadedMessageIdsRef.current.add(message.id);
    });
    
    // Assume if we got fewer messages than pageSize, we're at the beginning
    const hasMore = messages.length >= pageSize;
    setState(prev => ({
      ...prev,
      hasMore,
      total: messages.length,
    }));
  }, [pageSize]);

  return {
    ...state,
    loadMoreMessages,
    reset,
    initializeWithMessages,
  };
}