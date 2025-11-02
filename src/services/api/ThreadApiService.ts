import { BaseApiService, AuthOptions } from './BaseApiService';

/**
 * Thread and message management service
 */

export interface Thread {
  id: string;
  userId: string;
  convUuid: string;
  title: string;
  agentType: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived?: boolean;
}

export interface Message {
  id: string;
  threadId: string;
  role: "user" | "assistant" | "system" | "reasoning" | "tooling";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  media?: string[];
  toolData?: {
    toolName: string;
    callId: string;
    parameters?: Record<string, any>;
    result?: any;
    status?: "processing" | "completed" | "error";
  };
}

export interface ThreadsResponse {
  threads: Thread[];
}

export interface MessagesResponse {
  messages: Message[];
}

export interface CreateThreadRequest {
  userId: string;
  convUuid: string;
  title?: string;
  agentType?: string;
}

export interface FetchThreadsOptions {
  includeArchived?: boolean;
  limit?: number;
}

export class ThreadApiService extends BaseApiService {
  /**
   * Fetch user threads with optional filters
   */
  async fetchUserThreads(
    userId: string,
    options: FetchThreadsOptions = {},
    authOptions?: AuthOptions
  ): Promise<Thread[]> {
    const params = new URLSearchParams();
    if (options.includeArchived) {
      params.append("includeArchived", "true");
    }
    if (options.limit) {
      params.append("limit", options.limit.toString());
    }

    const endpoint = `/api/threads/user/${userId}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await this.get<ThreadsResponse>(endpoint, authOptions);
    return response.threads;
  }

  /**
   * Fetch thread by conversation UUID
   */
  async fetchThreadByConvUuid(convUuid: string, authOptions?: AuthOptions): Promise<Thread> {
    return this.get<Thread>(`/api/threads/conv/${convUuid}`, authOptions);
  }

  /**
   * Fetch messages for a thread
   */
  async fetchThreadMessages(
    threadId: string,
    authOptions?: AuthOptions
  ): Promise<Message[]> {
    const response = await this.get<MessagesResponse>(
      `/api/messages/thread/${threadId}?format=client`,
      authOptions
    );

    // Convert timestamp strings to Date objects
    return response.messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  }

  /**
   * Fetch messages by conversation UUID
   */
  async fetchMessagesByConvUuid(
    convUuid: string,
    authOptions?: AuthOptions
  ): Promise<Message[]> {
    const response = await this.get<MessagesResponse>(
      `/api/messages/conv/${convUuid}?format=client`,
      authOptions
    );

    // Convert timestamp strings to Date objects
    return response.messages.map((msg) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  }

  /**
   * Create a new thread
   */
  async createThread(
    request: CreateThreadRequest,
    authOptions?: AuthOptions
  ): Promise<Thread> {
    const body = {
      userId: request.userId,
      convUuid: request.convUuid,
      title: request.title || "New conversation",
      agentType: request.agentType || "shop",
    };

    return this.post<Thread>('/api/threads', body, authOptions);
  }

  /**
   * Archive a thread
   */
  async archiveThread(threadId: string, authOptions?: AuthOptions): Promise<void> {
    await this.put(`/api/threads/${threadId}/archive`, undefined, authOptions);
  }

  /**
   * Unarchive a thread
   */
  async unarchiveThread(threadId: string, authOptions?: AuthOptions): Promise<void> {
    await this.put(`/api/threads/${threadId}/unarchive`, undefined, authOptions);
  }

  /**
   * Delete a thread permanently
   */
  async deleteThread(threadId: string, authOptions?: AuthOptions): Promise<void> {
    await this.delete(`/api/threads/${threadId}`, authOptions);
  }

  /**
   * Update thread title
   */
  async updateThreadTitle(
    threadId: string,
    title: string,
    authOptions?: AuthOptions
  ): Promise<Thread> {
    return this.put<Thread>(
      `/api/threads/${threadId}`,
      { title },
      authOptions
    );
  }

  /**
   * Search threads by title or content
   */
  async searchThreads(
    userId: string,
    query: string,
    authOptions?: AuthOptions
  ): Promise<Thread[]> {
    const params = new URLSearchParams({
      q: query,
      userId: userId,
    });

    const response = await this.get<ThreadsResponse>(
      `/api/threads/search?${params.toString()}`,
      authOptions
    );

    return response.threads;
  }

  /**
   * Get thread statistics
   */
  async getThreadStats(
    userId: string,
    authOptions?: AuthOptions
  ): Promise<{
    totalThreads: number;
    archivedThreads: number;
    totalMessages: number;
  }> {
    return this.get(`/api/threads/user/${userId}/stats`, authOptions);
  }
}