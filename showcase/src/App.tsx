import React, { useState, useMemo, useCallback } from "react";

// import { setupMockAPI } from "./api/mockApi";
import { apiConfig } from "./config/apiConfig";
import {
  ChatWrapper,
  ChatWrapperProps,
  ChatMode,
  ChatPosition,
  ChatTheme,
} from "@oddle/chat-wrapper-ui";
// import { EnhancedBriefPlannerDemo } from "./components/EnhancedBriefPlannerDemo";
// import { ToolsDocumentation } from "./components/ToolsDocumentation";
// import { IntegratedChatDemo } from "./components/IntegratedChatDemo";
// import { UD21Demo } from "./components/UD21Demo";
// import { ReserveDemo } from "./components/ReserveDemo";
// import { ShopDemo } from "./components/ShopDemo";
import { TodoPanel } from "./components/TodoPanel";
import { ReservationPanel } from "./components/ReservationPanel";
import "./components/panels.css";
import "./App.css";

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  status: "pending" | "confirmed" | "cancelled" | "no_show" | "completed";
  specialRequests?: string;
  table?: string;
  created_at: string;
  updated_at?: string;
}

function App() {
  const [customConfig] = useState({
    mode: "fullscreen" as ChatMode,
    theme: "light" as ChatTheme,
    position: "right" as ChatPosition,
    appName: "Demo Chat",
    description: "An AI assistant to help with restaurant management tasks.",

    placeholder: "Ask Oddle AI to turn your ideas into a campaign...",
    headerVisible: false,
    restaurantName: "McDonald's Downtown",
    restaurantLogo:
      "https://lounge.beta.oddle.me/_next/image?url=https%3A%2F%2Fs3-ap-southeast-1.amazonaws.com%2Fv3-beta.image.oddle.me%2Flogo%2Fmenu_logo_Nomnom5a565b.jpg&w=96&q=75",
    
    suggestedPrompts: [
      {
        title: "New Menu Launch",
        description: "Craft a bold campaign announcing a new menu item — make it tempting, visual, and action-driven.",
        icon: <span>📅</span>
      },
      {
        title: "Re-engage Lapsed Customers",
        description: "Craft a punchy restaurant promo email that highlights a special offer and drives bookings fast.",
        icon: <span>🍽️</span>
      },
      {
        title: "Signature dish spotlight",
        description: "Write an irresistible dining promo email that spotlights your signature dish and encourages quick table reservations.",
        icon: <span>⭐</span>
      },
      {
        title: "Limited-Time Offer Blast",
        description: "Create a limited-time restaurant offer email that builds excitement and gets customers to book instantly.",
        icon: <span>⚡</span>
      }
    ]
  });

  const [todos, setTodos] = useState<any[]>([
    {
      id: "1",
      task: "Review reservation system",
      status: "pending",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      task: "Update menu items",
      status: "pending",
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      customerName: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      date: "2025-10-17",
      time: "19:00",
      partySize: 4,
      status: "confirmed",
      specialRequests: "Birthday celebration, need a quiet table",
      table: "12",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      customerName: "Jane Smith",
      email: "jane@example.com",
      date: "2025-10-18",
      time: "20:30",
      partySize: 2,
      status: "pending",
      specialRequests: "Vegetarian options preferred",
      created_at: new Date().toISOString(),
    },
  ]);
  const [count, setCount] = useState(0);

  // Helper functions for panels
  const handleAddTodo = useCallback(async (task: string) => {
    const newTodo = {
      id: Date.now().toString(),
      task,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleCreateReservation = useCallback(async (reservationData: any) => {
    const newReservation: Reservation = {
      id: Date.now().toString(),
      ...reservationData,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setReservations((prev) => [...prev, newReservation]);
  }, []);

  const handleUpdateReservationStatus = useCallback(
    (id: string, status: Reservation["status"]) => {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status, updated_at: new Date().toISOString() }
            : r
        )
      );
    },
    []
  );

  const handleCancelReservation = useCallback((id: string, reason?: string) => {
    console.log(
      "Cancelling reservation:",
      id,
      reason ? `Reason: ${reason}` : ""
    );
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "cancelled" as const,
              updated_at: new Date().toISOString(),
            }
          : r
      )
    );
  }, []);

  // Define client-side tool implementations using useCallback to prevent unnecessary re-renders
  const createTodo = useCallback(
    async (params: { task_description: string }) => {
      console.log("Creating to-do:", params);
      const newTodo = {
        id: Date.now().toString(),
        task: params.task_description,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      setTodos((prev) => [...prev, newTodo]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        success: true,
        task_id: newTodo.id,
        task_description: params.task_description,
        message: `Created to-do: "${params.task_description}"`,
      };
    },
    []
  );

  const readTodos = useCallback(async () => {
    console.log("Reading to-dos");
    return new Promise<any>((resolve) => {
      setTodos((prev) => {
        resolve({
          success: true,
          todos: prev,
          message: `Retrieved ${prev.length} to-do items`,
        });
        return prev;
      });
    });
  }, []);

  const createReservation = useCallback(async (params: any) => {
    console.log("Creating reservation:", params);
    const newReservation: Reservation = {
      id: Date.now().toString(),
      customerName: params.customerName,
      email: params.email,
      phone: params.phone,
      date: params.date,
      time: params.time,
      partySize: params.partySize,
      status: "confirmed",
      specialRequests: params.specialRequests,
      created_at: new Date().toISOString(),
    };
    setReservations((prev) => [...prev, newReservation]);
    return {
      success: true,
      reservation: newReservation,
      message: `Created reservation for ${params.customerName} on ${params.date} at ${params.time}`,
    };
  }, []);

  const updateReservation = useCallback(async (params: any) => {
    console.log("Updating reservation:", params);
    setReservations((prev) => {
      const reservation = prev.find((r) => r.id === params.reservation_id);
      if (!reservation) {
        return prev;
      }

      const updates: Partial<Reservation> = {
        updated_at: new Date().toISOString(),
      };

      if (params.new_time) updates.time = params.new_time;
      if (params.new_date) updates.date = params.new_date;
      if (params.party_size !== undefined)
        updates.partySize = params.party_size;
      if (params.special_requests !== undefined)
        updates.specialRequests = params.special_requests;

      const updatedReservation = { ...reservation, ...updates };
      return prev.map((r) =>
        r.id === params.reservation_id ? updatedReservation : r
      );
    });

    return {
      success: true,
      message: `Updated reservation`,
    };
  }, []);

  const cancelReservation = useCallback(
    async (params: { id: string; reason?: string }) => {
      console.log("Cancelling reservation:", params);
      let customerName = "";

      setReservations((prev) => {
        const reservation = prev.find((r) => r.id === params.id);
        if (!reservation) {
          return prev;
        }

        customerName = reservation.customerName;
        const updatedReservation = {
          ...reservation,
          status: "cancelled" as const,
          updated_at: new Date().toISOString(),
        };

        return prev.map((r) => (r.id === params.id ? updatedReservation : r));
      });

      return {
        success: true,
        message: `Cancelled reservation for ${customerName}${
          params.reason ? `: ${params.reason}` : ""
        }`,
      };
    },
    []
  );

  const confirmReservation = useCallback(
    async (params: { id: string; table?: string }) => {
      console.log("Confirming reservation:", params);
      let customerName = "";

      setReservations((prev) => {
        const reservation = prev.find((r) => r.id === params.id);
        if (!reservation) {
          return prev;
        }

        customerName = reservation.customerName;
        const updatedReservation = {
          ...reservation,
          status: "confirmed" as const,
          table: params.table,
          updated_at: new Date().toISOString(),
        };

        return prev.map((r) => (r.id === params.id ? updatedReservation : r));
      });

      return {
        success: true,
        message: `Confirmed reservation for ${customerName}${
          params.table ? ` at table ${params.table}` : ""
        }`,
      };
    },
    []
  );

  const markNoShow = useCallback(async (params: { id: string }) => {
    console.log("Marking reservation as no-show:", params.id);
    let customerName = "";

    setReservations((prev) => {
      const reservation = prev.find((r) => r.id === params.id);
      if (!reservation) {
        return prev;
      }

      customerName = reservation.customerName;
      const updatedReservation = {
        ...reservation,
        status: "no_show" as const,
        updated_at: new Date().toISOString(),
      };

      return prev.map((r) => (r.id === params.id ? updatedReservation : r));
    });

    return {
      success: true,
      message: `Marked ${customerName} as no-show`,
    };
  }, []);

  const completeReservation = useCallback(async (params: { id: string }) => {
    console.log("Completing reservation:", params.id);
    let customerName = "";

    setReservations((prev) => {
      const reservation = prev.find((r) => r.id === params.id);
      if (!reservation) {
        return prev;
      }

      customerName = reservation.customerName;
      const updatedReservation = {
        ...reservation,
        status: "completed" as const,
        updated_at: new Date().toISOString(),
      };

      return prev.map((r) => (r.id === params.id ? updatedReservation : r));
    });

    return {
      success: true,
      message: `Completed reservation for ${customerName}`,
    };
  }, []);

  const listReservations = useCallback(
    async (params?: { status?: Reservation["status"]; date?: string }) => {
      console.log("Listing reservations:", params);
      return new Promise<any>((resolve) => {
        setReservations((prev) => {
          let filteredReservations = prev;

          if (params?.status) {
            filteredReservations = filteredReservations.filter(
              (r) => r.status === params.status
            );
          }

          if (params?.date) {
            filteredReservations = filteredReservations.filter(
              (r) => r.date === params.date
            );
          }

          resolve({
            success: true,
            reservations: filteredReservations,
            total: filteredReservations.length,
            message: `Found ${filteredReservations.length} reservation${
              filteredReservations.length !== 1 ? "s" : ""
            }`,
          });

          return prev;
        });
      });
    },
    []
  );

  const getAvailability = useCallback(
    async (params: { date: string; time?: string }) => {
      console.log("Checking availability:", params);
      return new Promise<any>((resolve) => {
        setReservations((prev) => {
          const dayReservations = prev.filter(
            (r) => r.date === params.date && r.status !== "cancelled"
          );
          const totalTables = 20; // Mock restaurant capacity
          const bookedTables = dayReservations.length;
          const availableTables = totalTables - bookedTables;

          resolve({
            success: true,
            date: params.date,
            time: params.time || "all day",
            availableTables,
            totalTables,
            bookedTables,
            availability: availableTables > 0 ? "available" : "fully_booked",
            message: `${availableTables} tables available on ${params.date}${
              params.time ? ` at ${params.time}` : ""
            }`,
          });

          return prev;
        });
      });
    },
    []
  );

  const getReservationStats = useCallback(async () => {
    console.log("Getting reservation statistics");
    return new Promise<any>((resolve) => {
      setReservations((prev) => {
        const stats = {
          total: prev.length,
          confirmed: prev.filter((r) => r.status === "confirmed").length,
          pending: prev.filter((r) => r.status === "pending").length,
          cancelled: prev.filter((r) => r.status === "cancelled").length,
          completed: prev.filter((r) => r.status === "completed").length,
          no_shows: prev.filter((r) => r.status === "no_show").length,
        };

        resolve({
          success: true,
          stats,
          message: `Reservation stats: ${stats.total} total, ${stats.confirmed} confirmed, ${stats.pending} pending`,
        });

        return prev;
      });
    });
  }, []);

  const clientTools = useMemo(
    () => ({
      create_to_do: createTodo,
      read_to_dos: readTodos,
      create_reservation: createReservation,
      update_reservation: updateReservation,
      cancel_reservation: cancelReservation,
      confirm_reservation: confirmReservation,
      mark_no_show: markNoShow,
      complete_reservation: completeReservation,
      list_reservations: listReservations,
      get_availability: getAvailability,
      get_reservation_stats: getReservationStats,
    }),
    [
      createTodo,
      readTodos,
      createReservation,
      updateReservation,
      cancelReservation,
      confirmReservation,
      markNoShow,
      completeReservation,
      listReservations,
      getAvailability,
      getReservationStats,
    ]
  );

  const chatProps: ChatWrapperProps = useMemo(
    () => ({
      apiUrl: "http://localhost:3000",
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
      tools: clientTools,
      clientTools: [
        // To-do management tools
        {
          name: "create_to_do",
          description: "Create a new to-do task",
          parameters: [
            {
              name: "task_description",
              type: "string",
              description: "Description of the task to be created",
              isRequired: true,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "read_to_dos",
          description: "Read all existing to-do items",
          parameters: [],
        },

        // Reservation management tools
        {
          name: "create_reservation",
          description: "Create a new restaurant reservation",
          parameters: [
            {
              name: "customerName",
              type: "string",
              description: "Name of the customer",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "email",
              type: "string",
              description: "Customer email address",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "date",
              type: "string",
              description: "Reservation date (YYYY-MM-DD)",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "time",
              type: "string",
              description: "Reservation time (HH:MM)",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "partySize",
              type: "number",
              description: "Number of guests",
              isRequired: true,
              schema: { type: "number" },
            },
            {
              name: "phone",
              type: "string",
              description: "Customer phone number",
              isRequired: false,
              schema: { type: "string" },
            },
            {
              name: "specialRequests",
              type: "string",
              description: "Special requests or dietary restrictions",
              isRequired: false,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "update_reservation",
          description: "Update an existing reservation",
          parameters: [
            {
              name: "reservation_id",
              type: "string",
              description: "ID of the reservation to update",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "new_time",
              type: "string",
              description: "New time for the reservation",
              isRequired: false,
              schema: { type: "string" },
            },
            {
              name: "new_date",
              type: "string",
              description: "New date for the reservation",
              isRequired: false,
              schema: { type: "string" },
            },
            {
              name: "party_size",
              type: "number",
              description: "New party size",
              isRequired: false,
              schema: { type: "number" },
            },
            {
              name: "special_requests",
              type: "string",
              description: "Updated special requests",
              isRequired: false,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "cancel_reservation",
          description: "Cancel a reservation",
          parameters: [
            {
              name: "id",
              type: "string",
              description: "ID of the reservation to cancel",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "reason",
              type: "string",
              description: "Reason for cancellation",
              isRequired: false,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "confirm_reservation",
          description: "Confirm a reservation",
          parameters: [
            {
              name: "id",
              type: "string",
              description: "ID of the reservation to confirm",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "table",
              type: "string",
              description: "Table number to assign",
              isRequired: false,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "mark_no_show",
          description: "Mark a reservation as no-show",
          parameters: [
            {
              name: "id",
              type: "string",
              description: "ID of the reservation to mark as no-show",
              isRequired: true,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "complete_reservation",
          description: "Mark a reservation as completed",
          parameters: [
            {
              name: "id",
              type: "string",
              description: "ID of the reservation to complete",
              isRequired: true,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "list_reservations",
          description: "List reservations with optional filters",
          parameters: [
            {
              name: "status",
              type: "string",
              description: "Filter by reservation status",
              isRequired: false,
              schema: {
                type: "string",
                enum: [
                  "pending",
                  "confirmed",
                  "cancelled",
                  "no_show",
                  "completed",
                ],
              },
            },
            {
              name: "date",
              type: "string",
              description: "Filter by date (YYYY-MM-DD)",
              isRequired: false,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "get_availability",
          description: "Check table availability for a date and time",
          parameters: [
            {
              name: "date",
              type: "string",
              description: "Date to check (YYYY-MM-DD)",
              isRequired: true,
              schema: { type: "string" },
            },
            {
              name: "time",
              type: "string",
              description: "Time to check (HH:MM)",
              isRequired: false,
              schema: { type: "string" },
            },
          ],
        },
        {
          name: "get_reservation_stats",
          description: "Get reservation statistics and summary",
          parameters: [],
        },
      ],
    }),
    [customConfig, clientTools]
  );

  return (
    <div className="showcase-container">
      <div className="main-content">
        <ChatWrapper {...chatProps} />

        <div className="controls">
          <button
            onClick={() => {
              setCount((prev) => prev + 1);
            }}
          >
            changes {count}
          </button>
        </div>

        <div className="panels-container">
          <TodoPanel
            todos={todos}
            onAddTodo={handleAddTodo}
            onDeleteTodo={handleDeleteTodo}
          />
          <ReservationPanel
            reservations={reservations}
            onCreateReservation={handleCreateReservation}
            onUpdateStatus={handleUpdateReservationStatus}
            onCancelReservation={handleCancelReservation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
