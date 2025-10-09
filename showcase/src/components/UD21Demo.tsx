"use client";

import { useState } from "react";
import { ChatWrapper, ChatWrapperProps } from "@oddle/chat-wrapper-ui";
import { apiConfig } from "../config/apiConfig";

// Types for UD21 email system
interface Email {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  status: "draft" | "sent" | "scheduled" | "failed";
  priority?: "low" | "medium" | "high";
  created_at: string;
  sent_at?: string;
  scheduled_for?: string;
  read_receipt?: boolean;
  attachments?: string[];
}

// EmailPanel Component for UD21
const EmailPanel = ({
  emails,
  onCreateEmail,
  onUpdateEmail,
  onDeleteEmail,
  isLoading,
}: {
  emails: Email[];
  onCreateEmail: (email: Omit<Email, "id" | "created_at">) => void;
  onUpdateEmail: (id: string, updates: Partial<Email>) => void;
  onDeleteEmail: (id: string) => void;
  isLoading: boolean;
}) => {
  const [newEmail, setNewEmail] = useState({
    subject: "",
    body: "",
    to: "",
    cc: "",
    priority: "medium" as Email["priority"],
    read_receipt: false,
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.subject.trim() || !newEmail.to.trim()) return;

    onCreateEmail({
      subject: newEmail.subject.trim(),
      body: newEmail.body.trim(),
      from: "ud21@example.com",
      to: newEmail.to
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
      cc: newEmail.cc
        ? newEmail.cc
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean)
        : undefined,
      status: "draft",
      priority: newEmail.priority,
      read_receipt: newEmail.read_receipt,
    });

    setNewEmail({
      subject: "",
      body: "",
      to: "",
      cc: "",
      priority: "medium",
      read_receipt: false,
    });
    setShowForm(false);
  };

  return (
    <div
      style={{
        width: "400px",
        borderLeft: "1px solid #e2e8f0",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontWeight: "600",
              color: "#1a202c",
              margin: 0,
            }}
          >
            UD21 Emails
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "4px 12px",
              fontSize: "14px",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#6d28d9")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#7c3aed")
            }
            disabled={isLoading}
          >
            {showForm ? "Cancel" : "New Email"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <input
              type="email"
              value={newEmail.to}
              onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
              placeholder="To: email@example.com"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              disabled={isLoading}
            />
            <input
              type="email"
              value={newEmail.cc}
              onChange={(e) => setNewEmail({ ...newEmail, cc: e.target.value })}
              placeholder="CC: (optional)"
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              disabled={isLoading}
            />
            <input
              type="text"
              value={newEmail.subject}
              onChange={(e) =>
                setNewEmail({ ...newEmail, subject: e.target.value })
              }
              placeholder="Subject..."
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              disabled={isLoading}
            />
            <textarea
              value={newEmail.body}
              onChange={(e) =>
                setNewEmail({ ...newEmail, body: e.target.value })
              }
              placeholder="Email body..."
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
              rows={3}
              disabled={isLoading}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <select
                value={newEmail.priority}
                onChange={(e) =>
                  setNewEmail({
                    ...newEmail,
                    priority: e.target.value as Email["priority"],
                  })
                }
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                disabled={isLoading}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                }}
              >
                <input
                  type="checkbox"
                  checked={newEmail.read_receipt}
                  onChange={(e) =>
                    setNewEmail({ ...newEmail, read_receipt: e.target.checked })
                  }
                  disabled={isLoading}
                />
                Read Receipt
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: "14px",
                backgroundColor: "#059669",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#047857")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#059669")
              }
              disabled={
                isLoading || !newEmail.subject.trim() || !newEmail.to.trim()
              }
            >
              Create Email
            </button>
          </form>
        )}
      </div>

      {/* Email List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {emails.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: "32px 0",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>No emails yet</p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Create one or ask the AI to help!
            </p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "box-shadow 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1)")
              }
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {/* Email Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <h4
                    style={{
                      fontWeight: "500",
                      color: "#1a202c",
                      fontSize: "14px",
                      lineHeight: "1.25",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {email.subject}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    To: {email.to.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteEmail(email.id)}
                  style={{
                    color: "#9ca3af",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    fontSize: "18px",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#dc2626")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>

              {/* Email Body Preview */}
              {email.body && (
                <p
                  style={{
                    color: "#4b5563",
                    fontSize: "14px",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {email.body}
                </p>
              )}

              {/* Email Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    border: "1px solid",
                    backgroundColor:
                      email.status === "sent"
                        ? "#dcfce7"
                        : email.status === "scheduled"
                        ? "#dbeafe"
                        : email.status === "failed"
                        ? "#fecaca"
                        : "#f3f4f6",
                    color:
                      email.status === "sent"
                        ? "#166534"
                        : email.status === "scheduled"
                        ? "#1e40af"
                        : email.status === "failed"
                        ? "#991b1b"
                        : "#374151",
                    borderColor:
                      email.status === "sent"
                        ? "#bbf7d0"
                        : email.status === "scheduled"
                        ? "#bfdbfe"
                        : email.status === "failed"
                        ? "#fca5a5"
                        : "#d1d5db",
                  }}
                >
                  {email.status}
                </span>
                {email.priority && (
                  <span
                    style={{
                      fontWeight: "500",
                      color:
                        email.priority === "high"
                          ? "#dc2626"
                          : email.priority === "medium"
                          ? "#d97706"
                          : "#059669",
                    }}
                  >
                    {email.priority}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              {email.status === "draft" && (
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <button
                    onClick={() =>
                      onUpdateEmail(email.id, {
                        status: "sent",
                        sent_at: new Date().toISOString(),
                      })
                    }
                    style={{
                      padding: "2px 8px",
                      fontSize: "12px",
                      backgroundColor: "#dcfce7",
                      color: "#166534",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#bbf7d0")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dcfce7")
                    }
                    disabled={isLoading}
                  >
                    Send Now
                  </button>
                  <button
                    onClick={() =>
                      onUpdateEmail(email.id, {
                        status: "scheduled",
                        scheduled_for: new Date(
                          Date.now() + 3600000
                        ).toISOString(),
                      })
                    }
                    style={{
                      padding: "2px 8px",
                      fontSize: "12px",
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#bfdbfe")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dbeafe")
                    }
                    disabled={isLoading}
                  >
                    Schedule
                  </button>
                </div>
              )}

              {/* Created/Sent Date */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                }}
              >
                {email.status === "sent" && email.sent_at ? (
                  <>Sent: {new Date(email.sent_at).toLocaleDateString()}</>
                ) : email.status === "scheduled" && email.scheduled_for ? (
                  <>
                    Scheduled:{" "}
                    {new Date(email.scheduled_for).toLocaleDateString()}
                  </>
                ) : (
                  <>
                    Created: {new Date(email.created_at).toLocaleDateString()}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main UD21 Demo Component
export const UD21Demo = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [showEmailPanel, setShowEmailPanel] = useState(true);

  // Email management functions
  const handleCreateEmail = (email: Omit<Email, "id" | "created_at">) => {
    const newEmail: Email = {
      ...email,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setEmails((prev) => [...prev, newEmail]);
  };

  const handleUpdateEmail = (id: string, updates: Partial<Email>) => {
    setEmails((prev) =>
      prev.map((email) => (email.id === id ? { ...email, ...updates } : email))
    );
  };

  const handleDeleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
  };

  // Chat wrapper props with integrated tools
  const chatProps: ChatWrapperProps = {
    apiUrl: apiConfig.baseUrl + "/api/ud21-email-agent", // Using conversation endpoint
    config: {
      mode: "embedded",
      appName: "UD21 Email System",
      theme: "light",
      placeholder: "Manage emails or ask for help...",
      constrainedHeight: true, // Fill parent container completely
      onMessage: (message) => {
        console.log("Message received:", message);
      },
      onError: (error) => {
        console.error("Chat error:", error);
      },
      onToolResult: (tool, result) => {
        console.log("Tool result:", tool, result);
        if (tool === "emails" && Array.isArray(result)) {
          setEmails(result);
        }
      },
      features: {
        fileUpload: true,
        messageHistory: true,
        exportChat: true,
        showToolResults: false,
      },
    },
    tools: {
      // Todo management tools
      create_to_do: (params: { description: string }) => {
        console.log("Creating todo:", params);

        if (!params.description) {
          return {
            success: false,
            error: "Missing required parameter: description",
          };
        }

        const newTodo = {
          id: Date.now().toString(),
          description: params.description,
          completed: false,
          created_at: new Date().toISOString(),
        };

        // For now, we'll just log it since there's no todo state in this demo
        console.log("Created todo:", newTodo);

        return {
          success: true,
          todo: newTodo,
          message: `Created todo: "${params.description}"`,
        };
      },

      read_to_dos: (params: {}) => {
        console.log("Reading todos:", params);

        // For now, return empty array since there's no todo state in this demo
        const todos: any[] = [];

        return {
          success: true,
          todos,
          total: todos.length,
          message: `Found ${todos.length} todo${todos.length !== 1 ? "s" : ""}`,
        };
      },

      // Email management tools
      create_email: (params: { subject: string; body: string }) => {
        console.log("Creating email:", params);

        if (!params.subject || !params.body) {
          return {
            success: false,
            error: "Missing required parameters: subject and body are required",
          };
        }

        const newEmail: Email = {
          id: Date.now().toString(),
          subject: params.subject,
          body: params.body,
          from: "ud21@example.com",
          to: ["user@example.com"], // Default recipient
          status: "draft",
          priority: "medium",
          created_at: new Date().toISOString(),
        };
        setEmails((prev) => [...prev, newEmail]);
        return {
          success: true,
          email: newEmail,
          message: `Created email draft: "${params.subject}"`,
        };
      },

      update_email: (params: {
        email_id: string;
        subject?: string;
        body?: string;
      }) => {
        console.log("Updating email:", params);

        if (!params.email_id) {
          return {
            success: false,
            error: "Missing required parameter: email_id",
          };
        }

        const email = emails.find((e) => e.id === params.email_id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }

        const updates: Partial<Email> = {};
        if (params.subject) updates.subject = params.subject;
        if (params.body) updates.body = params.body;

        const updatedEmail = { ...email, ...updates };
        setEmails((prev) =>
          prev.map((e) => (e.id === params.email_id ? updatedEmail : e))
        );

        return {
          success: true,
          email: updatedEmail,
          message: `Updated email: "${email.subject}"`,
        };
      },

      send_email: (params: { id: string }) => {
        console.log("Sending email:", params);
        const email = emails.find((e) => e.id === params.id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }

        const updatedEmail = {
          ...email,
          status: "sent" as const,
          sent_at: new Date().toISOString(),
        };
        setEmails((prev) =>
          prev.map((e) => (e.id === params.id ? updatedEmail : e))
        );
        return {
          success: true,
          email: updatedEmail,
          message: `Sent email: "${email.subject}"`,
        };
      },

      schedule_email: (params: { id: string; scheduledFor: string }) => {
        console.log("Scheduling email:", params);
        const email = emails.find((e) => e.id === params.id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }

        const updatedEmail = {
          ...email,
          status: "scheduled" as const,
          scheduled_for: params.scheduledFor,
        };
        setEmails((prev) =>
          prev.map((e) => (e.id === params.id ? updatedEmail : e))
        );
        return {
          success: true,
          email: updatedEmail,
          message: `Scheduled email: "${email.subject}" for ${new Date(
            params.scheduledFor
          ).toLocaleString()}`,
        };
      },

      delete_email: (params: { id: string }) => {
        console.log("Deleting email:", params);
        const email = emails.find((e) => e.id === params.id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }

        setEmails((prev) => prev.filter((e) => e.id !== params.id));
        return {
          success: true,
          message: `Deleted email: "${email.subject}"`,
        };
      },

      list_emails: (params: { status?: Email["status"] }) => {
        console.log("Listing emails:", params);
        const filteredEmails = params.status
          ? emails.filter((e) => e.status === params.status)
          : emails;
        return {
          success: true,
          emails: filteredEmails,
          total: filteredEmails.length,
          message: `Found ${filteredEmails.length} email${
            filteredEmails.length !== 1 ? "s" : ""
          }`,
        };
      },

      // UD21 specific tools
      get_email_stats: (params: {}) => {
        console.log("Getting email statistics:", params);
        const stats = {
          total: emails.length,
          drafts: emails.filter((e) => e.status === "draft").length,
          sent: emails.filter((e) => e.status === "sent").length,
          scheduled: emails.filter((e) => e.status === "scheduled").length,
          failed: emails.filter((e) => e.status === "failed").length,
        };

        return {
          success: true,
          stats,
          message: `Email stats: ${stats.total} total, ${stats.sent} sent, ${stats.drafts} drafts`,
        };
      },
    },
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "#faf5ff",
        position: "relative",
        isolation: "isolate",
      }}
    >
      {/* Left Side Email Panel */}
      {showEmailPanel && (
        <EmailPanel
          emails={emails}
          onCreateEmail={handleCreateEmail}
          onUpdateEmail={handleUpdateEmail}
          onDeleteEmail={handleDeleteEmail}
          isLoading={false}
        />
      )}

      {/* Main Chat Area on the Right */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "white",
            borderBottom: "1px solid #e2e8f0",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1a202c",
                margin: "0 0 4px 0",
              }}
            >
              UD21 Email System
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              AI-powered email management and automation
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={() => setShowEmailPanel(!showEmailPanel)}
              style={{
                padding: "4px 12px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
                backgroundColor: showEmailPanel ? "#e0e7ff" : "#f3f4f6",
                color: showEmailPanel ? "#3730a3" : "#374151",
              }}
              onMouseOver={(e) => {
                if (!showEmailPanel)
                  e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = showEmailPanel
                  ? "#e0e7ff"
                  : "#f3f4f6";
              }}
            >
              {showEmailPanel ? "Hide" : "Show"} Emails
            </button>
          </div>
        </div>

        {/* Chat Wrapper */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <ChatWrapper {...chatProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UD21Demo;
