import { useState, useMemo, useCallback } from "react";

import {
  ChatWrapper,
  ChatWrapperProps,
  ChatMode,
  ChatPosition,
  ChatTheme,
  EntityType,
  Tools,
} from "@oddle/chat-wrapper-ui";
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

// Showcase App demonstrating ChatWrapper with new required authentication props
// Updated to use: userMpAuthToken, chatServerUrl, chatServerKey, userId (all required)
// Plus optional: entityId, entityType, providerResId for conversation generation
function App() {
  const [customConfig] = useState({
    mode: "sidebar" as ChatMode,
    theme: "light" as ChatTheme,
    position: "left" as ChatPosition,
    appName: "Demo Chat",
    description: "An AI assistant to help with restaurant management tasks.",

    placeholderTexts: [
      "Ask Oddle AI to write email for a promo or menu update…",
      "Ask Oddle AI to turn your ideas into a campaign...",
      "Ask Oddle AI to write engaging subject lines...",
      "Ask Oddle AI to craft newsletter in seconds...",
      "Ask Oddle AI to generate irresistible offers..",
    ],
    headerVisible: false,
    restaurantName: "McDonald's Downtown",
    restaurantLogo:
      "https://lounge.beta.oddle.me/_next/image?url=https%3A%2F%2Fs3-ap-southeast-1.amazonaws.com%2Fv3-beta.image.oddle.me%2Flogo%2Fmenu_logo_Nomnom5a565b.jpg&w=96&q=75",

    suggestedPrompts: [
      {
        title: "New Menu Launch",
        description:
          "Craft a bold campaign announcing a new menu item — make it tempting, visual, and action-driven.",
        icon: <span>📅</span>,
      },
      {
        title: "Re-engage Lapsed Customers",
        description:
          "Craft a punchy restaurant promo email that highlights a special offer and drives bookings fast.",
        icon: <span>🍽️</span>,
      },
      {
        title: "Signature dish spotlight",
        description:
          "Write an irresistible dining promo email that spotlights your signature dish and encourages quick table reservations.",
        icon: <span>⭐</span>,
      },
      {
        title: "Limited-Time Offer Blast",
        description:
          "Create a limited-time restaurant offer email that builds excitement and gets customers to book instantly.",
        icon: <span>⚡</span>,
      },
    ],
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

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          pending: prev.filter((r) => r.status === "pending").length,
          confirmed: prev.filter((r) => r.status === "confirmed").length,
          cancelled: prev.filter((r) => r.status === "cancelled").length,
          no_show: prev.filter((r) => r.status === "no_show").length,
          completed: prev.filter((r) => r.status === "completed").length,
        };

        resolve({
          success: true,
          stats,
          message: `Retrieved statistics for ${stats.total} reservations`,
        });

        return prev;
      });
    });
  }, []);

  // New unified tools with execution functions
  const tools: Tools = useMemo(
    () => [
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
        execute: createTodo,
      },
      {
        name: "read_to_dos",
        description: "Read all existing to-do items",
        parameters: [],
        execute: readTodos,
      },

      // Reservation management tools
      {
        name: "create_reservation",
        description: "Create a new reservation",
        parameters: [
          {
            name: "customerName",
            type: "string",
            description: "Customer's full name",
            isRequired: true,
            schema: { type: "string" },
          },
          {
            name: "email",
            type: "string",
            description: "Customer's email address",
            isRequired: true,
            schema: { type: "string" },
          },
          {
            name: "phone",
            type: "string",
            description: "Customer's phone number",
            isRequired: false,
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
            description: "Number of people",
            isRequired: true,
            schema: { type: "number" },
          },
          {
            name: "specialRequests",
            type: "string",
            description: "Special requests or notes",
            isRequired: false,
            schema: { type: "string" },
          },
        ],
        execute: createReservation,
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
            description: "New reservation time (HH:MM)",
            isRequired: false,
            schema: { type: "string" },
          },
          {
            name: "new_date",
            type: "string",
            description: "New reservation date (YYYY-MM-DD)",
            isRequired: false,
            schema: { type: "string" },
          },
          {
            name: "party_size",
            type: "number",
            description: "Updated party size",
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
        execute: updateReservation,
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
        execute: cancelReservation,
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
        execute: confirmReservation,
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
        execute: markNoShow,
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
        execute: completeReservation,
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
        execute: listReservations,
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
        execute: getAvailability,
      },
      {
        name: "get_reservation_status",
        description: "Get reservation statistics and summary",
        parameters: [],
        execute: getReservationStats,
      },
    ],
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

  const sidebarChatProps: ChatWrapperProps = useMemo(
    () => ({
      // Required authentication and server configuration
      userMpAuthToken: "05cb39b1b8798fef08b28828c947f9431ce0595bfbdada3e008f1c1b7ddba7d95625b1a635c7d66ee40cd809d51a2c699202cd24226c457ad905a587c6a4aab6",
      // chatServerUrl: "http://34.56.173.183",
      chatServerUrl: "https://localhost:3000",
      chatServerKey: "demo-chat-server-key",
      userId: "user_123_16",

      // Optional entity configuration
      entityId: "brand_123",
      entityType: EntityType.BRAND,
      providerResId: "", // Empty to auto-generate based on entityType + entityId

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
      tools: tools,
      contextHelpers: {
        brandInfo: {
          id: "ud21_123",
          brandName: "UD21 Restaurant",
        },
        locale: "en-US",
      },
    }),
    [customConfig, tools]
  );

  const modalChatProps: ChatWrapperProps = useMemo(
    () => ({
      // Required authentication and server configuration
      userMpAuthToken: "demo-mp-auth-token-123",
      chatServerUrl: "wss://localhost:3000",
      chatServerKey: "demo-chat-server-key",
      userId: "user_123_16",

      // Optional entity configuration
      entityId: "brand_123",
      entityType: EntityType.BRAND,
      providerResId: "", // Empty to auto-generate based on entityType + entityId

      config: {
        ...customConfig,
        mode: "modal" as ChatMode,
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
      tools: tools,
      contextHelpers: {
        brandInfo: {
          id: "ud21_123",
          brandName: "UD21 Restaurant",
        },
        locale: "en-US",
      },
    }),
    [customConfig, tools]
  );

  return (
    <div className="showcase-container">
      {/* Toggle button for sidebar */}
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        style={{
          position: "fixed",
          top: "20px",
          left: isSidebarVisible ? "420px" : "20px",
          zIndex: 1000,
          padding: "12px",
          background: "#3d0099",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "left 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        {isSidebarVisible ? "Hide Chat" : "Show Chat"}
      </button>

      {/* Toggle button for modal */}
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "12px",
          background: "#e3c7f8",
          color: "#3d0099",
          border: "2px solid #3d0099",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontWeight: "600",
        }}
      >
        {isModalOpen ? "Close Modal" : "Open Modal"}
      </button>

      <div className="main-content">
        <div
          className="chat-sidebar-container"
          style={{
            display: isSidebarVisible ? "block" : "none",
          }}
        >
          <ChatWrapper {...sidebarChatProps} devMode={true} />
        </div>
        <div
          className="panels-container"
          style={{
            marginLeft: isSidebarVisible ? "420px" : "20px",
            transition: "margin-left 0.3s ease",
          }}
        >
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

      {/* Modal Chat */}
      {isModalOpen && <ChatWrapper {...modalChatProps} devMode={true} />}
    </div>
  );
}

export default App;
