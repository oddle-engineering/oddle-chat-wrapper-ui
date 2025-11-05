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
): Promise<Message[]> {
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
  return data.messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
}

/**
 * Fetch messages by conversation UUID
 */
export async function fetchMessagesByConvUuid(
  apiBaseUrl: string,
  convUuid: string
): Promise<Message[]> {
  const url = `${apiBaseUrl}/api/v1/messages/conv/${convUuid}?format=client`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to fetch messages",
    }));
    throw new Error(error.error || "Failed to fetch messages");
  }

  const data: MessagesResponse = await response.json();

  // Convert timestamp strings to Date objects
  return data.messages.map((msg) => ({
    ...msg,
    timestamp: new Date(msg.timestamp),
  }));
}

/**
 * Create a new thread
 */
export async function createThread(
  apiBaseUrl: string,
  userId: string,
  convUuid: string,
  options?: {
    title?: string;
    agentType?: string;
  }
): Promise<Thread> {
  const url = `${apiBaseUrl}/api/v1/threads`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      convUuid,
      title: options?.title || "New conversation",
      agentType: options?.agentType || "shop",
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Failed to create thread",
    }));
    throw new Error(error.error || "Failed to create thread");
  }

  return response.json();
}
