import { useState, useRef, useCallback, useEffect } from "react";
import { WebSocketChatClient, SystemEvent } from "../client";
import { ContextHelpers, EntityType } from "../types";

interface UseWebSocketConnectionProps {
  // Authentication and server properties
  userMpAuthToken: string;
  chatServerUrl: string;
  chatServerKey: string;
  
  // Entity configuration
  providerResId?: string;
  userId: string;
  entityId?: string;
  entityType?: EntityType;
  
  // Existing properties
  clientTools?: any[];
  tools?: Record<string, (...args: any[]) => any>;
  contextHelpers?: ContextHelpers;
  onSetMessage: (char: string) => void;
  onSystemEvent: (event: SystemEvent) => void;
  onReasoningUpdate: (
    isThinking: boolean,
    content: string,
    toolCallRequest?: any
  ) => void;
}

export function useWebSocketConnection({
  // Authentication and server properties
  userMpAuthToken,
  chatServerUrl,
  chatServerKey,
  
  // Entity configuration
  providerResId,
  userId,
  entityId,
  entityType,
  
  // Existing properties
  clientTools,
  tools,
  contextHelpers,
  onSetMessage,
  onSystemEvent,
  onReasoningUpdate,
}: UseWebSocketConnectionProps) {
  const [agentClient, setAgentClient] = useState<WebSocketChatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const agentClientRef = useRef<WebSocketChatClient | null>(null);

  const connectAgentClient = useCallback(async () => {
    try {
      // Validate required props
      if (!userMpAuthToken) {
        throw new Error("userMpAuthToken is required");
      }
      if (!chatServerUrl) {
        throw new Error("chatServerUrl is required");
      }
      if (!chatServerKey) {
        throw new Error("chatServerKey is required");
      }
      if (!userId) {
        throw new Error("userId is required");
      }

      const client = new WebSocketChatClient();
      agentClientRef.current = client;
      setAgentClient(client);

      const contextHelpersToUse: ContextHelpers = contextHelpers || {};

      await client.onInit({
        // Authentication and server properties
        userMpAuthToken,
        chatServerUrl,
        chatServerKey,
        
        // Entity configuration
        providerResId,
        userId,
        entityId,
        entityType: entityType?.toString(),
        
        // Existing properties
        toolSchemas: clientTools,
        clientTools: tools,
        contextHelpers: contextHelpersToUse,
        onSetMessage,
        onSystemEvent,
        onReasoningUpdate,
      });

      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting WebSocketChatClient:", error);
      setIsConnected(false);
    }
  }, [
    userMpAuthToken,
    chatServerUrl,
    chatServerKey,
    providerResId,
    userId,
    entityId,
    entityType,
    clientTools,
    tools,
    contextHelpers,
    onSetMessage,
    onSystemEvent,
    onReasoningUpdate,
  ]);

  const disconnectAgentClient = useCallback(() => {
    if (agentClientRef.current) {
      agentClientRef.current.disconnect();
      agentClientRef.current = null;
    }
    setAgentClient(null);
    setIsConnected(false);
  }, []);

  // Auto-connect on mount and setup connection monitoring
  useEffect(() => {
    connectAgentClient();

    return () => {
      disconnectAgentClient();
    };
  }, [connectAgentClient, disconnectAgentClient]);

  // Monitor connection status
  useEffect(() => {
    const interval = setInterval(() => {
      if (agentClientRef.current) {
        const status = agentClientRef.current.getConnectionStatus();
        setIsConnected(status.connected);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    agentClient,
    isConnected,
    connectAgentClient,
    disconnectAgentClient,
  };
}