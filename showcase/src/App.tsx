import { useState, useMemo, useCallback, useRef, useEffect } from "react";

import {
  ChatWrapper,
  ChatWrapperProps,
  ChatWrapperRef,
  ChatMode,
  ChatPosition,
  ChatTheme,
  EntityType,
  Tools,
  useUIStore,
} from "@oddle/chat-wrapper-ui";
import { TodoPanel } from "./components/TodoPanel";
import { ReservationPanel } from "./components/ReservationPanel";
import { ThreadAttachmentModal } from "./components/ThreadAttachmentModal";
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

interface MarketingToolsFunctions {
  createCampaign: (
    params: CreateCampaignParams
  ) => Promise<CreateCampaignResponse>;
  getBrandItems: () => Promise<unknown>;
  searchMediaLibrary: (params: {
    queries: string;
    maxResults: number;
  }) => Promise<unknown>;
  getReservationTickets: () => Promise<unknown>;
  getPromos: () => Promise<unknown>;
  getRedeemables: () => Promise<unknown>;
}

export interface CreateCampaignParams {
  emailType: "broadcast";
  campaignJson: {
    campaignName: string;
    campaignDesc: string;
    reminder: boolean;
    scheduling: {
      date?: string;
      time?: string;
      option: "now" | "scheduled";
    };
  };
  emailJson: {
    subject: string;
    preHeader: string;
    reminderSubject?: string;
    reminderPreHeader?: string;
    content: Array<{
      type: string;
      props: Record<string, unknown>;
    }>;
  };
}

export interface CreateCampaignResponse {
  success: boolean;
  campaignJson: CreateCampaignParams["campaignJson"];
  emailJson: CreateCampaignParams["emailJson"];
}

async function fetchTodos() {
  // Mock async function to fetch todos with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
    }, 800); // 800ms delay
  });
}

async function fetchMenuItems() {
  try {
    const response = await fetch(
      `https://oddlemenumanagement.beta.oddleapp.com/api/v1/menus/370513651653558296?all-versions=true`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-oddle-mp-auth-token":
            "46370126a336e40d73c73e5c83e5b19cfbbe53fa8324aa1220e4a7afd6c7b86883e2436e9ce2288a0b1d2c11efcf3c9ccc49ccda3e89f79ee81410061b77cb1e",
          "x-oddle-chat-server-key": "mock-api-key",
        },
      }
    );
    const res = await response.json();
    return {
      success: true,
      items: res.data,
      message: `Retrieved ${res.data.length} menu items for brand 8a818ca9776ae07301776c71205c0ba8`,
    };
  } catch (error) {
    return { success: false, message: "Failed to retrieve menu items" };
  }
}

