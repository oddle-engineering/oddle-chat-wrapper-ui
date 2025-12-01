import { Thread, Message } from "../types";

/**
 * Fetch messages for a thread with flexible query parameters and pagination (V3)
 *
 * This version allows querying by entityId or custom metadata
 * instead of requiring a specific threadId or userId. The server will match threads
 * based on the provided query parameters. The userId is extracted from the
 * userMpAuthToken on the server side.
 *
 * @param apiBaseUrl - Base URL of the API
 * @param queryParams - Flexible query parameters with pagination support
 * @param authOptions - Authentication options
 * @returns Messages, pagination info, and optional providerResId
 *
 * @example
 * // Query by entityId with pagination
 * const result = await fetchThreadMessages(apiUrl, {
 *   entityId: 'brand_123',
 *   limit: 20,
 *   offset: 0
 * }, authOptions);
 *
 * @example
 * // Load older messages
 * const result = await fetchThreadMessages(apiUrl, {
 *   entityId: 'brand_123',
 *   limit: 20,
 *   before: 'message_id_123'
 * }, authOptions);
 */
export async function fetchThreadMessages(
  apiBaseUrl: string,
  queryParams: {
    entityId?: string;
    entityType?: string;
    metadata?: Record<string, any>;
    // Pagination parameters
    limit?: number;
    offset?: number;
    before?: string; // Message ID to fetch messages before (for loading older messages)
    after?: string;  // Message ID to fetch messages after (for loading newer messages)
  },
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<{ 
  messages: Message[]; 
  providerResId?: string; 
  threadId?: string;
  // Pagination metadata
  pagination?: {
    total: number;
    hasMore: boolean;
    nextOffset?: number;
    prevOffset?: number;
  };
}> {
  // Build query string from parameters
  const params = new URLSearchParams();

  // Add format
  params.append("format", "client");

  // Add optional parameters
  if (queryParams.entityId) {
    params.append("entityId", queryParams.entityId);
  }
  if (queryParams.entityType) {
    params.append("entityType", queryParams.entityType);
  }
  console.log("Metadata to append:", queryParams.metadata);
  // Add metadata as JSON string if provided
  if (queryParams.metadata && Object.keys(queryParams.metadata).length > 0) {
    params.append("metadata", JSON.stringify(queryParams.metadata));
  }

  // Add pagination parameters
  if (queryParams.limit !== undefined) {
    params.append("limit", queryParams.limit.toString());
  }
  if (queryParams.offset !== undefined) {
    params.append("offset", queryParams.offset.toString());
  }
  if (queryParams.before) {
    params.append("before", queryParams.before);
  }
  if (queryParams.after) {
    params.append("after", queryParams.after);
  }

  const url = `${apiBaseUrl}/api/v1/messages/query?${params.toString()}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (authOptions?.userMpAuthToken) {
    headers["x-oddle-mp-auth-token"] = authOptions.userMpAuthToken;
  }
  if (authOptions?.chatServerKey) {
    headers["x-oddle-chat-server-key"] = authOptions.chatServerKey;
  }

  console.log("Fetching thread messages from:", url);

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch thread messages: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    messages: data.messages || [],
    providerResId: data.providerResId,
    threadId: data.threadId,
    pagination: data.pagination || {
      total: data.messages?.length || 0,
      hasMore: false,
    },
  };
}

/**
 * Update a thread by providerResId (PATCH)
 *
 * This function allows you to:
 * - Attach a draft thread to an entity (brand/account)
 * - Update thread title, tag, or metadata
 * - Detach thread from entity (set entityId/entityType to null)
 *
 * @param apiBaseUrl - Base URL of the API
 * @param providerResId - Provider resource ID (conversationId) of the thread to update
 * @param updates - Fields to update
 * @param authOptions - Authentication options
 * @returns Updated thread data
 *
 * @example
 * // Attach draft thread to brand
 * const thread = await updateThread(apiUrl, 'conv_abc123', {
 *   entityId: 'brand_456',
 *   entityType: 'BRAND',
 *   tag: 'customer-inquiry',
 *   metadata: { source: 'widget', priority: 'high' }
 * }, authOptions);
 *
 * @example
 * // Update only metadata
 * const thread = await updateThread(apiUrl, 'conv_abc123', {
 *   metadata: { status: 'resolved', assignedTo: 'agent-789' }
 * }, authOptions);
 *
 * @example
 * // Detach from entity
 * const thread = await updateThread(apiUrl, 'conv_abc123', {
 *   entityId: null,
 *   entityType: null
 * }, authOptions);
 */
export async function updateThread(
  apiBaseUrl: string,
  providerResId: string,
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
  const url = `${apiBaseUrl}/api/v1/threads/${providerResId}`;

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

/**
 * Update thread metadata and/or tag (PATCH)
 *
 * This function is specifically for updating the dynamic business context of a thread
 * without changing its entity association. Use this for frequently changing data like:
 * - Order IDs, table IDs, campaign IDs
 * - Status updates, priority changes
 * - Custom app-specific metadata
 *
 * @param apiBaseUrl - Base URL of the API
 * @param providerResId - Provider resource ID (conversationId) of the thread to update
 * @param updates - Metadata and/or tag to update
 * @param authOptions - Authentication options
 * @returns Updated thread data
 *
 * @example
 * // Update metadata with order context
 * const thread = await updateThreadMetadata(apiUrl, 'conv_abc123', {
 *   metadata: { orderId: 'order_789', tableId: 'table_5', status: 'in-progress' }
 * }, authOptions);
 *
 * @example
 * // Update tag and metadata together
 * const thread = await updateThreadMetadata(apiUrl, 'conv_abc123', {
 *   tag: 'high-priority',
 *   metadata: { priority: 'urgent', assignedTo: 'agent-123' }
 * }, authOptions);
 *
 * @example
 * // Clear metadata
 * const thread = await updateThreadMetadata(apiUrl, 'conv_abc123', {
 *   metadata: null
 * }, authOptions);
 */
export async function updateThreadMetadata(
  apiBaseUrl: string,
  providerResId: string,
  updates: {
    tag?: string | null;
    metadata?: any;
  },
  authOptions?: {
    userMpAuthToken?: string;
    chatServerKey?: string;
  }
): Promise<Thread> {
  const url = `${apiBaseUrl}/api/v1/threads/${providerResId}`;

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
      error: "Failed to update thread metadata",
    }));
    throw new Error(error.error || "Failed to update thread metadata");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to update thread metadata");
  }

  return result.data;
}
