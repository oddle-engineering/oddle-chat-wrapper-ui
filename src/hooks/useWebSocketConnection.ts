import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { WebSocketChatClient, SystemEvent } from "../client";
import { ContextHelpers, EntityType, Tools, ConnectionState } from "../types";
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
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.DISCONNECTED
  );
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const chatClientRef = useRef<WebSocketChatClient | null>(null);

  // Use refs to store callbacks to prevent reconnections when they change
  const onSetMessageRef = useRef(onSetMessage);
  const onSystemEventRef = useRef(onSystemEvent);
  const onReasoningUpdateRef = useRef(onReasoningUpdate);
  const onThreadCreatedRef = useRef(onThreadCreated);

  // Stabilize tools reference to prevent unnecessary reconnections
  // Only update when tools structure actually changes (deep comparison)
  const toolsRef = useRef<Tools | undefined>(tools);
  const toolsStableRef = useRef<Tools | undefined>(tools);

  useEffect(() => {
    // Deep comparison: only update if tools structure changed
    const toolsChanged = JSON.stringify(tools) !== JSON.stringify(toolsRef.current);
    if (toolsChanged) {
      toolsRef.current = tools;
      toolsStableRef.current = tools;
    }
  }, [tools]);

  // Stabilize contextHelpers reference to prevent unnecessary reconnections
  // Only update when contextHelpers structure actually changes (deep comparison)
  const contextHelpersRef = useRef<ContextHelpers | undefined>(contextHelpers);
  const contextHelpersStableRef = useRef<ContextHelpers | undefined>(contextHelpers);

  useEffect(() => {
    // Deep comparison: only update if contextHelpers structure changed
    const contextHelpersChanged = JSON.stringify(contextHelpers) !== JSON.stringify(contextHelpersRef.current);
    if (contextHelpersChanged) {
      contextHelpersRef.current = contextHelpers;
      contextHelpersStableRef.current = contextHelpers;
    }
  }, [contextHelpers]);

  // Keep refs up to date
  useEffect(() => {
    onSetMessageRef.current = onSetMessage;
    onSystemEventRef.current = onSystemEvent;
    onReasoningUpdateRef.current = onReasoningUpdate;
    onThreadCreatedRef.current = onThreadCreated;
  }, [onSetMessage, onSystemEvent, onReasoningUpdate, onThreadCreated]);

  // Process tools and extract schemas for server
  const { toolSchemas, clientToolExecutors } = useMemo(() => {
    const stableTools = toolsStableRef.current;
    if (stableTools && stableTools.length > 0) {
      // Extract schemas (without execute functions) for server
      const schemas = stableTools.map(({ execute, ...schema }) => schema);
      const executors: Record<string, (...args: any[]) => any> = {};

      // Extract execution functions for client-side use
      stableTools.forEach((tool) => {
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
  }, [toolsStableRef.current]);

  // Retry function that doesn't depend on connectChatClient
  const retryConnectionRef = useRef<() => void>();

  const connectChatClient = useCallback(async () => {
    try {
      setConnectionState(ConnectionState.CONNECTING);
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

      const contextHelpersToUse: ContextHelpers = contextHelpersStableRef.current || {};

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

      setConnectionState(ConnectionState.CONNECTED);
    } catch (error) {
      const classification = logClassifiedError(error, "WebSocketConnection");
      setConnectionState(ConnectionState.DISCONNECTED);

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
    }
  }, [
    userMpAuthToken,
    chatServerUrl,
    chatServerKey,
    entityId,
    entityType,
    toolSchemas,
    clientToolExecutors,
    // Removed contextHelpers, onSetMessage, onSystemEvent, onReasoningUpdate to prevent reconnections
  ]);

  const disconnectChatClient = useCallback(() => {
    if (chatClientRef.current) {
      chatClientRef.current.disconnect();
      chatClientRef.current = null;
    }
    setChatClient(null);
    setConnectionState(ConnectionState.DISCONNECTED);
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
        
        // Update connection state based on client status
        if (status.connected) {
          setConnectionState(ConnectionState.CONNECTED);
        } else if (status.isReconnecting) {
          setConnectionState(ConnectionState.RECONNECTING);
        } else {
          setConnectionState(ConnectionState.DISCONNECTED);
        }
        
        setConnectionAttempts(status.reconnectAttempts);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    chatClient,
    connectionState,
    reconnectAttempts: connectionAttempts,
    connectChatClient,
    disconnectChatClient,
  };
}