// Showcase App demonstrating ChatWrapper with new required authentication props
// Updated to use: userMpAuthToken, chatServerUrl, chatServerKey (all required)
// Plus optional: entityId, entityType, providerResId for conversation generation
function App() {
  const [customConfig] = useState({
    mode: "sidebar" as ChatMode,
    theme: "light" as ChatTheme,
    position: "left" as ChatPosition,
    headerName: "Create Emails in Seconds",
    headerDescription:
      "Describe your idea in chat. Go from conversation to a launched campaign instantly",

    placeholderTexts: [
      "Ask Oddle AI to write email for a promo or menu update…",
      "Ask Oddle AI to turn your ideas into a campaign...",
      "Ask Oddle AI to write engaging subject lines...",
      "Ask Oddle AI to craft newsletter in seconds...",
      "Ask Oddle AI to generate irresistible offers..",
    ],
    headerVisible: false,
    chipName: "McDonald's",
    chipLogo:
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
    footer: (
      <div
        style={{
          textAlign: "center",
          padding: "16px",
          fontSize: "14px",
          color: "#637381",
        }}
      >
        <p style={{ margin: "0 0 8px 0" }}>🤖 Powered by Oddle AI</p>
        <p style={{ margin: "0", fontSize: "12px" }}>
          Need help? Contact{" "}
          <a href="mailto:support@oddle.me" style={{ color: "#6f767b" }}>
            support@oddle.me
          </a>
        </p>
      </div>
    ),
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
  const [isThreadModalOpen, setIsThreadModalOpen] = useState(false);

  // State for dynamic metadata (for testing metadata prop sync)
  // Start with empty to test the "metadata starts empty then gets populated" scenario
  const [dynamicMetadata, setDynamicMetadata] = useState<any>();

  // State for dynamic contextHelpers (for testing contextHelpers prop sync)
  // Start with minimal context, then add brandInfo after 10 seconds
  const [contextHelpers, setContextHelpers] = useState<any>({
    locale: "en-US",
  });

  // Ref to ChatWrapper for imperative API access
  const chatWrapperRef = useRef<ChatWrapperRef>(null);

  // Get providerResId from the store
  const providerResId = useUIStore((state) => state.providerResId);

  // Effect to simulate brandInfo being attached after 10 seconds
  useEffect(() => {
    console.log("⏱️ Starting 10-second timer to attach brandInfo...");
    const timer = setTimeout(() => {
      console.log(
        "✅ 10 seconds elapsed - attaching brandInfo to contextHelpers"
      );
      setContextHelpers({
        brandInfo: {
          id: "ud21_123",
          brandName: "UD21 Restaurant",
        },
        locale: "en-US",
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Handler for thread attachment - now updates metadata prop to test auto-sync
  const handleThreadAttachment = useCallback(
    async (data: {
      entityId?: string;
      entityType?: EntityType;
      tag?: string;
      metadata?: any;
    }) => {
      if (!providerResId) {
        throw new Error("No active conversation to attach");
      }

      const { entityId, tag, metadata } = data;

      // Entity update functionality removed - use metadata for business context instead
      // if (entityId && entityType && chatWrapperRef.current) {
      //   chatWrapperRef.current.updateEntityId(entityId, entityType);
      // }

      // Update metadata via prop state (this will trigger automatic API sync!)
      if (metadata) {
        console.log(
          "[App] Updating metadata prop to test auto-sync:",
          metadata
        );
        setDynamicMetadata((prev: any) => ({
          ...prev,
          ...metadata,
          updated_at: new Date().toISOString(),
          update_source: "thread_attachment",
        }));
      }

      // Handle tag separately using imperative API (for now)
      if (tag && chatWrapperRef.current) {
        chatWrapperRef.current.updateMetadata({
          tag: tag,
        });
      }

      if (!entityId && !tag && !metadata) {
        throw new Error("Please provide at least one field to update");
      }
    },
    [providerResId]
  );

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
    const todosList = await fetchTodos();
    setTodos(todosList as any[]);
    return {
      success: true,
      todos: todosList as any[],
      message: `Retrieved ${(todosList as any[]).length} to-do items`,
    };
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

  const getBrandItems = useCallback(async () => {
    const items = await fetchMenuItems();
    console.log("items");
    return items;
  }, []);

  // Marketing tools implementation functions
  const createCampaign = useCallback(async (params: CreateCampaignParams) => {
    console.log("Creating campaign:", params);
    // Mock campaign creation
    return {
      success: true,
      campaignJson: params.campaignJson,
      emailJson: params.emailJson,
    };
  }, []);

  const searchMediaLibrary = useCallback(
    async (params: { queries: string; maxResults: number }) => {
      console.log("Searching media library:", params);
      // Mock media search
      return {
        success: true,
        results: [
          {
            id: "1",
            url: "https://example.com/image1.jpg",
            title: "Sample Image 1",
            tags: params.queries.split(",").map((q) => q.trim()),
          },
          {
            id: "2",
            url: "https://example.com/image2.jpg",
            title: "Sample Image 2",
            tags: params.queries.split(",").map((q) => q.trim()),
          },
        ],
        total: 2,
        message: `Found 2 media items for queries: ${params.queries}`,
      };
    },
    []
  );

  const getReservationTickets = useCallback(async () => {
    console.log("Getting reservation tickets");
    // Mock reservation tickets
    return {
      success: true,
      tickets: [
        {
          id: "1",
          name: "Dinner Reservation",
          url: "https://booking.restaurant.com/dinner",
          type: "dinner",
        },
        {
          id: "2",
          name: "Lunch Reservation",
          url: "https://booking.restaurant.com/lunch",
          type: "lunch",
        },
      ],
      message: "Retrieved reservation ticket types",
    };
  }, []);

  const getPromos = useCallback(async () => {
    console.log("Getting promotions");
    // Mock promotions data
    return {
      success: true,
      promos: [
        {
          id: "8a818cef6715600c016715a47b1039ba",
          accessKey: null,
          version: null,
          enablePromoCode: false,
          promoCodes: null,
          promoApplyTo: 2,
          customerUseTimes: 0,
          promoCodeLimit: 0,
          cardIdentifier: null,
          availableOn: 0,
          startDate: "",
          endDate: "",
          orderStartDate: "",
          orderEndDate: "",
          startTime: "",
          endTime: "",
          availableDays: "Mon,Tue,Wed,Thu,Fri,",
          applyToPlatform: 2,
          applyToDeliveryPickup: 2,
          isCustomiseStartEndTime: false,
          isCustomiseAvailableDay: false,
          isCustomiseOrderStartEndDate: false,
          isCustomiseStartEndDate: false,
          isShowOnShoppingCart: true,
          stackableOption: 1,
          excludePromos: "",
          promotionResultType: 2,
          promotionConditionType: 3,
          promoOrder: 0,
          description: "10% off total order",
          name: "10% off total order",
          conditionAmount: null,
          conditionAmountType: 1,
          conditionQuantity: null,
          conditionItemIds: "",
          conditionCategoryIds: "",
          resultAmount: 10,
          resultAmountType: 0,
          resultItemIds: "",
          resultCategoryIds: "",
          resultQuantity: null,
          campaignId: null,
          menuId: "2c9f8adc663cc6c201663dd253da5c35",
          imageName: null,
          imageUrl: "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/2c9f8adc663cc6c201663dd253da5c35/promotion/null.jpg",
          enableCampaignPromoCode: false,
        },
      ],
      message: "Retrieved 1 promos",
    };
  }, []);

  const getRedeemables = useCallback(async () => {
    console.log("Getting redeemables");
    // Mock redeemables data
    return {
      success: true,
      redeemables: [
        {
          id: "redeem_1",
          name: "Free Burger Voucher",
          description: "Redeem a free classic burger with any order",
          points_required: 500,
          valid_from: "2025-12-01",
          valid_until: "2025-12-31",
          applicable_to: ["delivery", "takeaway"],
          stock_available: 100,
          status: "active",
        },
        {
          id: "redeem_2",
          name: "$10 Off Voucher",
          description: "Get $10 off on orders above $50",
          points_required: 1000,
          valid_from: "2025-12-01",
          valid_until: "2025-12-31",
          applicable_to: ["delivery", "takeaway"],
          stock_available: 50,
          status: "active",
        },
        {
          id: "redeem_3",
          name: "Free Dessert",
          description: "Redeem any dessert item for free",
          points_required: 300,
          valid_from: "2025-12-01",
          valid_until: "2025-12-31",
          applicable_to: ["delivery", "takeaway"],
          stock_available: 200,
          status: "active",
        },
      ],
      total: 3,
      message: "Retrieved 3 active redeemables",
    };
  }, []);

  // Marketing tools factory
  const MARKETING_TOOLS: (functions: MarketingToolsFunctions) => Tools = (
    fn
  ) => [
    // media_library
    {
      name: "search_media_library",
      description:
        "Search a merchant's media library for media based on queries",
      parameters: [
        {
          name: "queries",
          type: "string",
          description: "Comma separated keywords to search for",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "maxResults",
          type: "number",
          description: "Maximum number of results to return",
          isRequired: true,
          schema: { type: "integer" },
        },
      ],
      execute: fn.searchMediaLibrary,
    },
    // reservation
    {
      name: "get_reservation_tickets",
      description:
        "Read all reservation related tickets / booking types and their links from a brand.",
      parameters: [],
      execute: fn.getReservationTickets,
    },
    {
      name: "get_promos",
      description:
        "Retrieves all promotions available for use for the brand's online shop for delivery or takeaway",
      parameters: [],
      execute: fn.getPromos,
    },
    {
      name: "get_redeemables",
      description:
        "Retrieves all redeemables available for use for the brand's online shop for delivery or takeaway",
      parameters: [],
      execute: fn.getRedeemables,
    },
    {
      name: "get_brand_items",
      description: "Get a list of full items in the brand",
      parameters: [],
      execute: fn.getBrandItems,
    },
    {
      name: "create_campaign",
      description:
        "Creates an email marketing campaign in Oddle's email marketing module.",
      parameters: [
        {
          name: "emailType",
          type: "string",
          description: 'Only "broadcast" is supported at this moment.',
          isRequired: true,
          schema: {
            type: "string",
            enum: ["broadcast"],
          },
        },
        {
          name: "campaignJson",
          type: "object",
          description:
            "Details of the campaign settings including, name description, scheduling and reminder options.",
          isRequired: true,
          schema: {
            type: "object",
            properties: {
              campaignName: {
                type: "string",
                description: "Name of the campaign for internal use.",
              },
              campaignDesc: {
                type: "string",
                description: "Description of the campaign for internal use.",
              },
              reminder: {
                type: "boolean",
                description:
                  "Enabling this sends a follow up email with a different email address to customers who did not open the initial email after 8 days. Default is true.",
              },
              scheduling: {
                type: "object",
                description:
                  'when to send the email. Either "now" or a scheduled date in future.',
                properties: {
                  date: {
                    type: "string",
                    description:
                      "Date to send the email in DD-MM-YYYY format. Must be a future date.",
                  },
                  time: {
                    type: "string",
                    description:
                      "Time of day to send the email in 24-hour HH:MM format. Only in 15 minute increments (e.g 00, 15, 30, 45).",
                  },
                  option: {
                    type: "string",
                    description:
                      'One of "now" or "scheduled". If "schedule", both date and time must be present and valid.',
                    enum: ["now", "scheduled"],
                  },
                },
              },
            },
            required: ["campaignName", "campaignDesc", "reminder"],
          },
        },
        {
          name: "emailJson",
          type: "object",
          description:
            "Details of the email content including subject, preheader, and email layout",
          isRequired: true,
          schema: {
            type: "object",
            properties: {
              subject: {
                type: "string",
                description: "The email subject title.",
              },
              preHeader: {
                type: "string",
                description: "The email preview text shown in inboxes",
              },
              reminderSubject: {
                type: "string",
                description:
                  "The subject title for the follow up email sent to non-openers after 8 days",
              },
              reminderPreHeader: {
                type: "string",
                description:
                  "The email preview text for the follow up email to non-openers after 8 days",
              },
              content: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      enum: [
                        "Header",
                        "Title",
                        "Text",
                        "Button",
                        "Image",
                        "ImageWithText",
                        "Divider",
                        "Spacer",
                        "MenuItem",
                        "ReserveTicket",
                        "Redeemable",
                        "Promo",
                        "PersonalSignOff",
                        "Footer",
                      ],
                    },
                    props: {
                      type: "object",
                    },
                  },
                  required: ["type", "props"],
                },
              },
            },
          },
        },
      ],
      execute: fn.createCampaign,
    },
  ];

  // Create marketing tools instance
  const marketingToolsInstance = useMemo(() => {
    const marketingFunctions: MarketingToolsFunctions = {
      createCampaign,
      getBrandItems,
      searchMediaLibrary,
      getReservationTickets,
      getPromos,
      getRedeemables,
    };
    return MARKETING_TOOLS(marketingFunctions);
  }, [
    createCampaign,
    getBrandItems,
    searchMediaLibrary,
    getReservationTickets,
    getPromos,
    getRedeemables,
  ]);

  // New unified tools with execution functions
  const tools: Tools = useMemo(
    () => [
      // Marketing tools
      ...marketingToolsInstance,

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
      {
        name: "get_brand_items",
        description: "Retrieve a list of menu items for specified brand",
        parameters: [],
        execute: getBrandItems,
      },
    ],
    [
      marketingToolsInstance,
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
      // Authentication and entity context
      auth: {
        token:
          "7b42923191dbb2584ff400dec8319c6ad1b3cfeed4975dcce7b80e4154c5dbe5ce87860bd78de3128eada83246fa65cc880ad446f4b50d8d6ac47a085b2e3900",
        entityId: "8a8197e78054904a01805a25a4bb25be1",
        entityType: EntityType.BRAND,
      },

      // Server configuration
      // chatServerUrl: "http://34.56.173.183",
      chatServerUrl: "https://localhost:3000",
      chatServerKey: "ud21-chat-server-key",
      uploadServerUrl:
        "https://oddle-media-library-staging-215139993835.asia-southeast1.run.app//api/media/upload",

      // Conversation metadata (now dynamic for testing auto-sync!)
      metadata: dynamicMetadata,

      config: {
        ...customConfig,
        enableSuggestedPromptsAnimation: true,
        onMessage: (message) => {
          console.log("Custom demo message:", message);
        },
        onError: (error) => {
          console.error("Custom demo error:", error);
        },
        onConversationInitialized: () => {
          console.log("clog Conversation has been initialized!");
          // Notify external systems that chat conversation is active
        },

        features: {
          fileUpload: true,
          messageHistory: true,
          exportChat: true,
        },
      },
      tools: tools,
      contextHelpers: contextHelpers,
    }),
    [customConfig, tools, dynamicMetadata, contextHelpers]
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

      {/* Metadata test buttons */}
      {/* <button
        onClick={() =>
          setDynamicMetadata({ order_id: `order_${new Date().toISOString()}` })
        }
        style={{
          position: "fixed",
          top: "70px",
          left: isSidebarVisible ? "420px" : "20px",
          zIndex: 1000,
          padding: "12px",
          background: "#059669",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "left 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: "12px",
        }}
      >
        🧪 Set random order id
      </button>

      <button
        onClick={() => setDynamicMetadata(undefined)}
        style={{
          position: "fixed",
          top: "120px",
          left: isSidebarVisible ? "420px" : "20px",
          zIndex: 1000,
          padding: "12px",
          background: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "left 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          fontSize: "12px",
        }}
      >
        🗑️ Clear metadata
      </button> */}

      {/* Thread attachment modal */}
      <ThreadAttachmentModal
        isOpen={isThreadModalOpen}
        onClose={() => setIsThreadModalOpen(false)}
        providerResId={providerResId}
        onAttach={handleThreadAttachment}
      />

      <div className="main-content">
        <div
          className="chat-sidebar-container"
          style={{
            display: isSidebarVisible ? "block" : "none",
          }}
        >
          <div style={{ marginTop: "48px", marginBottom: "48px" }}>
            <ChatWrapper ref={chatWrapperRef} {...sidebarChatProps} />
          </div>
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
    </div>
  );
}

export default App;
