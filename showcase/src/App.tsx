import { useState, useEffect } from "react";

import { setupMockAPI } from "./api/mockApi";
import { apiConfig, getConfigSummary } from "./config/apiConfig";
import { ChatWrapper, ChatWrapperProps, ChatMode, ChatPosition, ChatTheme } from "@oddle/chat-wrapper-ui";
import { EnhancedBriefPlannerDemo } from "./components/EnhancedBriefPlannerDemo";
import { ToolsDocumentation } from "./components/ToolsDocumentation";
import { IntegratedChatDemo } from "./components/IntegratedChatDemo";
import { UD21Demo } from "./components/UD21Demo";
import { ReserveDemo } from "./components/ReserveDemo";
import { ShopDemo } from "./components/ShopDemo";

function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [customConfig, setCustomConfig] = useState({
    mode: "sidebar" as ChatMode,
    theme: "light" as ChatTheme,
    position: "right" as ChatPosition,
    appName: "Demo Chat",
    placeholder: "Type your message...",
  });

  // Setup mock API on component mount
  useEffect(() => {
    const cleanup = setupMockAPI("http://localhost:3000");
    return cleanup;
  }, []);

  const demos = [
    {
      id: "sidebar",
      title: "Sidebar Chat",
      description:
        "A chat interface positioned as a sidebar on the right side of the screen.",
      config: {
        mode: "sidebar" as ChatMode,
        appName: "Customer Support",
        theme: "light" as ChatTheme,
        position: "right" as ChatPosition,
        placeholder: "How can we help you today?",
      },
    },
    {
      id: "modal",
      title: "Modal Chat",
      description: "A centered modal dialog for focused conversations.",
      config: {
        mode: "modal" as ChatMode,
        appName: "AI Assistant",
        theme: "dark" as ChatTheme,
        placeholder: "Ask me anything...",
        bubbleText: "Need Help?",
        features: {
          showBubbleText: true,
        },
      },
    },
    {
      id: "fullscreen",
      title: "Fullscreen Chat",
      description: "A full-screen chat experience for immersive conversations.",
      config: {
        mode: "fullscreen" as ChatMode,
        appName: "Premium Support",
        theme: "light" as ChatTheme,
        placeholder: "Welcome to premium support!",
      },
    },
    {
      id: "embedded",
      title: "Embedded Chat",
      description: "An embedded chat that fits within your existing layout.",
      config: {
        mode: "embedded" as ChatMode,
        appName: "Help Center",
        theme: "auto" as ChatTheme,
        placeholder: "Search or ask a question...",
      },
    },
    {
      id: "brief-planner",
      title: "Brief Planner (Latitude Mock)",
      description:
        "Advanced AI brief planner with todo management and Middle Child Bar brand knowledge.",
      config: {
        mode: "embedded" as ChatMode,
        appName: "Brief Planner",
        theme: "light" as ChatTheme,
        placeholder: "Create marketing briefs and manage tasks...",
      },
    },
    {
      id: "integrated-workspace",
      title: "Integrated Workspace",
      description:
        "Chat interface with integrated TodoPanel and EmailPanel for comprehensive task and communication management.",
      config: {
        mode: "embedded" as ChatMode,
        appName: "Integrated Workspace",
        theme: "light" as ChatTheme,
        placeholder: "Manage todos and emails with AI assistance...",
      },
    },
    {
      id: "ud21-demo",
      title: "UD21 Email System",
      description:
        "Email management system with create_email and update_email tools for comprehensive email automation.",
      config: {
        mode: "embedded" as ChatMode,
        appName: "UD21 Email System",
        theme: "light" as ChatTheme,
        placeholder: "Manage emails with AI assistance...",
      },
    },
    {
      id: "reserve-demo",
      title: "Restaurant Reservations",
      description:
        "Restaurant reservation management with update_reservation tools for booking and table management.",
      config: {
        mode: "embedded" as ChatMode,
        appName: "Restaurant Reservations",
        theme: "light" as ChatTheme,
        placeholder: "Manage reservations with AI help...",
      },
    },
    {
      id: "shop-demo",
      title: "Shop Inventory",
      description:
        "Inventory management system with add_random_item_to_shop and comprehensive stock control tools.",
      config: {
        mode: "embedded" as ChatMode,
        appName: "Shop Inventory",
        theme: "light" as ChatTheme,
        placeholder: "Manage inventory with AI assistance...",
      },
    },
  ];

  const renderDemo = (demo: (typeof demos)[0]) => {
    const chatProps: ChatWrapperProps = {
      apiUrl: apiConfig.baseUrl,
      config: {
        ...demo.config,
        onMessage: (message) => {
          console.log("Message received:", message);
        },
        onError: (error) => {
          console.error("Chat error:", error);
        },
        features: {
          fileUpload: true,
          messageHistory: true,
          exportChat: false,
        },
      },
      tools: demo.id === "sidebar" ? {
        // Customer Support Tools
        create_ticket: (title: string, description: string, priority: string = "medium") => {
          console.log("Creating support ticket:", { title, description, priority });
          const ticketId = `TICK-${Date.now()}`;
          return { 
            success: true, 
            ticketId, 
            title, 
            description, 
            priority,
            status: "open",
            created: new Date().toISOString()
          };
        },
        search_knowledge_base: (query: string) => {
          console.log("Searching knowledge base:", query);
          const results = [
            { id: 1, title: `How to ${query}`, url: `/kb/how-to-${query.toLowerCase().replace(/\s+/g, '-')}`, relevance: 0.95 },
            { id: 2, title: `${query} troubleshooting guide`, url: `/kb/${query.toLowerCase().replace(/\s+/g, '-')}-troubleshooting`, relevance: 0.87 },
            { id: 3, title: `Common ${query} issues`, url: `/kb/common-${query.toLowerCase().replace(/\s+/g, '-')}-issues`, relevance: 0.73 }
          ];
          return { query, results, total: results.length };
        },
        get_user_info: (userId: string) => {
          console.log("Getting user info:", userId);
          return {
            userId,
            name: "John Doe",
            email: "john.doe@example.com",
            tier: "premium",
            joinDate: "2023-01-15",
            lastLogin: new Date().toISOString()
          };
        },
        escalate_to_human: (reason: string) => {
          console.log("Escalating to human agent:", reason);
          return {
            success: true,
            escalationId: `ESC-${Date.now()}`,
            reason,
            estimatedWaitTime: "5-10 minutes",
            queuePosition: 3
          };
        }
      } : demo.id === "modal" ? {
        // AI Assistant Tools
        get_weather: (location: string) => {
          console.log("Getting weather for:", location);
          const conditions = ["sunny", "cloudy", "rainy", "snowy"];
          const temps = [18, 22, 25, 28, 32];
          return { 
            location, 
            temperature: temps[Math.floor(Math.random() * temps.length)], 
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5
          };
        },
        set_reminder: (message: string, time: string) => {
          console.log("Setting reminder:", { message, time });
          return { 
            success: true, 
            reminderId: `REM-${Date.now()}`,
            message,
            scheduledFor: time,
            status: "scheduled"
          };
        },
        calculate: (expression: string) => {
          console.log("Calculating:", expression);
          try {
            // Simple calculator (in real app, use a safe expression evaluator)
            const result = eval(expression.replace(/[^0-9+\-*/().\s]/g, ''));
            return { expression, result, success: true };
          } catch (error) {
            return { expression, error: "Invalid expression", success: false };
          }
        },
        search_web: (query: string) => {
          console.log("Searching web:", query);
          return {
            query,
            results: [
              { title: `${query} - Wikipedia`, url: `https://en.wikipedia.org/wiki/${query}`, snippet: `Learn about ${query} on Wikipedia...` },
              { title: `${query} guide`, url: `https://example.com/${query}`, snippet: `Complete guide to ${query}...` },
              { title: `Latest ${query} news`, url: `https://news.example.com/${query}`, snippet: `Recent developments in ${query}...` }
            ]
          };
        }
      } : demo.id === "fullscreen" ? {
        // Premium Support Tools
        diagnose_system: (component: string) => {
          console.log("Diagnosing system component:", component);
          const issues = ["No issues found", "Minor performance issue", "Configuration needed", "Update required"];
          return {
            component,
            status: issues[Math.floor(Math.random() * issues.length)],
            details: `Diagnostic completed for ${component}`,
            recommendations: [`Check ${component} settings`, `Monitor ${component} performance`],
            timestamp: new Date().toISOString()
          };
        },
        deploy_fix: (fixId: string, environment: string = "staging") => {
          console.log("Deploying fix:", { fixId, environment });
          return {
            success: true,
            deploymentId: `DEP-${Date.now()}`,
            fixId,
            environment,
            status: "deployed",
            rollbackAvailable: true,
            deployedAt: new Date().toISOString()
          };
        },
        generate_report: (reportType: string, period: string = "last30days") => {
          console.log("Generating report:", { reportType, period });
          return {
            reportId: `RPT-${Date.now()}`,
            type: reportType,
            period,
            status: "generated",
            downloadUrl: `/reports/download/${reportType}-${Date.now()}.pdf`,
            generatedAt: new Date().toISOString(),
            size: "2.3 MB"
          };
        },
        schedule_maintenance: (datetime: string, duration: string) => {
          console.log("Scheduling maintenance:", { datetime, duration });
          return {
            success: true,
            maintenanceId: `MAINT-${Date.now()}`,
            scheduledFor: datetime,
            duration,
            status: "scheduled",
            affectedServices: ["API", "Dashboard", "Analytics"]
          };
        }
      } : {
        // Default Embedded Tools
        search_docs: (query: string) => {
          console.log("Searching documentation:", query);
          return { 
            query,
            results: [
              `Getting started with ${query}`,
              `${query} API reference`,
              `${query} best practices`,
              `Common ${query} questions`
            ] 
          };
        },
        create_ticket: (title: string, description: string) => {
          console.log("Creating help ticket:", { title, description });
          return { 
            ticketId: `HELP-${Date.now()}`, 
            title,
            description,
            status: "open",
            priority: "normal"
          };
        },
        get_status: (service: string) => {
          console.log("Getting service status:", service);
          const statuses = ["operational", "degraded", "maintenance", "outage"];
          return {
            service,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastUpdated: new Date().toISOString(),
            uptime: "99.9%"
          };
        }
      },
    };

    return <ChatWrapper {...chatProps} />;
  };


  const renderCustomDemo = () => {
    const chatProps: ChatWrapperProps = {
      apiUrl: apiConfig.baseUrl,
      config: {
        ...customConfig,
        onMessage: (message) => {
          console.log("Custom demo message:", message);
        },
        onError: (error) => {
          console.error("Custom demo error:", error);
        },
        features: {
          fileUpload: true,
          messageHistory: true,
          exportChat: true,
        },
      },
      tools: {
        // Custom demo tools
        create_task: (title: string, description: string, assignee?: string, dueDate?: string) => {
          console.log("Creating task:", { title, description, assignee, dueDate });
          return { 
            success: true, 
            taskId: `TASK-${Date.now()}`,
            title,
            description,
            assignee: assignee || "Unassigned",
            dueDate: dueDate || "No due date",
            status: "open",
            priority: "medium",
            created: new Date().toISOString()
          };
        },
        send_notification: (message: string, type: "info" | "warning" | "error" = "info", recipients?: string[]) => {
          console.log("Sending notification:", { message, type, recipients });
          return { 
            success: true, 
            notificationId: `NOTIF-${Date.now()}`,
            message,
            type,
            recipients: recipients || ["current_user"],
            sentAt: new Date().toISOString(),
            status: "delivered"
          };
        },
        search_database: (query: string, table?: string, limit: number = 10) => {
          console.log("Searching database:", { query, table, limit });
          const mockResults = Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
            id: `${Date.now()}-${i}`,
            title: `${query} result ${i + 1}`,
            table: table || "default_table",
            relevance: Math.random() * 0.5 + 0.5,
            lastModified: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
          }));
          return {
            query,
            table: table || "all_tables",
            results: mockResults,
            total: mockResults.length,
            executionTime: `${Math.random() * 100 + 50}ms`
          };
        },
        export_data: (format: "csv" | "json" | "excel" = "csv", filters?: any) => {
          console.log("Exporting data:", { format, filters });
          return {
            success: true,
            exportId: `EXP-${Date.now()}`,
            format,
            filters: filters || {},
            downloadUrl: `/exports/download-${Date.now()}.${format}`,
            fileSize: `${Math.floor(Math.random() * 500) + 100}KB`,
            recordCount: Math.floor(Math.random() * 1000) + 100,
            generatedAt: new Date().toISOString()
          };
        },
        analyze_metrics: (metric: string, timeRange: string = "7d") => {
          console.log("Analyzing metrics:", { metric, timeRange });
          return {
            metric,
            timeRange,
            summary: {
              average: Math.floor(Math.random() * 100) + 50,
              trend: Math.random() > 0.5 ? "increasing" : "decreasing",
              change: `${(Math.random() * 20 - 10).toFixed(1)}%`,
              peak: Math.floor(Math.random() * 150) + 100,
              low: Math.floor(Math.random() * 50) + 25
            },
            recommendations: [
              `Consider optimizing ${metric} performance`,
              `Monitor ${metric} trends closely`,
              `Set up alerts for ${metric} anomalies`
            ],
            lastUpdated: new Date().toISOString()
          };
        }
      },
    };

    return <ChatWrapper {...chatProps} />;
  };

  return (
    <div className="showcase-container">
      <div className="showcase-header">
        <h1 className="showcase-title">Chat Wrapper UI</h1>
        <p className="showcase-subtitle">
          A lightweight, customizable chat interface component built with pure
          CSS and React. Test different modes and configurations below.
        </p>

        {/* API Configuration Status */}
        <div
          style={{
            marginTop: "1rem",
            padding: "12px 16px",
            backgroundColor: apiConfig.useMockApi ? "#e6f3ff" : "#e6ffe6",
            border: `1px solid ${apiConfig.useMockApi ? "#b3d9ff" : "#b3ffb3"}`,
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "1rem auto 0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <span style={{ fontSize: "16px" }}>
              {apiConfig.useMockApi ? "🔧" : "🌐"}
            </span>
            <span>API Mode: {getConfigSummary().mode}</span>
            <span style={{ color: "#718096", fontWeight: 400 }}>
              → {getConfigSummary().baseUrl}
            </span>
          </div>
          {!apiConfig.useMockApi && (
            <div
              style={{
                fontSize: "12px",
                color: "#718096",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              Make sure your API server is running at {apiConfig.baseUrl}
            </div>
          )}
        </div>
      </div>

      {/* Custom Configuration Panel */}
      <div className="controls-panel">
        <h3>Custom Configuration</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div className="control-group">
            <label>Mode</label>
            <select
              value={customConfig.mode}
              onChange={(e) =>
                setCustomConfig({
                  ...customConfig,
                  mode: e.target.value as ChatMode,
                })
              }
            >
              <option value="sidebar">Sidebar</option>
              <option value="modal">Modal</option>
              <option value="fullscreen">Fullscreen</option>
              <option value="embedded">Embedded</option>
            </select>
          </div>

          <div className="control-group">
            <label>Theme</label>
            <select
              value={customConfig.theme}
              onChange={(e) =>
                setCustomConfig({
                  ...customConfig,
                  theme: e.target.value as ChatTheme,
                })
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {customConfig.mode === "sidebar" && (
            <div className="control-group">
              <label>Position</label>
              <select
                value={customConfig.position}
                onChange={(e) =>
                  setCustomConfig({
                    ...customConfig,
                    position: e.target.value as ChatPosition,
                  })
                }
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}

          <div className="control-group">
            <label>App Name</label>
            <input
              type="text"
              value={customConfig.appName}
              onChange={(e) =>
                setCustomConfig({ ...customConfig, appName: e.target.value })
              }
            />
          </div>

          <div className="control-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={customConfig.placeholder}
              onChange={(e) =>
                setCustomConfig({
                  ...customConfig,
                  placeholder: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button
          className="demo-button"
          style={{ marginTop: "1rem" }}
          onClick={() => setActiveDemo("custom")}
        >
          Launch Custom Demo
        </button>
        
        <ToolsDocumentation mode="custom" />
      </div>

      {/* Predefined Demos */}
      <div className="showcase-grid">
        {demos.map((demo) => (
          <div key={demo.id} className="demo-card">
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                fontSize: "0.8rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "#e2e8f0",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                Mode: {demo.config.mode}
              </span>
              <span
                style={{
                  background: "#e2e8f0",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                }}
              >
                Theme: {demo.config.theme}
              </span>
              {demo.config.position && (
                <span
                  style={{
                    background: "#e2e8f0",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                  }}
                >
                  Position: {demo.config.position}
                </span>
              )}
              <span
                style={{
                  background: "#e6fffa",
                  color: "#234e52",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.7rem",
                }}
              >
                🛠️ Tools enabled
              </span>
            </div>
            <button
              className="demo-button"
              onClick={() => setActiveDemo(demo.id)}
            >
              Launch Demo
            </button>
            
            <ToolsDocumentation mode={demo.id} />
          </div>
        ))}
      </div>

      {/* Brief Planner Demo Container */}
      {activeDemo === "brief-planner" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: "1000px",
            height: "80vh",
            zIndex: 1000,
            border: "2px solid #4299e1",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <EnhancedBriefPlannerDemo />
        </div>
      )}

      {/* Integrated Workspace Demo Container */}
      {activeDemo === "integrated-workspace" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            maxWidth: "1400px",
            height: "85vh",
            zIndex: 1000,
            border: "2px solid #4299e1",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <IntegratedChatDemo />
        </div>
      )}

      {/* UD21 Demo Container */}
      {activeDemo === "ud21-demo" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            maxWidth: "1200px",
            height: "85vh",
            zIndex: 1000,
            border: "2px solid #7c3aed",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <UD21Demo />
        </div>
      )}

      {/* Reserve Demo Container */}
      {activeDemo === "reserve-demo" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            maxWidth: "1200px",
            height: "85vh",
            zIndex: 1000,
            border: "2px solid #dc2626",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <ReserveDemo />
        </div>
      )}

      {/* Shop Demo Container */}
      {activeDemo === "shop-demo" && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95vw",
            maxWidth: "1200px",
            height: "85vh",
            zIndex: 1000,
            border: "2px solid #059669",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <ShopDemo />
        </div>
      )}

      {/* Embedded Demo Container */}
      {activeDemo === "embedded" && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "400px",
            height: "500px",
            zIndex: 1000,
            border: "2px solid #4299e1",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {renderDemo(demos.find((d) => d.id === "embedded")!)}
        </div>
      )}

      {/* Active Demo Render */}
      {activeDemo &&
        activeDemo !== "embedded" &&
        activeDemo !== "brief-planner" &&
        activeDemo !== "integrated-workspace" &&
        activeDemo !== "ud21-demo" &&
        activeDemo !== "reserve-demo" &&
        activeDemo !== "shop-demo" &&
        activeDemo !== "modal" && (
          <>
            {activeDemo === "fullscreen" && (
              <div className="active-demo-overlay" />
            )}

            <button
              className="close-demo-button"
              onClick={() => setActiveDemo(null)}
            >
              Close Demo
            </button>

            {activeDemo === "custom"
              ? renderCustomDemo()
              : renderDemo(demos.find((d) => d.id === activeDemo)!)}
          </>
        )}

      {/* Modal Demo - Special handling */}
      {activeDemo === "modal" && (
        <>
          <button
            className="close-demo-button"
            onClick={() => setActiveDemo(null)}
            style={{ zIndex: 1002 }}
          >
            Close Demo
          </button>
          {renderDemo(demos.find((d) => d.id === "modal")!)}
        </>
      )}

      {/* Close button for special demos */}
      {(activeDemo === "embedded" || activeDemo === "brief-planner" || activeDemo === "integrated-workspace" || activeDemo === "ud21-demo" || activeDemo === "reserve-demo" || activeDemo === "shop-demo") && (
        <>
          {(activeDemo === "brief-planner" || activeDemo === "integrated-workspace" || activeDemo === "ud21-demo" || activeDemo === "reserve-demo" || activeDemo === "shop-demo") && (
            <div className="active-demo-overlay" />
          )}
          <button
            className="close-demo-button"
            onClick={() => setActiveDemo(null)}
          >
            {activeDemo === "brief-planner"
              ? "Close Brief Planner"
              : activeDemo === "integrated-workspace"
              ? "Close Integrated Workspace"
              : activeDemo === "ud21-demo"
              ? "Close UD21 Demo"
              : activeDemo === "reserve-demo"
              ? "Close Reserve Demo"
              : activeDemo === "shop-demo"
              ? "Close Shop Demo"
              : "Close Embedded Demo"}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
