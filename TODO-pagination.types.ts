/**
 * TypeScript Type Definitions for Message Pagination API
 * 
 * Use these types in your frontend application for type safety
 * 
 * Installation:
 * Copy this file to your project's types directory
 * 
 * Usage:
 * import { PaginatedMessagesResponse, MessagePaginationParams } from './types/pagination';
 */

/**
 * Individual message object returned by the API
 */
export interface Message {
  /** Unique message identifier */
  id: string;
  
  /** Message role: "user", "assistant", or "tooling" */
  role: "user" | "assistant" | "tooling";
  
  /** Message content/text */
  content: string;
  
  /** ISO 8601 timestamp when message was created */
  timestamp: string;
  
  /** Whether the message is currently streaming (for real-time) */
  isStreaming: boolean;
  
  /** Optional array of media URLs (images, files, etc.) */
  media?: string[];
  
  /** Optional tool call data (for tooling messages) */
  toolData?: {
    toolName: string;
    toolInput: any;
    toolOutput?: any;
  };
}

/**
 * Pagination metadata returned with message lists
 */
export interface PaginationInfo {
  /** Whether more messages are available in the requested direction */
  hasMore: boolean;
  
  /** 
   * Cursor to use for loading older messages (scroll up)
   * Pass this as `cursor` param with `direction=before`
   * Will be null if no older messages exist
   */
  nextCursor: string | null;
  
  /** 
   * Cursor to use for loading newer messages (refresh)
   * Pass this as `cursor` param with `direction=after`
   * Will be null if no newer messages exist
   */
  prevCursor: string | null;
}

/**
 * Complete API response for paginated messages
 */
export interface PaginatedMessagesResponse {
  /** Whether the request was successful */
  success: boolean;
  
  /** Array of messages (always in chronological order) */
  messages: Message[];
  
  /** Number of messages returned in this response */
  count: number;
  
  /** Provider conversation ID (if available) */
  providerResId?: string;
  
  /** Pagination metadata */
  pagination: PaginationInfo;
}

/**
 * Error response from the API
 */
export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}

/**
 * Parameters for message pagination queries
 */
export interface MessagePaginationParams {
  /** 
   * Number of messages to return per page
   * Default: 50
   * Maximum: 100
   */
  limit?: number;
  
  /** 
   * Message ID to paginate from
   * Omit for initial load (returns latest messages)
   */
  cursor?: string;
  
  /** 
   * Pagination direction
   * - "before": Load messages older than cursor (scroll up)
   * - "after": Load messages newer than cursor (refresh)
   * Default: "before"
   */
  direction?: "before" | "after";
  
  /** 
   * Response format
   * - "client": Format optimized for UI display
   * - undefined: Raw database format
   */
  format?: "client";
}

/**
 * Hook return type for React/Vue composition
 */
export interface UseMessagePaginationReturn {
  /** Current list of messages (chronological order) */
  messages: Message[];
  
  /** Whether currently loading messages */
  loading: boolean;
  
  /** Whether more messages are available to load */
  hasMore: boolean;
  
  /** Function to load more (older) messages */
  loadMore: () => Promise<void>;
  
  /** Function to refresh (load newer) messages */
  refresh: () => Promise<void>;
  
  /** Function to add a new message (from WebSocket) */
  addMessage: (message: Message) => void;
  
  /** Function to reset/clear all messages */
  reset: () => void;
}

/**
 * Configuration for message pagination hook
 */
export interface MessagePaginationConfig {
  /** Thread ID to load messages from */
  threadId: string;
  
  /** Authentication token */
  authToken: string;
  
  /** User ID for authentication */
  userId: string;
  
  /** API base URL (default: current origin) */
  baseUrl?: string;
  
  /** Initial page size (default: 50) */
  initialLimit?: number;
  
  /** Whether to auto-load on mount (default: true) */
  autoLoad?: boolean;
  
  /** Callback when messages are loaded */
  onMessagesLoaded?: (messages: Message[]) => void;
  
  /** Callback when error occurs */
  onError?: (error: Error) => void;
}

/**
 * Type for API client fetch options
 */
