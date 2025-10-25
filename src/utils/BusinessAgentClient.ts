import {
  BusinessData,
  BusinessAgentClientProps,
  ToolCallRequest,
  WebSocketMessage,
} from "../types";

export class BusinessAgentClient {
  private sessionId: string = "";
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private apiUrl: string = "http://localhost:3000";
  private userId: string = ""; // Store userId from props
  private onSetMessage?: (char: string) => void;
  private onSystemMessage?: (message: string) => void;
  private onBusinessDataUpdate?: (data: any) => void;
  private onReasoningUpdate?: (
    isThinking: boolean,
    content: string,
    request: ToolCallRequest
  ) => void;
  private clientTools: Record<string, Function> = {};
  private toolSchemas: any[] = [];
  private businessContext: BusinessData = {};
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimer: number | null = null;
  private reconnectDelay: number = 1000; // Start with 1 second
  private heartbeatInterval: number | null = null;
  private isReconnecting: boolean = false;
  private visibilityChangeHandler: () => void;
  private initResolve?: (value?: any) => void;
  private initReject?: (reason?: any) => void;
  private processedToolCalls: Set<string> = new Set(); // Track processed tool calls
  private reasoningStartTimes: Map<string, number> = new Map(); // Track reasoning start times by ID
  private reasoningContent: Map<string, string> = new Map(); // Track accumulated reasoning content by ID

