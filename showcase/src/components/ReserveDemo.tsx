"use client";

import { useState } from "react";
import { ChatWrapper, ChatWrapperProps } from "@oddle/chat-wrapper-ui";
import { apiConfig } from "../config/apiConfig";

// Types for reservation system
interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no_show";
  specialRequests?: string;
  table?: string;
  created_at: string;
  updated_at?: string;
}

// ReservationPanel Component
const ReservationPanel = ({
  reservations,
  onCreateReservation,
  onUpdateReservation,
  onDeleteReservation,
  isLoading,
}: {
  reservations: Reservation[];
  onCreateReservation: (reservation: Omit<Reservation, "id" | "created_at">) => void;
  onUpdateReservation: (id: string, updates: Partial<Reservation>) => void;
  onDeleteReservation: (id: string) => void;
  isLoading: boolean;
}) => {
  const [newReservation, setNewReservation] = useState({
    customerName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: 2,
    specialRequests: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReservation.customerName.trim() || !newReservation.email.trim() || !newReservation.date || !newReservation.time) return;
    
    onCreateReservation({
      customerName: newReservation.customerName.trim(),
      email: newReservation.email.trim(),
      phone: newReservation.phone.trim() || undefined,
      date: newReservation.date,
      time: newReservation.time,
      partySize: newReservation.partySize,
      status: "confirmed",
      specialRequests: newReservation.specialRequests.trim() || undefined,
    });
    
    setNewReservation({
      customerName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      partySize: 2,
      specialRequests: "",
    });
    setShowForm(false);
  };

  return (
    <div style={{
      width: '400px',
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
          }}>Reservations</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '4px 12px',
              fontSize: '14px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
            disabled={isLoading}
          >
            {showForm ? "Cancel" : "New Reservation"}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="text"
              value={newReservation.customerName}
              onChange={(e) => setNewReservation({ ...newReservation, customerName: e.target.value })}
              placeholder="Customer Name"
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
              value={newReservation.email}
              onChange={(e) => setNewReservation({ ...newReservation, email: e.target.value })}
              placeholder="Email"
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
              type="tel"
              value={newReservation.phone}
              onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })}
              placeholder="Phone (optional)"
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
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="date"
                value={newReservation.date}
                onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                style={{
                  flex: 1,
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
                type="time"
                value={newReservation.time}
                onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                disabled={isLoading}
              />
            </div>
            <input
              type="number"
              min="1"
              max="20"
              value={newReservation.partySize}
              onChange={(e) => setNewReservation({ ...newReservation, partySize: parseInt(e.target.value) || 1 })}
              placeholder="Party Size"
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
              value={newReservation.specialRequests}
              onChange={(e) => setNewReservation({ ...newReservation, specialRequests: e.target.value })}
              placeholder="Special requests (optional)"
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
              disabled={isLoading || !newReservation.customerName.trim() || !newReservation.email.trim() || !newReservation.date || !newReservation.time}
            >
              Create Reservation
            </button>
          </form>
        )}
      </div>

      {/* Reservation List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {reservations.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '32px 0'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>No reservations yet</p>
            <p style={{ fontSize: '14px', margin: 0 }}>Create one or ask the AI to help!</p>
          </div>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
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
              {/* Reservation Header */}
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
                    margin: 0
                  }}>
                    {reservation.customerName}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '4px 0 0 0'
                  }}>
                    {reservation.email}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteReservation(reservation.id)}
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

              {/* Reservation Details */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '13px',
                color: '#4b5563'
              }}>
                <span>📅 {new Date(reservation.date).toLocaleDateString()}</span>
                <span>🕐 {reservation.time}</span>
                <span>👥 {reservation.partySize}</span>
              </div>

              {/* Special Requests */}
              {reservation.specialRequests && (
                <p style={{
                  color: '#4b5563',
                  fontSize: '13px',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  "{reservation.specialRequests}"
                </p>
              )}

              {/* Status and Table */}
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
                  backgroundColor: reservation.status === 'confirmed' ? '#dcfce7' : 
                                 reservation.status === 'completed' ? '#dbeafe' : 
                                 reservation.status === 'cancelled' ? '#fecaca' : 
                                 reservation.status === 'no_show' ? '#fed7d7' : '#fef3c7',
                  color: reservation.status === 'confirmed' ? '#166534' : 
                         reservation.status === 'completed' ? '#1e40af' : 
                         reservation.status === 'cancelled' ? '#991b1b' : 
                         reservation.status === 'no_show' ? '#922b21' : '#92400e',
                  borderColor: reservation.status === 'confirmed' ? '#bbf7d0' : 
                              reservation.status === 'completed' ? '#bfdbfe' : 
                              reservation.status === 'cancelled' ? '#fca5a5' : 
                              reservation.status === 'no_show' ? '#f3a8a8' : '#fde68a'
                }}>
                  {reservation.status.replace('_', ' ')}
                </span>
                {reservation.table && (
                  <span style={{
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Table {reservation.table}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              {reservation.status === "pending" && (
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  <button
                    onClick={() => onUpdateReservation(reservation.id, { status: "confirmed" })}
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
                    Confirm
                  </button>
                  <button
                    onClick={() => onUpdateReservation(reservation.id, { status: "cancelled" })}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: '#fecaca',
                      color: '#991b1b',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fca5a5'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Created Date */}
              <div style={{
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                Created: {new Date(reservation.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Reserve Demo Component
export const ReserveDemo = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showReservationPanel, setShowReservationPanel] = useState(true);

  // Reservation management functions
  const handleCreateReservation = (reservation: Omit<Reservation, "id" | "created_at">) => {
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setReservations((prev) => [...prev, newReservation]);
  };

  const handleUpdateReservation = (id: string, updates: Partial<Reservation>) => {
    setReservations((prev) =>
      prev.map((reservation) => 
        reservation.id === id 
          ? { ...reservation, ...updates, updated_at: new Date().toISOString() }
          : reservation
      )
    );
  };

  const handleDeleteReservation = (id: string) => {
    setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
  };

  // Chat wrapper props with integrated tools
  const chatProps: ChatWrapperProps = {
    apiUrl: apiConfig.baseUrl + '/api/reserve-agent', // Using conversation endpoint
    config: {
      mode: "embedded",
      appName: "Restaurant Reservations",
      theme: "light",
      placeholder: "Manage reservations or ask for help...",
      promptPath: "subagents/reserveAgent",
      constrainedHeight: true, // Fill parent container completely
      onMessage: (message) => {
        console.log("Message received:", message);
      },
      onError: (error) => {
        console.error("Chat error:", error);
      },
      onToolResult: (tool, result) => {
        console.log("Tool result:", tool, result);
        if (tool === "reservations" && Array.isArray(result)) {
          setReservations(result);
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
      // To-do management tools for reserveAgent
      create_to_do: (task_description: string) => {
        console.log("Creating to-do:", { task_description });
        return { 
          success: true, 
          task_id: Date.now().toString(),
          task_description,
          message: `Created to-do: "${task_description}"` 
        };
      },
      
      read_to_dos: () => {
        console.log("Reading to-dos");
        // Mock to-dos for demonstration
        const mockTodos = [
          { id: "1", task: "Confirm party size for tonight's reservation", status: "pending" },
          { id: "2", task: "Call customer about dietary restrictions", status: "completed" }
        ];
        return { 
          success: true, 
          todos: mockTodos,
          message: `Retrieved ${mockTodos.length} to-do items` 
        };
      },

      // Reservation management tools
      create_reservation: (customerName: string, email: string, date: string, time: string, partySize: number, phone?: string, specialRequests?: string) => {
        console.log("Creating reservation:", { customerName, email, date, time, partySize, phone, specialRequests });
        const newReservation: Reservation = {
          id: Date.now().toString(),
          customerName,
          email,
          phone,
          date,
          time,
          partySize,
          status: "confirmed",
          specialRequests,
          created_at: new Date().toISOString(),
        };
        setReservations((prev) => [...prev, newReservation]);
        return { 
          success: true, 
          reservation: newReservation,
          message: `Created reservation for ${customerName} on ${date} at ${time}` 
        };
      },
      
      update_reservation: (reservation_id: string, new_time?: string, new_date?: string, party_size?: number, special_requests?: string) => {
        console.log("Updating reservation:", { reservation_id, new_time, new_date, party_size, special_requests });
        const reservation = reservations.find(r => r.id === reservation_id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }
        
        const updates: Partial<Reservation> = {
          updated_at: new Date().toISOString()
        };
        
        if (new_time) updates.time = new_time;
        if (new_date) updates.date = new_date;
        if (party_size !== undefined) updates.partySize = party_size;
        if (special_requests !== undefined) updates.specialRequests = special_requests;
        
        const updatedReservation = { ...reservation, ...updates };
        setReservations((prev) => prev.map(r => r.id === reservation_id ? updatedReservation : r));
        return { 
          success: true, 
          reservation: updatedReservation,
          message: `Updated reservation for ${reservation.customerName}` 
        };
      },
      
      cancel_reservation: (id: string, reason?: string) => {
        console.log("Cancelling reservation:", { id, reason });
        const reservation = reservations.find(r => r.id === id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }
        
        const updatedReservation = { 
          ...reservation, 
          status: "cancelled" as const, 
          updated_at: new Date().toISOString() 
        };
        setReservations((prev) => prev.map(r => r.id === id ? updatedReservation : r));
        return { 
          success: true, 
          reservation: updatedReservation,
          message: `Cancelled reservation for ${reservation.customerName}${reason ? `: ${reason}` : ''}` 
        };
      },
      
      confirm_reservation: (id: string, table?: string) => {
        console.log("Confirming reservation:", { id, table });
        const reservation = reservations.find(r => r.id === id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }
        
        const updatedReservation = { 
          ...reservation, 
          status: "confirmed" as const,
          table,
          updated_at: new Date().toISOString() 
        };
        setReservations((prev) => prev.map(r => r.id === id ? updatedReservation : r));
        return { 
          success: true, 
          reservation: updatedReservation,
          message: `Confirmed reservation for ${reservation.customerName}${table ? ` at table ${table}` : ''}` 
        };
      },
      
      mark_no_show: (id: string) => {
        console.log("Marking reservation as no-show:", id);
        const reservation = reservations.find(r => r.id === id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }
        
        const updatedReservation = { 
          ...reservation, 
          status: "no_show" as const,
          updated_at: new Date().toISOString() 
        };
        setReservations((prev) => prev.map(r => r.id === id ? updatedReservation : r));
        return { 
          success: true, 
          reservation: updatedReservation,
          message: `Marked ${reservation.customerName} as no-show` 
        };
      },
      
      complete_reservation: (id: string) => {
        console.log("Completing reservation:", id);
        const reservation = reservations.find(r => r.id === id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }
        
        const updatedReservation = { 
          ...reservation, 
          status: "completed" as const,
          updated_at: new Date().toISOString() 
        };
        setReservations((prev) => prev.map(r => r.id === id ? updatedReservation : r));
        return { 
          success: true, 
          reservation: updatedReservation,
          message: `Completed reservation for ${reservation.customerName}` 
        };
      },
      
      list_reservations: (status?: Reservation["status"], date?: string) => {
        console.log("Listing reservations:", { status, date });
        let filteredReservations = reservations;
        
        if (status) {
          filteredReservations = filteredReservations.filter(r => r.status === status);
        }
        
        if (date) {
          filteredReservations = filteredReservations.filter(r => r.date === date);
        }
        
        return { 
          success: true, 
          reservations: filteredReservations,
          total: filteredReservations.length,
          message: `Found ${filteredReservations.length} reservation${filteredReservations.length !== 1 ? 's' : ''}` 
        };
      },
      
      get_availability: (date: string, time?: string) => {
        console.log("Checking availability:", { date, time });
        const dayReservations = reservations.filter(r => r.date === date && r.status !== 'cancelled');
        const totalTables = 20; // Mock restaurant capacity
        const bookedTables = dayReservations.length;
        const availableTables = totalTables - bookedTables;
        
        return {
          success: true,
          date,
          time: time || "all day",
          availableTables,
          totalTables,
          bookedTables,
          availability: availableTables > 0 ? "available" : "fully_booked",
          message: `${availableTables} tables available on ${date}${time ? ` at ${time}` : ''}`
        };
      },

      // Restaurant specific tools
      get_reservation_stats: () => {
        console.log("Getting reservation statistics");
        const stats = {
          total: reservations.length,
          confirmed: reservations.filter(r => r.status === "confirmed").length,
          pending: reservations.filter(r => r.status === "pending").length,
          cancelled: reservations.filter(r => r.status === "cancelled").length,
          completed: reservations.filter(r => r.status === "completed").length,
          no_shows: reservations.filter(r => r.status === "no_show").length,
        };
        
        return {
          success: true,
          stats,
          message: `Reservation stats: ${stats.total} total, ${stats.confirmed} confirmed, ${stats.pending} pending`
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
      backgroundColor: '#fef2f2',
      position: 'relative',
      isolation: 'isolate'
    }}>
      {/* Left Side Reservation Panel */}
      {showReservationPanel && (
        <ReservationPanel
          reservations={reservations}
          onCreateReservation={handleCreateReservation}
          onUpdateReservation={handleUpdateReservation}
          onDeleteReservation={handleDeleteReservation}
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
            }}>Restaurant Reservations</h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>Manage table bookings and customer reservations</p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <button
              onClick={() => setShowReservationPanel(!showReservationPanel)}
              style={{
                padding: '4px 12px',
                fontSize: '14px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: showReservationPanel ? '#fee2e2' : '#f3f4f6',
                color: showReservationPanel ? '#991b1b' : '#374151'
              }}
              onMouseOver={(e) => {
                if (!showReservationPanel) e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = showReservationPanel ? '#fee2e2' : '#f3f4f6';
              }}
            >
              {showReservationPanel ? "Hide" : "Show"} Reservations
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

export default ReserveDemo;