import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { WebSocketChatClient, SystemEvent } from "../client";
import { ContextHelpers, EntityType, Tools } from "../types";
import { logClassifiedError } from "../utils/errorClassification";

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
  onThreadCreated?: (data: {
    providerResId: string;
    threadId: string;
    canUpdateMetadata: boolean;
    updateEndpoint: string;
  }) => void;
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
  onThreadCreated,
}: UseWebSocketConnectionProps) {
  const [chatClient, setChatClient] = useState<WebSocketChatClient | null>(
    null
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionReconnecting, setConnectionReconnecting] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const chatClientRef = useRef<WebSocketChatClient | null>(null);

  // Use refs to store callbacks to prevent reconnections when they change
  const onSetMessageRef = useRef(onSetMessage);
  const onSystemEventRef = useRef(onSystemEvent);
  const onReasoningUpdateRef = useRef(onReasoningUpdate);
  const onThreadCreatedRef = useRef(onThreadCreated);

  // Keep refs up to date
  useEffect(() => {
    onSetMessageRef.current = onSetMessage;
    onSystemEventRef.current = onSystemEvent;
    onReasoningUpdateRef.current = onReasoningUpdate;
    onThreadCreatedRef.current = onThreadCreated;
  }, [onSetMessage, onSystemEvent, onReasoningUpdate, onThreadCreated]);

  // Process tools and extract schemas for server
  const { toolSchemas, clientToolExecutors } = useMemo(() => {
    if (tools && tools.length > 0) {
      // Extract schemas (without execute functions) for server
      const schemas = tools.map(({ execute, ...schema }) => schema);
      const executors: Record<string, (...args: any[]) => any> = {};

      // Extract execution functions for client-side use
      tools.forEach((tool) => {
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

  // Retry function that doesn't depend on connectChatClient
  const retryConnectionRef = useRef<() => void>();

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
        onThreadCreated: onThreadCreatedRef.current,
      });

      setIsConnected(true);
    } catch (error) {
      const classification = logClassifiedError(error, "WebSocketConnection");
      setIsConnected(false);

      // Only retry for retryable errors (network issues, server errors)
      // Skip retrying for CORS, authentication, and permission errors
      if (classification.isRetryable) {
        console.log(`[WebSocketConnection] Will retry in 2s: ${classification.reason}`);
        setTimeout(() => {
          if (
            chatClientRef.current === null ||
            !chatClientRef.current.getConnectionStatus().connected
          ) {
            retryConnectionRef.current?.();
          }
        }, 2000);
      } else {
        console.warn(`[WebSocketConnection] Will not retry: ${classification.reason}`);
      }
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

  // Set up retry function ref
  retryConnectionRef.current = connectChatClient;

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
        setConnectionReconnecting(status.isReconnecting);
        setConnectionAttempts(status.reconnectAttempts);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    chatClient,
    isConnected,
    isConnecting,
    isReconnecting: connectionReconnecting,
    reconnectAttempts: connectionAttempts,
    connectChatClient,
    disconnectChatClient,
  };
}
