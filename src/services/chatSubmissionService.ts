import { Message } from "../types";
import { WebSocketChatClient } from "../client";

/**
 * ChatSubmissionService - Handles chat message submission business logic
 * 
 * Responsibilities:
 * - Message validation
 * - User message creation
 * - Message submission to WebSocket client
 * - Error handling and reporting
 * 
 * This service separates business logic from state management,
 * making the code more testable and maintainable.
 */

export interface ChatSubmissionConfig {
  onError?: (error: Error) => void;
}

export interface SubmitMessageParams {
  message: string;
  media?: string[];
  convUuid?: string;
  agentPromptPath?: string;
}

export class ChatSubmissionService {
  private config: ChatSubmissionConfig;
  private chatClient: WebSocketChatClient;

  constructor(chatClient: WebSocketChatClient, config: ChatSubmissionConfig = {}) {
    this.chatClient = chatClient;
    this.config = config;
  }

  /**
   * Validates if a message can be submitted
   */
  canSubmit(message: string, isStreaming: boolean, isConnected: boolean): boolean {
    return !!(
      message.trim() &&
      !isStreaming &&
      this.chatClient &&
      isConnected
    );
  }

  /**
   * Creates a user message object
   */
  createUserMessage(message: string, media?: string[]): Message {
    return {
      id: this.generateId(),
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
      media,
    };
  }

  /**
   * Submits a message to the WebSocket agent client
   * 
   * @param params - Message submission parameters
   * @returns The created user message
   * @throws Error if submission fails
   */
  async submitMessage(params: SubmitMessageParams): Promise<Message> {
    const { message, media, convUuid, agentPromptPath } = params;
    
    const userMessage = this.createUserMessage(message, media);

    try {
      await this.chatClient.onTriggerMessage({
        message: userMessage.content,
        media,
        convUuid,
        agentPromptPath,
      });

      return userMessage;
    } catch (error) {
      this.handleError(error);
      throw error; // Re-throw so caller can handle state updates
    }
  }

  /**
   * Handles submission errors
   */
  handleError(error: unknown): void {
    const errorObj = error instanceof Error ? error : new Error("Unknown error");
    
    console.error("Agent client send error:", errorObj);
    
    if (this.config.onError) {
      this.config.onError(errorObj);
    }
  }

  /**
   * Generates a unique message ID
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Creates a system error message
   */
  createErrorMessage(error: unknown): string {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return `Sorry, there was an error: ${errorMessage}`;
  }
}
