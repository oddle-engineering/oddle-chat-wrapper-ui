"use client";

import { useState } from "react";
import { ChatWrapper, ChatWrapperProps } from "@oddle/chat-wrapper-ui";
import { apiConfig } from "../config/apiConfig";

// Types for panels
interface Todo {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  created_at: string;
  updated_at?: string;
  due_date?: string;
}

interface Email {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  status: "draft" | "sent" | "scheduled";
  priority?: "low" | "medium" | "high";
  created_at: string;
  sent_at?: string;
  scheduled_for?: string;
}

// TodoPanel Component
const TodoPanel = ({
  todos,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  isLoading,
}: {
  todos: Todo[];
  onCreateTodo: (title: string, description: string) => void;
  onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
  isLoading: boolean;
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    
    onCreateTodo(newTodoTitle.trim(), newTodoDescription.trim());
    setNewTodoTitle("");
    setNewTodoDescription("");
    setShowForm(false);
  };


  return (
    <div style={{
      width: '320px',
      borderLeft: '1px solid #e2e8f0',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            fontWeight: '600',
            color: '#1a202c',
            margin: 0
          }}>Todos</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '4px 12px',
              fontSize: '14px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5aa0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3182ce'}
            disabled={isLoading}
          >
            {showForm ? "Cancel" : "Add Todo"}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Todo title..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              disabled={isLoading}
            />
            <textarea
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              placeholder="Description (optional)..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              rows={2}
              disabled={isLoading}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              disabled={isLoading || !newTodoTitle.trim()}
            >
              Add Todo
            </button>
          </form>
        )}
      </div>

      {/* Todo List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {todos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '32px 0'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>No todos yet</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Create one or ask the AI to help!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'box-shadow 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Todo Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <h4 style={{
                  fontWeight: '500',
                  color: '#1a202c',
                  fontSize: '14px',
                  lineHeight: '1.25',
                  margin: 0
                }}>
                  {todo.title}
                </h4>
                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  style={{
                    color: '#9ca3af',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    fontSize: '18px',
                    padding: 0,
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>

              {/* Todo Description */}
              {todo.description && (
                <p style={{
                  color: '#4b5563',
                  fontSize: '14px',
                  margin: 0
                }}>{todo.description}</p>
              )}

              {/* Todo Meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px'
              }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid',
                  backgroundColor: todo.status === 'completed' ? '#dcfce7' : todo.status === 'in_progress' ? '#dbeafe' : '#f3f4f6',
                  color: todo.status === 'completed' ? '#166534' : todo.status === 'in_progress' ? '#1e40af' : '#374151',
                  borderColor: todo.status === 'completed' ? '#bbf7d0' : todo.status === 'in_progress' ? '#bfdbfe' : '#d1d5db'
                }}>
                  {todo.status.replace("_", " ")}
                </span>
                {todo.priority && (
                  <span style={{
                    fontWeight: '500',
                    color: todo.priority === 'high' ? '#dc2626' : todo.priority === 'medium' ? '#d97706' : todo.priority === 'low' ? '#059669' : '#9ca3af'
                  }}>
                    {todo.priority} priority
                  </span>
                )}
              </div>

              {/* Status Update Buttons */}
              <div style={{
                display: 'flex',
                gap: '4px'
              }}>
                {todo.status !== "pending" && (
                  <button
                    onClick={() => onUpdateTodo(todo.id, { status: "pending" })}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    disabled={isLoading}
                  >
                    Pending
                  </button>
                )}
                {todo.status !== "in_progress" && (
                  <button
                    onClick={() => onUpdateTodo(todo.id, { status: "in_progress" })}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
                    disabled={isLoading}
                  >
                    In Progress
                  </button>
                )}
                {todo.status !== "completed" && (
                  <button
                    onClick={() => onUpdateTodo(todo.id, { status: "completed" })}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bbf7d0'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dcfce7'}
                    disabled={isLoading}
                  >
                    Complete
                  </button>
                )}
              </div>

              {/* Created Date */}
              <div style={{
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                Created: {new Date(todo.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// EmailPanel Component
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
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.subject.trim() || !newEmail.to.trim()) return;
    
    onCreateEmail({
      subject: newEmail.subject.trim(),
      body: newEmail.body.trim(),
      from: "user@example.com", // Could be configurable
      to: newEmail.to.split(",").map(email => email.trim()).filter(Boolean),
      cc: newEmail.cc ? newEmail.cc.split(",").map(email => email.trim()).filter(Boolean) : undefined,
      status: "draft",
      priority: newEmail.priority,
    });
    
    setNewEmail({
      subject: "",
      body: "",
      to: "",
      cc: "",
      priority: "medium",
    });
    setShowForm(false);
  };


  return (
    <div style={{
      width: '320px',
      borderLeft: '1px solid #e2e8f0',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            fontWeight: '600',
            color: '#1a202c',
            margin: 0
          }}>Emails</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '4px 12px',
              fontSize: '14px',
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2c5aa0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3182ce'}
            disabled={isLoading}
          >
            {showForm ? "Cancel" : "New Email"}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="email"
              value={newEmail.to}
              onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
              placeholder="To: email@example.com"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              disabled={isLoading}
            />
            <input
              type="email"
              value={newEmail.cc}
              onChange={(e) => setNewEmail({ ...newEmail, cc: e.target.value })}
              placeholder="CC: (optional)"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              disabled={isLoading}
            />
            <input
              type="text"
              value={newEmail.subject}
              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
              placeholder="Subject..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              disabled={isLoading}
            />
            <textarea
              value={newEmail.body}
              onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
              placeholder="Email body..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              rows={3}
              disabled={isLoading}
            />
            <select
              value={newEmail.priority}
              onChange={(e) => setNewEmail({ ...newEmail, priority: e.target.value as Email["priority"] })}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              disabled={isLoading}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '14px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              disabled={isLoading || !newEmail.subject.trim() || !newEmail.to.trim()}
            >
              Create Draft
            </button>
          </form>
        )}
      </div>

      {/* Email List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {emails.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '32px 0'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>No emails yet</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Create one or ask the AI to help!</p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'box-shadow 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Email Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <h4 style={{
                    fontWeight: '500',
                    color: '#1a202c',
                    fontSize: '14px',
                    lineHeight: '1.25',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {email.subject}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '4px 0 0 0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    To: {email.to.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteEmail(email.id)}
                  style={{
                    color: '#9ca3af',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    fontSize: '18px',
                    padding: 0,
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}
                  disabled={isLoading}
                >
                  ×
                </button>
              </div>

              {/* Email Body Preview */}
              {email.body && (
                <p style={{
                  color: '#4b5563',
                  fontSize: '14px',
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {email.body}
                </p>
              )}

              {/* Email Meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px'
              }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid',
                  backgroundColor: email.status === 'sent' ? '#dcfce7' : email.status === 'scheduled' ? '#dbeafe' : '#f3f4f6',
                  color: email.status === 'sent' ? '#166534' : email.status === 'scheduled' ? '#1e40af' : '#374151',
                  borderColor: email.status === 'sent' ? '#bbf7d0' : email.status === 'scheduled' ? '#bfdbfe' : '#d1d5db'
                }}>
                  {email.status}
                </span>
                {email.priority && (
                  <span style={{
                    fontWeight: '500',
                    color: email.priority === 'high' ? '#dc2626' : email.priority === 'medium' ? '#d97706' : email.priority === 'low' ? '#059669' : '#9ca3af'
                  }}>
                    {email.priority}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              {email.status === "draft" && (
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  <button
                    onClick={() => onUpdateEmail(email.id, { 
                      status: "sent", 
                      sent_at: new Date().toISOString() 
                    })}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bbf7d0'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dcfce7'}
                    disabled={isLoading}
                  >
                    Send Now
                  </button>
                  <button
                    onClick={() => onUpdateEmail(email.id, { 
                      status: "scheduled", 
                      scheduled_for: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
                    })}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
                    disabled={isLoading}
                  >
                    Schedule
                  </button>
                </div>
              )}

              {/* Created/Sent Date */}
              <div style={{
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                {email.status === "sent" && email.sent_at ? (
                  <>Sent: {new Date(email.sent_at).toLocaleDateString()}</>
                ) : email.status === "scheduled" && email.scheduled_for ? (
                  <>Scheduled: {new Date(email.scheduled_for).toLocaleDateString()}</>
                ) : (
                  <>Created: {new Date(email.created_at).toLocaleDateString()}</>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Integrated Chat Demo Component
export const IntegratedChatDemo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [showTodoPanel, setShowTodoPanel] = useState(true);
  const [showEmailPanel, setShowEmailPanel] = useState(true);

  // Todo management functions
  const handleCreateTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
      priority: "medium",
      created_at: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => 
        todo.id === id 
          ? { ...todo, ...updates, updated_at: new Date().toISOString() }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

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
      prev.map((email) => 
        email.id === id 
          ? { ...email, ...updates }
          : email
      )
    );
  };

  const handleDeleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
  };

  // Chat wrapper props with integrated tools
  const chatProps: ChatWrapperProps = {
    apiUrl: apiConfig.baseUrl,
    config: {
      mode: "embedded",
      appName: "Integrated Workspace",
      theme: "light",
      placeholder: "Manage your todos and emails, or ask for help...",
      onMessage: (message) => {
        console.log("Message received:", message);
      },
      onError: (error) => {
        console.error("Chat error:", error);
      },
      onToolResult: (tool, result) => {
        console.log("Tool result:", tool, result);
        // Handle tool results to update panels
        if (tool === "todos" && Array.isArray(result)) {
          setTodos(result);
        } else if (tool === "emails" && Array.isArray(result)) {
          setEmails(result);
        }
      },
      features: {
        fileUpload: true,
        messageHistory: true,
        exportChat: true,
        showToolResults: true,
      },
    },
    tools: {
      // Todo management tools
      create_todo: (title: string, description: string = "", priority: "low" | "medium" | "high" = "medium") => {
        console.log("Creating todo:", { title, description, priority });
        const newTodo: Todo = {
          id: Date.now().toString(),
          title,
          description,
          status: "pending",
          priority,
          created_at: new Date().toISOString(),
        };
        setTodos((prev) => [...prev, newTodo]);
        return { 
          success: true, 
          todo: newTodo,
          message: `Created todo: "${title}"` 
        };
      },
      
      update_todo: (id: string, updates: Partial<Todo>) => {
        console.log("Updating todo:", { id, updates });
        const todo = todos.find(t => t.id === id);
        if (!todo) {
          return { success: false, error: "Todo not found" };
        }
        
        const updatedTodo = { ...todo, ...updates, updated_at: new Date().toISOString() };
        setTodos((prev) => prev.map(t => t.id === id ? updatedTodo : t));
        return { 
          success: true, 
          todo: updatedTodo,
          message: `Updated todo: "${todo.title}"` 
        };
      },
      
      complete_todo: (id: string) => {
        console.log("Completing todo:", id);
        const todo = todos.find(t => t.id === id);
        if (!todo) {
          return { success: false, error: "Todo not found" };
        }
        
        const updatedTodo = { ...todo, status: "completed" as const, updated_at: new Date().toISOString() };
        setTodos((prev) => prev.map(t => t.id === id ? updatedTodo : t));
        return { 
          success: true, 
          todo: updatedTodo,
          message: `Completed todo: "${todo.title}"` 
        };
      },
      
      delete_todo: (id: string) => {
        console.log("Deleting todo:", id);
        const todo = todos.find(t => t.id === id);
        if (!todo) {
          return { success: false, error: "Todo not found" };
        }
        
        setTodos((prev) => prev.filter(t => t.id !== id));
        return { 
          success: true, 
          message: `Deleted todo: "${todo.title}"` 
        };
      },
      
      list_todos: (status?: Todo["status"]) => {
        console.log("Listing todos:", { status });
        const filteredTodos = status ? todos.filter(t => t.status === status) : todos;
        return { 
          success: true, 
          todos: filteredTodos,
          total: filteredTodos.length,
          message: `Found ${filteredTodos.length} todo${filteredTodos.length !== 1 ? 's' : ''}` 
        };
      },

      // Email management tools
      create_email: (subject: string, body: string, to: string, cc?: string, priority: "low" | "medium" | "high" = "medium") => {
        console.log("Creating email:", { subject, body, to, cc, priority });
        const newEmail: Email = {
          id: Date.now().toString(),
          subject,
          body,
          from: "user@example.com",
          to: to.split(",").map(email => email.trim()),
          cc: cc ? cc.split(",").map(email => email.trim()) : undefined,
          status: "draft",
          priority,
          created_at: new Date().toISOString(),
        };
        setEmails((prev) => [...prev, newEmail]);
        return { 
          success: true, 
          email: newEmail,
          message: `Created email draft: "${subject}"` 
        };
      },
      
      send_email: (id: string) => {
        console.log("Sending email:", id);
        const email = emails.find(e => e.id === id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }
        
        const updatedEmail = { ...email, status: "sent" as const, sent_at: new Date().toISOString() };
        setEmails((prev) => prev.map(e => e.id === id ? updatedEmail : e));
        return { 
          success: true, 
          email: updatedEmail,
          message: `Sent email: "${email.subject}"` 
        };
      },
      
      schedule_email: (id: string, scheduledFor: string) => {
        console.log("Scheduling email:", { id, scheduledFor });
        const email = emails.find(e => e.id === id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }
        
        const updatedEmail = { 
          ...email, 
          status: "scheduled" as const, 
          scheduled_for: scheduledFor 
        };
        setEmails((prev) => prev.map(e => e.id === id ? updatedEmail : e));
        return { 
          success: true, 
          email: updatedEmail,
          message: `Scheduled email: "${email.subject}" for ${new Date(scheduledFor).toLocaleString()}` 
        };
      },
      
      delete_email: (id: string) => {
        console.log("Deleting email:", id);
        const email = emails.find(e => e.id === id);
        if (!email) {
          return { success: false, error: "Email not found" };
        }
        
        setEmails((prev) => prev.filter(e => e.id !== id));
        return { 
          success: true, 
          message: `Deleted email: "${email.subject}"` 
        };
      },
      
      list_emails: (status?: Email["status"]) => {
        console.log("Listing emails:", { status });
        const filteredEmails = status ? emails.filter(e => e.status === status) : emails;
        return { 
          success: true, 
          emails: filteredEmails,
          total: filteredEmails.length,
          message: `Found ${filteredEmails.length} email${filteredEmails.length !== 1 ? 's' : ''}` 
        };
      },

      // General workspace tools
      get_workspace_summary: () => {
        console.log("Getting workspace summary");
        const todoStats = {
          total: todos.length,
          pending: todos.filter(t => t.status === "pending").length,
          in_progress: todos.filter(t => t.status === "in_progress").length,
          completed: todos.filter(t => t.status === "completed").length,
        };
        
        const emailStats = {
          total: emails.length,
          drafts: emails.filter(e => e.status === "draft").length,
          sent: emails.filter(e => e.status === "sent").length,
          scheduled: emails.filter(e => e.status === "scheduled").length,
        };
        
        return {
          success: true,
          summary: {
            todos: todoStats,
            emails: emailStats,
          },
          message: `Workspace summary: ${todoStats.total} todos, ${emailStats.total} emails`
        };
      },
    },
  };

  return (
    <div style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#f9fafb',
      position: 'relative',
      isolation: 'isolate'
    }}>
      {/* Left Side Panels */}
      {showTodoPanel && (
        <TodoPanel
          todos={todos}
          onCreateTodo={handleCreateTodo}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
          isLoading={false}
        />
      )}

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
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1a202c',
              margin: '0 0 4px 0'
            }}>Integrated Workspace</h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>Chat with AI to manage your todos and emails</p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <button
              onClick={() => setShowTodoPanel(!showTodoPanel)}
              style={{
                padding: '4px 12px',
                fontSize: '14px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: showTodoPanel ? '#dbeafe' : '#f3f4f6',
                color: showTodoPanel ? '#1e40af' : '#374151'
              }}
              onMouseOver={(e) => {
                if (!showTodoPanel) e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = showTodoPanel ? '#dbeafe' : '#f3f4f6';
              }}
            >
              {showTodoPanel ? "Hide" : "Show"} Todos
            </button>
            <button
              onClick={() => setShowEmailPanel(!showEmailPanel)}
              style={{
                padding: '4px 12px',
                fontSize: '14px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: showEmailPanel ? '#dbeafe' : '#f3f4f6',
                color: showEmailPanel ? '#1e40af' : '#374151'
              }}
              onMouseOver={(e) => {
                if (!showEmailPanel) e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = showEmailPanel ? '#dbeafe' : '#f3f4f6';
              }}
            >
              {showEmailPanel ? "Hide" : "Show"} Emails
            </button>
          </div>
        </div>

        {/* Chat Wrapper */}
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            flex: 1,
            position: 'relative',
            maxWidth: '100%',
            maxHeight: '100%'
          }}>
            <ChatWrapper {...chatProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedChatDemo;