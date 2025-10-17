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
  private reconnectTimer: number | null = null;

  constructor() {
    this.sessionId = `business_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  async onInit(props: BusinessAgentClientProps): Promise<void> {
    this.onSetMessage = props.onSetMessage;
    this.onSystemMessage = props.onSystemMessage;
    this.onBusinessDataUpdate = props.onBusinessDataUpdate;
    this.onReasoningUpdate = props.onReasoningUpdate;
    this.clientTools = props.clientTools || {};
    this.toolSchemas = props.toolSchemas || [];
    this.businessContext = props.businessContext;

    return new Promise((resolve, reject) => {
      try {
        // Connect to WebSocket
        this.ws = new WebSocket(`ws://localhost:3000/ws`);

        if (!this.ws) {
          reject(new Error("WebSocket not initialized"));
          return;
        }

        this.ws.onopen = () => {
          this.isConnected = true;
          this.reconnectAttempts = 0; // Reset on successful connection
          console.log("WebSocket connected");
        };

        this.ws.onerror = (error) => {
          console.error("WebSocket connection error:", error);
          // In demo environments, fallback to demo mode
          if (error instanceof Event) {
            console.log("Falling back to demo mode...");
            this.isConnected = true;
            if (this.onSystemMessage) {
              this.onSystemMessage(
                "⚠️ Using demo mode - WebSocket unavailable"
              );
            }
            resolve();
            return;
          }
          reject(error);
        };

        this.ws.onmessage = (event) => {
          const data = this.handleWebSocketMessage(event);

          // Resolve when client tools are configured
          if (data && data.type === "tools_configured") {
            if (this.onSystemMessage) {
              this.onSystemMessage(`✅ Client tools configured successfully`);
            }
            resolve();
          }

          // Also resolve on session establishment if no tools to configure
          if (
            data &&
            data.type === "session_established" &&
            (!this.toolSchemas || this.toolSchemas.length === 0)
          ) {
            resolve();
          }
        };

        this.ws.onclose = () => {
          this.isConnected = false;
          console.log("WebSocket disconnected");
          // this.attemptReconnect();
        };
      } catch (error) {
        // Fallback to demo mode if WebSocket fails

        resolve();
      }
    });
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
            } else if (data.data?.type === "tool-call") {
              // Handle server-side tool calls from AI provider
              const toolCallData = data.data;
              console.log("🔧 Server-side tool call detected:", toolCallData);
              if (this.onReasoningUpdate && toolCallData.toolName && toolCallData.toolCallId) {
                // Create a synthetic ToolCallRequest for tracking
                const syntheticRequest = {
                  toolName: toolCallData.toolName,
                  callId: toolCallData.toolCallId,
                  parameters: toolCallData.args || {}
                };
                this.onReasoningUpdate(true, `🔧 Handling: ${toolCallData.toolName}`, syntheticRequest);
              }
            } else if (data.data?.type === "tool-result") {
              // Handle server-side tool results
              const toolResultData = data.data;
              console.log("✅ Server-side tool result detected:", toolResultData);
              if (this.onReasoningUpdate && toolResultData.toolCallId) {
                const syntheticRequest = {
                  toolName: toolResultData.toolName || "Unknown Tool",
                  callId: toolResultData.toolCallId,
                  parameters: {}
                };
                this.onReasoningUpdate(false, `✅ Completed: ${toolResultData.toolName || "Unknown Tool"}`, syntheticRequest);
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
                  parameters: {}
                };
                this.onReasoningUpdate(false, `✅ Completed: ${toolResultData.toolName}`, syntheticRequest);
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
          console.log(">>>> tool_call_request:", data);
          this.handleToolCallRequest(data as ToolCallRequest);
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

    // Send reasoning update with callId for tracking
    if (this.onReasoningUpdate) {
      this.onReasoningUpdate(true, `🔧 Handling: ${toolName}`, request);
    }

    try {
      const toolFunction = this.clientTools[toolName];
      if (!toolFunction) {
        throw new Error(`Tool not found: ${toolName}`);
      }

      // Execute the tool function
      const result = await toolFunction(parameters);

      // Send success response directly to the tool_response event
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: "tool_call_response",
            callId,
            result,
          })
        );
      }

      // Send completion reasoning update with callId for tracking
      if (this.onReasoningUpdate) {
        this.onReasoningUpdate(false, `✅ Completed: ${toolName}`, request);
      }
    } catch (error) {
      console.error("Error executing tool:", error);

      // Send error response
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(
          JSON.stringify({
            type: "tool_call_response",
            callId,
            error: error instanceof Error ? error.message : "Unknown error",
          })
        );
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
    agentType: string = "shop"
  ): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Client not connected");
    }

    if (!this.ws) {
      throw new Error("WebSocket not available");
    }

    try {
      // Send chat message via WebSocket
      this.ws.send(
        JSON.stringify({
          type: "chat_message",
          content: message,
          agentType: agentType,
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
      if (this.onSystemMessage) {
        this.onSystemMessage(`❌ Chat error: ${error}`);
      }
      throw error;
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
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
  } {
    return {
      connected: this.isConnected,
      sessionId: this.sessionId,
      reconnectAttempts: this.reconnectAttempts,
    };
  }
}