  constructor() {
    this.sessionId = `business_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Handle tab visibility changes
    this.visibilityChangeHandler = () => {
      if (
        document.visibilityState === "visible" &&
        !this.isConnected &&
        !this.isReconnecting
      ) {
        console.log("Tab became visible, checking connection...");
        this.attemptReconnect();
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener(
        "visibilitychange",
        this.visibilityChangeHandler
      );
    }
  }

  async onInit(props: BusinessAgentClientProps): Promise<void> {
    this.onSetMessage = props.onSetMessage;
    this.onSystemMessage = props.onSystemMessage;
    this.onBusinessDataUpdate = props.onBusinessDataUpdate;
    this.onReasoningUpdate = props.onReasoningUpdate;
    this.clientTools = props.clientTools || {};
    this.toolSchemas = props.toolSchemas || [];
    this.businessContext = props.businessContext;
    if (props.apiUrl) {
      this.apiUrl = props.apiUrl;
    }
    if (props.userId) {
      this.userId = props.userId;
    }

    return new Promise((resolve, reject) => {
      try {
        // Store resolve/reject for later use
        this.initResolve = resolve;
        this.initReject = reject;

        // Use the new connection method
        this.connectWebSocketForInit();
      } catch (error) {
        // Fallback to demo mode if WebSocket fails
        console.log("Falling back to demo mode...");
        resolve();
      }
    });
  }

  private connectWebSocketForInit(): void {
    try {
      const wsUrl = this.apiUrl.replace(/^https?:\/\//, 'ws://') + '/ws';
      this.ws = new WebSocket(wsUrl);

      if (!this.ws) {
        this.initReject?.(new Error("WebSocket not initialized"));
        return;
      }

      this.ws.onopen = () => {
        this.isConnected = true;
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        console.log("WebSocket connected");
        this.startHeartbeat();
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket connection error:", error);
        // In demo environments, fallback to demo mode
        if (error instanceof Event) {
          console.log("Falling back to demo mode...");
          this.isConnected = true;
          if (this.onSystemMessage) {
            this.onSystemMessage("⚠️ Using demo mode - WebSocket unavailable");
          }
          this.initResolve?.();
          return;
        }
        this.initReject?.(error);
      };

      this.ws.onmessage = (event) => {
        const data = this.handleWebSocketMessage(event);

        // Resolve when client tools are configured
        if (data && data.type === "tools_configured") {
          if (this.onSystemMessage) {
            this.onSystemMessage(`✅ Client tools configured successfully`);
          }
          this.initResolve?.();
        }

        // Also resolve on session establishment if no tools to configure
        if (
          data &&
          data.type === "session_established" &&
          (!this.toolSchemas || this.toolSchemas.length === 0)
        ) {
          this.initResolve?.();
        }
      };

      this.ws.onclose = (event) => {
        this.isConnected = false;
        this.stopHeartbeat();
        console.log("WebSocket disconnected", {
          code: event.code,
          reason: event.reason,
        });

        // Only attempt reconnect if it wasn't a manual disconnect
        if (event.code !== 1000 && event.code !== 1001) {
          this.attemptReconnect();
        }
      };
    } catch (error) {
      this.initReject?.(error);
    }
  }

  private attemptReconnect(): void {
    if (
      this.isReconnecting ||
      this.reconnectAttempts >= this.maxReconnectAttempts
    ) {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log("Max reconnection attempts reached");
        if (this.onSystemMessage) {
          this.onSystemMessage("❌ Connection lost - please refresh the page");
        }
      }
      return;
    }

    this.isReconnecting = true;
    this.reconnectAttempts++;

    console.log(
      `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    if (this.onSystemMessage) {
      this.onSystemMessage(
        `🔄 Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
    }

    this.reconnectTimer = window.setTimeout(() => {
      if (!this.isConnected) {
        this.connectWebSocket();
      }
    }, this.reconnectDelay);

    // Exponential backoff with max cap
    this.reconnectDelay = Math.min(this.reconnectDelay * 1.5, 30000);
  }

  private connectWebSocket(): void {
    try {
      if (this.ws) {
        this.ws.close();
      }

      const wsUrl = this.apiUrl.replace(/^https?:\/\//, 'ws://') + '/ws';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.isReconnecting = false;
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
        console.log("WebSocket reconnected successfully");
        this.startHeartbeat();

        if (this.onSystemMessage) {
          this.onSystemMessage("✅ Connection restored");
        }

        // Re-configure tools after reconnection
        // TODO: REVIEW - re-enable tool configuration on reconnect
        // if (this.toolSchemas && this.toolSchemas.length > 0) {
        //   this.ws?.send(JSON.stringify({
        //     type: "configure_tools",
        //     toolSchemas: this.toolSchemas,
        //     businessContext: this.businessContext,
        //   }));
        // }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket reconnection error:", error);
        this.isReconnecting = false;
        // Try again with backoff
        setTimeout(() => this.attemptReconnect(), this.reconnectDelay);
      };

      this.ws.onclose = (event) => {
        this.isConnected = false;
        this.isReconnecting = false;
        this.stopHeartbeat();

        if (event.code !== 1000 && event.code !== 1001) {
          this.attemptReconnect();
        }
      };

      this.ws.onmessage = (event) => {
        this.handleWebSocketMessage(event);
      };
    } catch (error) {
      console.error("Error creating WebSocket:", error);
      this.isReconnecting = false;
      setTimeout(() => this.attemptReconnect(), this.reconnectDelay);
    }
  }

  private startHeartbeat(): void {
    return;
    this.stopHeartbeat(); // Clear any existing heartbeat

    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: "heartbeat_ping",
            timestamp: new Date().toISOString(),
            pingTime: Date.now(),
          })
        );
      } else {
        console.log(
          "WebSocket not ready for heartbeat, attempting reconnect..."
        );
        this.stopHeartbeat();
        this.attemptReconnect();
      }
    }, 30000); // Send heartbeat every 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private handleWebSocketMessage(event: MessageEvent): WebSocketMessage | null {
    try {
      const data: WebSocketMessage = JSON.parse(event.data);
      switch (data.type) {
        case "session_established":
          console.log("Session established:", data.sessionId);

          // Send client tools configuration after session is established
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(
              JSON.stringify({
                type: "configure_tools",
                toolSchemas: this.toolSchemas,
                businessContext: this.businessContext,
              })
            );
          }
          break;

        case "tools_configured":
          console.log("Tools configured:", data);
          if (this.onSystemMessage) {
            this.onSystemMessage(`✅ Tools configured successfully`);
          }
          break;

        case "client_tools_updated":
          console.log("Client tools updated successfully:", data);
          if (this.onSystemMessage) {
            this.onSystemMessage(`✅ Client tools updated successfully`);
          }
          break;

        case "configure_tools":
          console.log("Configure tools request:", data);
          if (this.onSystemMessage) {
            this.onSystemMessage(`🔧 Server requested tool configuration`);
          }
          break;

        case "chat_event":
          // Handle different types of chat events from Latitude
          if (data.event === "provider-event") {
            if (
              data.data?.type === "text-delta" &&
              this.onSetMessage &&
              data.data.textDelta
            ) {
              this.onSetMessage(data.data.textDelta);
            } else if (data.data?.type === "reasoning-start") {
              // Handle reasoning start event
              console.log("🧠 Reasoning started:", data.data);
              const reasoningId = data.data.id || "reasoning";
              
              // Record start time and initialize content
              this.reasoningStartTimes.set(reasoningId, Date.now());
              this.reasoningContent.set(reasoningId, "");
              
              // Don't send "AI is thinking..." message - wait for first delta
            } else if (data.data?.type === "reasoning-delta") {
              // Handle reasoning delta (streaming reasoning text)
              console.log("🧠 Reasoning delta:", data.data);
              if (this.onReasoningUpdate && data.data.text) {
                const reasoningId = data.data.id || "reasoning";
                
                // Accumulate reasoning content
                const existingContent = this.reasoningContent.get(reasoningId) || "";
                const newContent = existingContent + data.data.text;
                this.reasoningContent.set(reasoningId, newContent);
                
                const syntheticRequest = {
                  toolName: "reasoning",
                  callId: reasoningId,
                  parameters: { phase: "thinking", text: newContent },
                };
                this.onReasoningUpdate(
                  true,
                  `🧠 ${newContent}`,
                  syntheticRequest
                );
              }
            } else if (data.data?.type === "reasoning-end") {
              // Handle reasoning end event
              console.log("🧠 Reasoning completed:", data.data);
              const reasoningId = data.data.id || "reasoning";
              
              // Get the accumulated content
              const accumulatedContent = this.reasoningContent.get(reasoningId) || "";
              
              // Calculate duration
              const startTime = this.reasoningStartTimes.get(reasoningId);
              let durationText = "";
              if (startTime) {
                const duration = (Date.now() - startTime) / 1000;
                durationText = ` for ${duration.toFixed(1)} seconds`;
                this.reasoningStartTimes.delete(reasoningId); // Clean up
              }
              
              console.log("🧠 Reasoning end details:", {
                reasoningId,
                accumulatedContent: accumulatedContent.length > 0 ? accumulatedContent.substring(0, 100) + "..." : "EMPTY",
                durationText,
                hasStartTime: !!startTime
              });
              
              if (this.onReasoningUpdate) {
                const syntheticRequest = {
                  toolName: "reasoning",
                  callId: reasoningId,
                  parameters: { 
                    phase: "end", 
                    duration: durationText,
                    fullContent: accumulatedContent 
                  },
                };
                // Send the accumulated content with completion indicator for title
                // Use fallback content if no content was accumulated
                const contentToShow = accumulatedContent || "Thought";
                const finalContent = `🧠 ${contentToShow}${durationText}`;
                console.log("🧠 Sending final reasoning update:", finalContent);
                this.onReasoningUpdate(
                  false,
                  finalContent,
                  syntheticRequest
                );
              }
              
              // Clean up accumulated content
              this.reasoningContent.delete(reasoningId);
            } else if (data.data?.type === "tool-call") {
              // Handle server-side tool calls from AI provider
              const toolCallData = data.data;
              console.log(
                "🔧 clog Server-side tool call detected:",
                toolCallData
              );
              if (
                this.onReasoningUpdate &&
                toolCallData.toolName &&
                toolCallData.toolCallId &&
                toolCallData.toolName.startsWith("lat_")
              ) {
                // Create a synthetic ToolCallRequest for tracking
                const syntheticRequest = {
                  toolName: toolCallData.toolName,
                  callId: toolCallData.toolCallId,
                  parameters: toolCallData.args || {},
                };
                this.onReasoningUpdate(
                  true,
                  `🔧 Handling: ${toolCallData.toolName}`,
                  syntheticRequest
                );
              }
            } else if (
              data.data?.type === "tool-result" &&
              data.data.toolName.startsWith("lat_")
            ) {
              // Handle server-side tool results
              const toolResultData = data.data;
              console.log(
                "✅ clog Server-side tool result detected:",
                toolResultData
              );
              if (this.onReasoningUpdate && toolResultData.toolCallId) {
                const syntheticRequest = {
                  toolName: toolResultData.toolName || "Unknown Tool",
                  callId: toolResultData.toolCallId,
                  parameters: {},
                };
                this.onReasoningUpdate(
                  false,
                  `✅ Completed: ${toolResultData.toolName || "Unknown Tool"}`,
                  syntheticRequest
                );
              }
            }
          } else if (data.event === "latitude-event") {
            // Handle latitude-specific events
            console.log("Latitude event:", data.data?.type, data.data);

            // Check if this is a tool completion event
            if (data.data?.type === "tool-result" && this.onReasoningUpdate) {
              const toolResultData = data.data;
              if (toolResultData.toolCallId && toolResultData.toolName) {
                const syntheticRequest = {
                  toolName: toolResultData.toolName,
                  callId: toolResultData.toolCallId,
                  parameters: {},
                };
                this.onReasoningUpdate(
                  false,
                  `✅ Completed: ${toolResultData.toolName}`,
                  syntheticRequest
                );
              }
            }
          }

          // Legacy support for direct content-delta
          if (
            data.event === "content-delta" &&
            this.onSetMessage &&
            data.data.delta
          ) {
            this.onSetMessage(data.data.delta);
          }
          break;

        case "chat_finished":
          console.log("Chat finished:", data);
          if (this.onSystemMessage) {
            this.onSystemMessage(`✅ Chat completed (${data.uuid})`);
          }
          break;

        case "chat_error":
          console.error("Chat error:", data.error);
          if (this.onSystemMessage) {
            this.onSystemMessage(`❌ Chat error: ${data.error}`);
          }
          break;

        case "tool_call_request":
          console.log("📥 Received tool_call_request:", data);
          const toolRequest = data as ToolCallRequest;
          console.log(`📋 Tool details - Name: ${toolRequest.toolName}, CallId: ${toolRequest.callId}`);
          
          // Check for duplicate tool calls
          if (this.processedToolCalls.has(toolRequest.callId)) {
            console.warn(`⚠️ Duplicate tool call detected for callId: ${toolRequest.callId}, ignoring`);
            break;
          }
          
          // Mark as being processed
          this.processedToolCalls.add(toolRequest.callId);
          this.handleToolCallRequest(toolRequest);
          break;

        case "business_data_update":
          console.log("Business data update:", data.data);
          if (this.onBusinessDataUpdate) {
            this.onBusinessDataUpdate(data.data);
          }
          if (this.onSystemMessage) {
            this.onSystemMessage(
              `📊 Business data updated: ${JSON.stringify(data.data)}`
            );
          }
          break;

        case "heartbeat_ping":
          // Server sent a heartbeat ping, respond with pong
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(
              JSON.stringify({
                type: "heartbeat_pong",
                timestamp: new Date().toISOString(),
                originalTimestamp: data.timestamp,
                pingTime: data.pingTime,
              })
            );
          }
          break;

        case "heartbeat_ack":
          console.log("Heartbeat acknowledged");
          break;

        case "error":
          console.error("WebSocket error:", data.error);
          if (this.onSystemMessage) {
            this.onSystemMessage(`❌ Error: ${data.error}`);
          }
          break;

        default:
          console.log("Unknown WebSocket message:", data);
      }

      return data;
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
      return null;
    }
  }

  private async handleToolCallRequest(request: ToolCallRequest): Promise<void> {
    const { callId, toolName, parameters } = request;
    
    console.log(`🔧 Processing tool call: ${toolName} with callId: ${callId}`);

    // Send reasoning update with callId for tracking
    if (this.onReasoningUpdate) {
      this.onReasoningUpdate(true, `🔧 Handling: ${toolName}`, request);
    }

    try {
      const toolFunction = this.clientTools[toolName];
      if (!toolFunction) {
        const errorMsg = `Tool not found: ${toolName}`;
        console.error(errorMsg);
        throw new Error(errorMsg);
      }

      // Execute the tool function
      console.log(`⚙️ Executing tool: ${toolName} with parameters:`, parameters);
      const result = await toolFunction(parameters);
      console.log(`✅ Tool result for ${toolName}:`, result);

      // Send success response directly to the tool_response event
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const response = {
          type: "tool_call_response",
          callId,
          result,
        };
        console.log(`📤 Sending tool response:`, response);
        this.ws.send(JSON.stringify(response));
      } else {
        console.error(`❌ WebSocket not ready when trying to send response for callId: ${callId}`);
      }

      // Send completion reasoning update with callId for tracking
      if (this.onReasoningUpdate) {
        this.onReasoningUpdate(false, `✅ Completed: ${toolName}`, request);
      }
    } catch (error) {
      console.error(`❌ Error executing tool ${toolName} (callId: ${callId}):`, error);

      // Send error response
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const errorResponse = {
          type: "tool_call_response",
          callId,
          error: error instanceof Error ? error.message : "Unknown error",
        };
        console.log(`📤 Sending error response:`, errorResponse);
        this.ws.send(JSON.stringify(errorResponse));
      } else {
        console.error(`❌ WebSocket not ready when trying to send error response for callId: ${callId}`);
      }

      // Send error reasoning update with callId for tracking
      if (this.onReasoningUpdate) {
        this.onReasoningUpdate(
          false,
          `❌ Error: ${toolName} - ${error}`,
          request
        );
      }
    }
  }

  async onTriggerMessage(
    message: string,
    agentType: string = "shop",
    media?: string[],
    convUuid?: string
  ): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Client not connected");
    }

    if (!this.ws) {
      throw new Error("WebSocket not available");
    }

    try {
      // Clear processed tool calls for new conversation
      this.processedToolCalls.clear();
      console.log("🧹 Cleared processed tool calls for new message");
      
      // Send chat message via WebSocket
      const payload: any = {
        type: "chat_message",
        content: message,
        agentType: agentType,
        media: media || [],
        saveToDatabase: true,
        userId: this.userId || undefined, // Use stored userId or fallback
      };

      // Add convUuid if provided (to continue existing conversation)
      if (convUuid) {
        payload.convUuid = convUuid;
      }

      this.ws.send(JSON.stringify(payload));
    } catch (error) {
      console.error("Error sending message:", error);
      if (this.onSystemMessage) {
        this.onSystemMessage(`❌ Chat error: ${error}`);
      }
      throw error;
    }
  }

  disconnect(): void {
    // Clean up timers
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    this.stopHeartbeat();

    // Remove visibility change listener
    if (typeof document !== "undefined" && this.visibilityChangeHandler) {
      document.removeEventListener(
        "visibilitychange",
        this.visibilityChangeHandler
      );
    }

    // Close WebSocket connection
    if (this.ws) {
      this.ws.close(1000, "Manual disconnect"); // Normal closure
      this.ws = null;
    }

    // Reset state
    this.isConnected = false;
    this.isReconnecting = false;
    this.reconnectAttempts = 0;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  isClientConnected(): boolean {
    return this.isConnected;
  }

  async getBusinessData(): Promise<any> {
    try {
      const response = await fetch(
        `http://localhost:3007/session/${this.sessionId}/data`
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
    return null;
  }

  // Method to update business context
  updateBusinessContext(newContext: BusinessData): void {
    this.businessContext = { ...this.businessContext, ...newContext };

    // Send updated context to server if connected
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: "update_business_context",
          businessContext: this.businessContext,
        })
      );
    }
  }

  // Method to add new client tools
  addClientTools(tools: Record<string, Function>, schemas?: any[]): void {
    this.clientTools = { ...this.clientTools, ...tools };
    if (schemas) {
      this.toolSchemas = [...this.toolSchemas, ...schemas];
    }

    // Send updated tools to server if connected
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: "update_tools",
          toolSchemas: this.toolSchemas,
        })
      );
    }
  }

  // Get current connection status with more details
  getConnectionStatus(): {
    connected: boolean;
    sessionId: string;
    reconnectAttempts: number;
    isReconnecting: boolean;
    websocketState: string;
  } {
    return {
      connected: this.isConnected,
      sessionId: this.sessionId,
      reconnectAttempts: this.reconnectAttempts,
      isReconnecting: this.isReconnecting,
      websocketState: this.ws ? this.getWebSocketStateString() : "null",
    };
  }

  private getWebSocketStateString(): string {
    if (!this.ws) return "null";
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.OPEN:
        return "OPEN";
      case WebSocket.CLOSING:
        return "CLOSING";
      case WebSocket.CLOSED:
        return "CLOSED";
      default:
        return "UNKNOWN";
    }
  }
}
