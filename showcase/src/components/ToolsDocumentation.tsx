import { useState } from 'react';

interface Tool {
  name: string;
  description: string;
  example: string;
  parameters: string[];
}

interface ToolsDocumentationProps {
  mode: string;
}

const toolsByMode: Record<string, Tool[]> = {
  sidebar: [
    {
      name: "create_ticket",
      description: "Create a support ticket for customer issues",
      example: "Create a ticket for login issues with high priority",
      parameters: ["title", "description", "priority (optional)"]
    },
    {
      name: "search_knowledge_base", 
      description: "Search the knowledge base for solutions",
      example: "Search knowledge base for password reset",
      parameters: ["query"]
    },
    {
      name: "get_user_info",
      description: "Get information about a user",
      example: "Get user info for user123",
      parameters: ["userId"]
    },
    {
      name: "escalate_to_human",
      description: "Escalate the conversation to a human agent",
      example: "Escalate to human for billing issues",
      parameters: ["reason"]
    }
  ],
  modal: [
    {
      name: "get_weather",
      description: "Get weather information for a location",
      example: "Get weather for New York",
      parameters: ["location"]
    },
    {
      name: "set_reminder",
      description: "Set a reminder for a specific time",
      example: "Set reminder to call John at 3pm",
      parameters: ["message", "time"]
    },
    {
      name: "calculate",
      description: "Perform mathematical calculations",
      example: "Calculate 15 * 24 + 100",
      parameters: ["expression"]
    },
    {
      name: "search_web",
      description: "Search the web for information",
      example: "Search web for React tutorials",
      parameters: ["query"]
    }
  ],
  fullscreen: [
    {
      name: "diagnose_system",
      description: "Diagnose system components for issues",
      example: "Diagnose database performance",
      parameters: ["component"]
    },
    {
      name: "deploy_fix",
      description: "Deploy a fix to an environment",
      example: "Deploy fix FIX-123 to production",
      parameters: ["fixId", "environment (optional)"]
    },
    {
      name: "generate_report",
      description: "Generate system reports",
      example: "Generate performance report for last week",
      parameters: ["reportType", "period (optional)"]
    },
    {
      name: "schedule_maintenance",
      description: "Schedule system maintenance",
      example: "Schedule maintenance tomorrow at 2am for 2 hours",
      parameters: ["datetime", "duration"]
    }
  ],
  embedded: [
    {
      name: "search_docs",
      description: "Search documentation and help articles",
      example: "Search docs for API authentication",
      parameters: ["query"]
    },
    {
      name: "create_ticket",
      description: "Create a help ticket",
      example: "Create ticket for integration issues",
      parameters: ["title", "description"]
    },
    {
      name: "get_status",
      description: "Get service status information",
      example: "Get status for payment service",
      parameters: ["service"]
    }
  ],
  custom: [
    {
      name: "create_task",
      description: "Create a new task",
      example: "Create task to review code for John due tomorrow",
      parameters: ["title", "description", "assignee (optional)", "dueDate (optional)"]
    },
    {
      name: "send_notification",
      description: "Send notifications to users",
      example: "Send warning notification about system update",
      parameters: ["message", "type (optional)", "recipients (optional)"]
    },
    {
      name: "search_database",
      description: "Search database records",
      example: "Search database for customer orders in users table limit 5",
      parameters: ["query", "table (optional)", "limit (optional)"]
    },
    {
      name: "export_data",
      description: "Export data in various formats",
      example: "Export data as excel with filters",
      parameters: ["format (optional)", "filters (optional)"]
    },
    {
      name: "analyze_metrics",
      description: "Analyze system metrics and performance",
      example: "Analyze CPU usage metrics for last 30 days",
      parameters: ["metric", "timeRange (optional)"]
    }
  ]
};

export function ToolsDocumentation({ mode }: ToolsDocumentationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const tools = toolsByMode[mode] || [];

  if (tools.length === 0) return null;

  return (
    <div style={{ 
      marginTop: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: '#f8fafc',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151'
        }}
      >
        <span>🛠️ Available Tools ({tools.length})</span>
        <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div style={{ padding: '16px', backgroundColor: '#ffffff' }}>
          <p style={{ 
            margin: '0 0 16px 0', 
            fontSize: '12px', 
            color: '#6b7280',
            fontStyle: 'italic' 
          }}>
            Try asking the AI to use these tools in natural language:
          </p>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {tools.map((tool) => (
              <div key={tool.name} style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ 
                  fontWeight: '600', 
                  fontSize: '13px',
                  color: '#1f2937',
                  marginBottom: '4px'
                }}>
                  {tool.name}
                </div>
                <div style={{ 
                  fontSize: '12px',
                  color: '#4b5563',
                  marginBottom: '8px'
                }}>
                  {tool.description}
                </div>
                <div style={{ 
                  fontSize: '11px',
                  color: '#059669',
                  backgroundColor: '#ecfdf5',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontFamily: 'monospace'
                }}>
                  💬 "{tool.example}"
                </div>
                <div style={{ 
                  fontSize: '10px',
                  color: '#6b7280',
                  marginTop: '6px'
                }}>
                  Parameters: {tool.parameters.join(', ')}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#eff6ff',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#1e40af'
          }}>
            💡 <strong>Tip:</strong> You can ask the AI to use these tools in natural language. For example: 
            "Can you help me create a ticket?" or "What's the weather like in Paris?"
          </div>
        </div>
      )}
    </div>
  );
}