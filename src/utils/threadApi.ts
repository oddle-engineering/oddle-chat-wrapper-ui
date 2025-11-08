import { Thread, ThreadsResponse, MessagesResponse, Message } from "../types";

/**
 * Fetch user threads from the API
 */
export async function fetchUserThreads(
  apiBaseUrl: string,
  userId: string,
  options?: {
    includeArchived?: boolean;
    limit?: number;
  }
): Promise<Thread[]> {
  const params = new URLSearchParams();
  if (options?.includeArchived) {
    params.append("includeArchived", "true");
  }
  if (options?.limit) {
    params.append("limit", options.limit.toString());
  }

  const url = `${apiBaseUrl}/api/v1/threads/user/${userId}${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to fetch threads",
    }));
    throw new Error(error.error || "Failed to fetch threads");
  }

  const data: ThreadsResponse = await response.json();
  return data.threads;
}

/**
 * Fetch thread by conversation UUID
 */
export async function fetchThreadByConvUuid(
  apiBaseUrl: string,
  convUuid: string
): Promise<Thread> {
  const url = `${apiBaseUrl}/api/v1/threads/conv/${convUuid}`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Thread not found",
    }));
    throw new Error(error.error || "Thread not found");
  }

  return response.json();
}

/**
 * Fetch messages for a thread
 */
export async function fetchThreadMessages(
  apiBaseUrl: string,
  threadId: string,
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<{ messages: Message[]; providerResId?: string }> {
  const url = `${apiBaseUrl}/api/v1/messages/thread/${threadId}?format=client`;

  // Build headers with authentication
  const headers: HeadersInit = {};
  if (authOptions?.userMpAuthToken) {
    headers["x-oddle-mp-auth-token"] = authOptions.userMpAuthToken;
  }
  if (authOptions?.chatServerKey) {
    headers["x-oddle-chat-server-key"] = authOptions.chatServerKey;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to fetch messages",
    }));
    throw new Error(error.error || "Failed to fetch messages");
  }

  const data: MessagesResponse = await response.json();

  // Convert timestamp strings to Date objects
  const messages = data.messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));

  return {
    messages,
    providerResId: data.providerResId,
  };
}

/**
 * Fetch messages for a thread with flexible query parameters (V2)
 *
 * This version allows querying by entityId, userId, or custom metadata
 * instead of requiring a specific threadId. The server will match threads
 * based on the provided query parameters.
 *
 * @param apiBaseUrl - Base URL of the API
 * @param queryParams - Flexible query parameters
 * @param authOptions - Authentication options
 * @returns Messages and optional providerResId
 *
 * @example
 * // Query by entityId and userId
 * const result = await fetchThreadMessagesV2(apiUrl, {
 *   entityId: 'brand_123',
 *   userId: 'user_456'
 * }, authOptions);
 *
 * @example
 * // Query with custom metadata
 * const result = await fetchThreadMessagesV2(apiUrl, {
 *   userId: 'user_456',
 *   metadata: {
 *     orderId: 'order_789',
 *     sessionId: 'session_abc'
 *   }
 * }, authOptions);
 */
export async function fetchThreadMessagesV2(
  apiBaseUrl: string,
  queryParams: {
    userId: string;
    entityId?: string;
    entityType?: string;
    metadata?: Record<string, any>;
  },
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<{ messages: Message[]; providerResId?: string; threadId?: string }> {
  // Build query string from parameters
  const params = new URLSearchParams();

  // Add required userId
  params.append("userId", queryParams.userId);
  params.append("format", "client");

  // Add optional parameters
  if (queryParams.entityId) {
    params.append("entityId", queryParams.entityId);
  }
  if (queryParams.entityType) {
    params.append("entityType", queryParams.entityType);
  }

  // Add metadata as JSON string if provided
  if (queryParams.metadata && Object.keys(queryParams.metadata).length > 0) {
    params.append("metadata", JSON.stringify(queryParams.metadata));
  }

  const url = `${apiBaseUrl}/api/v1/messages/query?${params.toString()}`;

  // Build headers with authentication
  const headers: HeadersInit = {};
  if (authOptions?.userMpAuthToken) {
    headers["x-oddle-mp-auth-token"] = authOptions.userMpAuthToken;
  }
  if (authOptions?.chatServerKey) {
    headers["x-oddle-chat-server-key"] = authOptions.chatServerKey;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to fetch messages",
    }));
    throw new Error(error.error || "Failed to fetch messages");
  }

  const data: MessagesResponse & { threadId?: string } = await response.json();

  // Convert timestamp strings to Date objects
  const messages = data.messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));

  return {
    messages,
    providerResId: data.providerResId,
    threadId: data.threadId, // Server may return the matched threadId
  };
}

/**
 * Update thread properties (attach to entity, update metadata, tag, etc.)
 * 
 * This function allows you to:
 * - Attach a draft thread to an entity (brand/account)
 * - Update thread title, tag, or metadata
 * - Detach thread from entity (set entityId/entityType to null)
 *
 * @param apiBaseUrl - Base URL of the API
 * @param threadId - ID of the thread to update
 * @param updates - Fields to update
 * @param authOptions - Authentication options
 * @returns Updated thread data
 *
 * @example
 * // Attach draft thread to brand
 * const thread = await updateThread(apiUrl, 'thread-123', {
 *   entityId: 'brand_456',
 *   entityType: 'BRAND',
 *   tag: 'customer-inquiry',
 *   metadata: { source: 'widget', priority: 'high' }
 * }, authOptions);
 *
 * @example
 * // Update only metadata
 * const thread = await updateThread(apiUrl, 'thread-123', {
 *   metadata: { status: 'resolved', assignedTo: 'agent-789' }
 * }, authOptions);
 *
 * @example
 * // Detach from entity
 * const thread = await updateThread(apiUrl, 'thread-123', {
 *   entityId: null,
 *   entityType: null
 * }, authOptions);
 */
export async function updateThread(
  apiBaseUrl: string,
  threadId: string,
  updates: {
    title?: string;
    tag?: string | null;
    metadata?: any;
    entityId?: string | null;
    entityType?: string | null;
  },
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<Thread> {
  const url = `${apiBaseUrl}/v1/threads/${threadId}`;

  // Build headers with authentication
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (authOptions?.userMpAuthToken) {
    headers["x-oddle-mp-auth-token"] = authOptions.userMpAuthToken;
  }
  if (authOptions?.chatServerKey) {
    headers["x-oddle-chat-server-key"] = authOptions.chatServerKey;
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to update thread",
    }));
    throw new Error(error.error || "Failed to update thread");
  }

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error || "Failed to update thread");
  }

  return result.data;
}