export interface FetchOptions {
  headers: {
    'Authorization': string;
    'x-user-id': string;
    'Content-Type'?: string;
  };
}

/**
 * Helper type for message map (useful for deduplication)
 */
export type MessageMap = Map<string, Message>;

/**
 * Type guard to check if response is an error
 */
export function isErrorResponse(
  response: PaginatedMessagesResponse | ErrorResponse
): response is ErrorResponse {
  return !response.success;
}

/**
 * Type guard to check if message has media
 */
export function hasMedia(message: Message): message is Message & { media: string[] } {
  return Boolean(message.media && message.media.length > 0);
}

/**
 * Type guard to check if message has tool data
 */
export function hasToolData(message: Message): message is Message & { 
  toolData: NonNullable<Message['toolData']> 
} {
  return message.role === "tooling" && Boolean(message.toolData);
}

/**
 * Utility type for sorting messages by timestamp
 */
export type MessageComparator = (a: Message, b: Message) => number;

/**
 * Chronological order comparator (oldest first)
 */
export const chronologicalOrder: MessageComparator = (a, b) => {
  return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
};

/**
 * Reverse chronological order comparator (newest first)
 */
export const reverseChronologicalOrder: MessageComparator = (a, b) => {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
};

/**
 * Example usage in React component
 * 
 * ```typescript
 * import { Message, PaginatedMessagesResponse, MessagePaginationParams } from './types/pagination';
 * 
 * function ChatComponent({ threadId, token, userId }: Props) {
 *   const [messages, setMessages] = useState<Message[]>([]);
 *   const [hasMore, setHasMore] = useState(true);
 *   const [cursor, setCursor] = useState<string | null>(null);
 * 
 *   async function loadMessages(params?: MessagePaginationParams) {
 *     const queryParams = new URLSearchParams({
 *       limit: String(params?.limit || 50),
 *       format: 'client',
 *       ...(params?.cursor && { cursor: params.cursor }),
 *       ...(params?.direction && { direction: params.direction })
 *     });
 * 
 *     const response = await fetch(
 *       `/v1/messages/thread/${threadId}?${queryParams}`,
 *       {
 *         headers: {
 *           'Authorization': `Bearer ${token}`,
 *           'x-user-id': userId
 *         }
 *       }
 *     );
 * 
 *     const data: PaginatedMessagesResponse = await response.json();
 *     
 *     setMessages(prev => [...data.messages, ...prev]);
 *     setHasMore(data.pagination.hasMore);
 *     setCursor(data.pagination.nextCursor);
 *   }
 * 
 *   return (
 *     <div>
 *       {hasMore && <button onClick={() => loadMessages({ cursor })}>Load More</button>}
 *       {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Example usage in Vue component
 * 
 * ```typescript
 * import { ref, Ref } from 'vue';
 * import { Message, PaginatedMessagesResponse } from './types/pagination';
 * 
 * export function useMessages(threadId: string, token: string, userId: string) {
 *   const messages: Ref<Message[]> = ref([]);
 *   const hasMore: Ref<boolean> = ref(true);
 *   const cursor: Ref<string | null> = ref(null);
 *   const loading: Ref<boolean> = ref(false);
 * 
 *   async function loadMore() {
 *     if (!hasMore.value || loading.value) return;
 * 
 *     loading.value = true;
 *     try {
 *       const url = cursor.value
 *         ? `/v1/messages/thread/${threadId}?limit=50&cursor=${cursor.value}&direction=before`
 *         : `/v1/messages/thread/${threadId}?limit=50`;
 * 
 *       const response = await fetch(url, {
 *         headers: {
 *           'Authorization': `Bearer ${token}`,
 *           'x-user-id': userId
 *         }
 *       });
 * 
 *       const data: PaginatedMessagesResponse = await response.json();
 *       
 *       messages.value = [...data.messages, ...messages.value];
 *       hasMore.value = data.pagination.hasMore;
 *       cursor.value = data.pagination.nextCursor;
 *     } finally {
 *       loading.value = false;
 *     }
 *   }
 * 
 *   return { messages, hasMore, loading, loadMore };
 * }
 * ```
 */
