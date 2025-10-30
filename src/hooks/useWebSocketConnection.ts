import { useState, useRef, useCallback, useEffect } from "react";
import { WebSocketChatClient, SystemEvent } from "../client";
import { ContextHelpers } from "../types";

interface UseWebSocketConnectionProps {
  apiUrl: string;
  userId?: string;
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
  apiUrl,
  userId,
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
      const client = new WebSocketChatClient();
      agentClientRef.current = client;
      setAgentClient(client);

      const contextHelpersToUse: ContextHelpers = contextHelpers || {};

      await client.onInit({
        apiUrl,
        userId,
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
    apiUrl,
    userId,
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