import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { WebSocketChatClient, SystemEvent } from "../client";
import { ContextHelpers, EntityType, Tools } from "../types";

interface UseWebSocketConnectionProps {
  // Authentication and server properties
  userMpAuthToken: string;
  chatServerUrl: string;
  chatServerKey: string;
  
  // Entity configuration
  entityId?: string;
  entityType?: EntityType;
  
  // Tools configuration
  tools?: Tools; // Unified tools with execution functions
  
  // Other properties
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
  entityId,
  entityType,
  
  // Tools configuration
  tools,
  
  // Other properties
  contextHelpers,
  onSetMessage,
  onSystemEvent,
  onReasoningUpdate,
}: UseWebSocketConnectionProps) {
  const [chatClient, setChatClient] = useState<WebSocketChatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const chatClientRef = useRef<WebSocketChatClient | null>(null);

  // Use refs to store callbacks to prevent reconnections when they change
  const onSetMessageRef = useRef(onSetMessage);
  const onSystemEventRef = useRef(onSystemEvent);
  const onReasoningUpdateRef = useRef(onReasoningUpdate);

  // Keep refs up to date
  useEffect(() => {
    onSetMessageRef.current = onSetMessage;
    onSystemEventRef.current = onSystemEvent;
    onReasoningUpdateRef.current = onReasoningUpdate;
  }, [onSetMessage, onSystemEvent, onReasoningUpdate]);

  // Process tools and extract schemas for server
  const { toolSchemas, clientToolExecutors } = useMemo(() => {
    if (tools && tools.length > 0) {
      // Extract schemas (without execute functions) for server
      const schemas = tools.map(({ execute, ...schema }) => schema);
      const executors: Record<string, (...args: any[]) => any> = {};
      
      // Extract execution functions for client-side use
      tools.forEach(tool => {
        executors[tool.name] = tool.execute;
      });
      
      return {
        toolSchemas: schemas,
        clientToolExecutors: executors,
      };
    }
    
    return {
      toolSchemas: [],
      clientToolExecutors: {},
    };
  }, [tools]);

  const connectChatClient = useCallback(async () => {
    try {
      setIsConnecting(true);
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

      const client = new WebSocketChatClient();
      chatClientRef.current = client;
      setChatClient(client);

      const contextHelpersToUse: ContextHelpers = contextHelpers || {};

      await client.onInit({
        // Authentication and server properties
        userMpAuthToken,
        chatServerUrl,
        chatServerKey,
        
        entityId,
        entityType: entityType?.toString(),
        
        // Tools configuration
        toolSchemas: toolSchemas,
        clientTools: clientToolExecutors,
        contextHelpers: contextHelpersToUse,
        onSetMessage: onSetMessageRef.current,
        onSystemEvent: onSystemEventRef.current,
        onReasoningUpdate: onReasoningUpdateRef.current,
      });

      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting WebSocketChatClient:", error);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, [
    userMpAuthToken,
    chatServerUrl,
    chatServerKey,
    entityId,
    entityType,
    toolSchemas,
    clientToolExecutors,
    contextHelpers,
    // Removed onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]);

  const disconnectChatClient = useCallback(() => {
    if (chatClientRef.current) {
      chatClientRef.current.disconnect();
      chatClientRef.current = null;
    }
    setChatClient(null);
    setIsConnected(false);
  }, []);

  // Auto-connect on mount and setup connection monitoring
  useEffect(() => {
    connectChatClient();

    return () => {
      disconnectChatClient();
    };
  }, [connectChatClient, disconnectChatClient]);

  // Monitor connection status
  useEffect(() => {
    const interval = setInterval(() => {
      if (chatClientRef.current) {
        const status = chatClientRef.current.getConnectionStatus();
        setIsConnected(status.connected);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    chatClient,
    isConnected,
    isConnecting,
    connectChatClient,
    disconnectChatClient,
  };
}