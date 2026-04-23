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
    params: CreateCampaignParams,
  ) => Promise<CreateCampaignResponse>;
  getBrandItems: () => Promise<unknown>;
  searchMediaLibrary: (params: {
    queries: string;
    maxResults: number;
  }) => Promise<unknown>;
  getReservationTickets: () => Promise<unknown>;
  getPromos: () => Promise<unknown>;
  getRedeemables: () => Promise<unknown>;
  createRedeemable: (params: CreateRedeemableParams) => Promise<unknown>;
  createRedeemableCampaign: (
    params: CreateRedeemableCampaignParams,
  ) => Promise<unknown>;
  updateRedeemableCampaign: (
    params: UpdateRedeemableCampaignParams,
  ) => Promise<unknown>;
  readEmail: () => Promise<EmailJsonResponse>;
  updateEmailContent: (
    params: UpdateEmailContentParams,
  ) => Promise<EmailJsonResponse>;
  updateEmailBlock: (
    params: UpdateEmailBlockParams,
  ) => Promise<EmailJsonResponse>;
  updateEmailSettings: (
    params: UpdateEmailSettingsParams,
  ) => Promise<EmailSettingsResponse>;
}

export interface EmailJsonResponse {
  success: boolean;
  emailJson: {
    subject: string;
    preHeader: string;
    reminderSubject?: string;
    reminderPreHeader?: string;
    content: Array<{
      type: string;
      props: Record<string, unknown> & { id: string };
    }>;
  };
}

export interface UpdateEmailContentParams {
  emailJson: EmailJsonResponse["emailJson"];
}

export interface UpdateEmailBlockParams {
  targetBlockId: string;
  blockJson: {
    content: Array<{
      type: string;
      props: Record<string, unknown> & { id: string };
    }>;
  };
}

export interface UpdateEmailSettingsParams {
  campaignJson: {
    subject: string;
    preHeader: string;
    reminderSubject?: string;
    reminderPreHeader?: string;
  };
}

export interface EmailSettingsResponse {
  success: boolean;
  campaignJson: UpdateEmailSettingsParams["campaignJson"];
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

export interface CreateRedeemableParams {
  name: string;
  description: string;
  points_required: number;
  valid_from: string;
  valid_until: string;
  applicable_to: string[];
  stock_available?: number;
  image_url?: string;
  applicable_outlets?: string[];
  dine_in_only?: boolean;
}

export interface CreateRedeemableCampaignParams {
  name: string;
  redeemableTitle: string;
  description: string;
  termsAndConditions: string;
  imageUrl: string;
  issuedType: "unlimited" | "limited";
  issuedMax?: number;
  redemptionType: string;
  redemptionMax?: number;
  claimLimit: number;
  expiryType: "never" | "fix" | "specific_date";
  expiryDays?: number;
  expiryDate?: string;
  redemptionAvailableWhen: {
    type:
      | "IMMEDIATELY"
      | "NEXT_DAY"
      | "AFTER_DAYS_AMOUNT"
      | "AFTER_SPECIFIC_DATE";
    days?: number;
    date?: string;
  } | null;
  redemptionAvailableSchedule?: {
    Mon?: string[] | null;
    Tue?: string[] | null;
    Wed?: string[] | null;
    Thu?: string[] | null;
    Fri?: string[] | null;
    Sat?: string[] | null;
    Sun?: string[] | null;
  } | null;
}

export interface UpdateRedeemableCampaignParams {
  id: string;
  name?: string;
  redeemableTitle?: string;
  description?: string;
  termsAndConditions?: string;
  imageUrl?: string;
  issuedType?: "unlimited" | "limited";
  issuedMax?: number;
  redemptionType?: string;
  redemptionMax?: number;
  claimLimit?: number;
  expiryType?: "never" | "fix" | "specific_date";
  expiryDays?: number;
  expiryDate?: string;
  redemptionAvailableWhen?: {
    type:
      | "IMMEDIATELY"
      | "NEXT_DAY"
      | "AFTER_DAYS_AMOUNT"
      | "AFTER_SPECIFIC_DATE";
    days?: number;
    date?: string;
  } | null;
  redemptionAvailableSchedule?: {
    Mon?: string[] | null;
    Tue?: string[] | null;
    Wed?: string[] | null;
    Thu?: string[] | null;
    Fri?: string[] | null;
    Sat?: string[] | null;
    Sun?: string[] | null;
  } | null;
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
      },
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
  // Mock email state for demo purposes
  const [currentEmail, setCurrentEmail] = useState<
    EmailJsonResponse["emailJson"]
  >({
    subject: "Exclusive Deals Just for You!",
    preHeader: "Don't miss out on our latest offers",
    reminderSubject: "Last Chance: Exclusive Deals Waiting!",
    reminderPreHeader:
      "You haven't opened our email yet - check out these amazing offers",
    content: [
      {
        type: "Header",
        props: {
          id: "Header-1",
          logoUrl: "https://example.com/logo.png",
          brandName: "McDonald's",
        },
      },
      {
        type: "Title",
        props: {
          id: "Title-1",
          text: "Welcome to Our Newsletter",
        },
      },
      {
        type: "Text",
        props: {
          id: "Text-1",
          content: "Check out our latest menu items and special offers!",
        },
      },
      {
        type: "Footer",
        props: {
          id: "Footer-1",
          companyName: "McDonald's",
          unsubscribeLink: "https://example.com/unsubscribe",
        },
      },
    ],
  });

  const [customConfig] = useState({
    mode: "embedded" as ChatMode,
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
    chipName: "McDonald's McDonald McDonald McDonald McDonald McDonald",
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
          "Write a marketing email to win back lapsed customers and encourage them to order again. Structure the email with: a header, hero image, title, introductory text, body text, divider, menu section title, menu introduction text, 4 menu items, a sign-off message, and footer.",
        icon: <span>⚡</span>,
      },
      {
        title: "Limited-Time Offer Blast",
        description:
          "Create a limited-time restaurant offer email that builds excitement and gets customers to book instantly.",
        icon: <span>⚡</span>,
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
    showSuggestedPromptsOnInit: true, // false = compact mode with icon, input expands on focus (48px → 96px), true = empty mode with suggested prompts (no icon)
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

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isThreadModalOpen, setIsThreadModalOpen] = useState(false);

  // State for dynamic metadata (for testing metadata prop sync)
  // Start with empty to test the "metadata starts empty then gets populated" scenario
  const [dynamicMetadata, setDynamicMetadata] = useState<any>({
    campaignId: "sss",
  });

  // State for dynamic contextHelpers (for testing contextHelpers prop sync)
  // Start with minimal context, then add brandInfo after 10 seconds
  const [contextHelpers, setContextHelpers] = useState<any>({
    locale: "en_SG",
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
        "✅ 10 seconds elapsed - attaching brandInfo to contextHelpers",
      );
      setContextHelpers({
        brandInfo: {
          id: "ud21_123",
          brandName: "UD21 Restaurant",
        },
        locale: "en_SG",
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
          metadata,
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
    [providerResId],
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
            : r,
        ),
      );
    },
    [],
  );

  const handleCancelReservation = useCallback((id: string, reason?: string) => {
    console.log(
      "Cancelling reservation:",
      id,
      reason ? `Reason: ${reason}` : "",
    );
    setReservations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "cancelled" as const,
              updated_at: new Date().toISOString(),
            }
          : r,
      ),
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
    [],
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
        r.id === params.reservation_id ? updatedReservation : r,
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
    [],
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
    [],
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
              (r) => r.status === params.status,
            );
          }

          if (params?.date) {
            filteredReservations = filteredReservations.filter(
              (r) => r.date === params.date,
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
    [],
  );

  const getAvailability = useCallback(
    async (params: { date: string; time?: string }) => {
      console.log("Checking availability:", params);
      return new Promise<any>((resolve) => {
        setReservations((prev) => {
          const dayReservations = prev.filter(
            (r) => r.date === params.date && r.status !== "cancelled",
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
    [],
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
    await new Promise((resolve) => setTimeout(resolve, 10000));
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
    [],
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
          imageUrl:
            "https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/2c9f8adc663cc6c201663dd253da5c35/promotion/null.jpg",
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

  const createRedeemable = useCallback(
    async (params: CreateRedeemableParams) => {
      console.log("Creating redeemable:", params);
      // Mock redeemable creation
      return {
        success: true,
        redeemable: {
          id: `redeem_${Date.now()}`,
          ...params,
          status: "active",
          created_at: new Date().toISOString(),
        },
        message: `Redeemable "${params.name}" created successfully`,
      };
    },
    [],
  );

  const createRedeemableCampaign = useCallback(
    async (params: CreateRedeemableCampaignParams) => {
      console.log("Creating redeemable campaign:", params);
      return {
        success: true,
        campaign: {
          id: `redeemable_campaign_${Date.now()}`,
          ...params,
          status: "active",
          created_at: new Date().toISOString(),
        },
        message: `Redeemable campaign "${params.name}" created successfully`,
      };
    },
    [],
  );

  const updateRedeemableCampaign = useCallback(
    async (params: UpdateRedeemableCampaignParams) => {
      console.log("Updating redeemable campaign:", params);
      return {
        success: true,
        campaign: {
          ...params,
          updated_at: new Date().toISOString(),
        },
        message: `Redeemable campaign "${params.id}" updated successfully`,
      };
    },
    [],
  );

  // Email management tools
  const readEmail = useCallback(async (): Promise<EmailJsonResponse> => {
    console.log("Reading current email");
    return {
      success: true,
      emailJson: currentEmail,
    };
  }, [currentEmail]);

  const updateEmailContent = useCallback(
    async (params: UpdateEmailContentParams): Promise<EmailJsonResponse> => {
      console.log("Updating email content:", params);
      setCurrentEmail(params.emailJson);
      return {
        success: true,
        emailJson: params.emailJson,
      };
    },
    [],
  );

  const updateEmailBlock = useCallback(
    async (params: UpdateEmailBlockParams): Promise<EmailJsonResponse> => {
      console.log("Updating email block:", params);
      const updatedContent = currentEmail.content.map((block) => {
        if (block.props.id === params.targetBlockId) {
          // Replace with the first block from blockJson.content
          return params.blockJson.content[0] || block;
        }
        return block;
      });

      const updatedEmail = {
        ...currentEmail,
        content: updatedContent,
      };

      setCurrentEmail(updatedEmail);
      return {
        success: true,
        emailJson: updatedEmail,
      };
    },
    [currentEmail],
  );

  const updateEmailSettings = useCallback(
    async (
      params: UpdateEmailSettingsParams,
    ): Promise<EmailSettingsResponse> => {
      console.log("Updating email settings:", params);
      const updatedEmail = {
        ...currentEmail,
        ...params.campaignJson,
      };
      setCurrentEmail(updatedEmail);
      return {
        success: true,
        campaignJson: params.campaignJson,
      };
    },
    [currentEmail],
  );

  // Marketing tools factory
  const MARKETING_TOOLS: (functions: MarketingToolsFunctions) => Tools = (
    fn,
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
      name: "create_redeemable",
      description:
        "Creates a new redeemable voucher or reward for the brand's online shop",
      parameters: [
        {
          name: "name",
          type: "string",
          description: "Name of the redeemable",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "description",
          type: "string",
          description:
            "Description of what the customer receives when redeeming",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "points_required",
          type: "number",
          description: "Number of loyalty points required to redeem",
          isRequired: true,
          schema: { type: "integer" },
        },
        {
          name: "valid_from",
          type: "string",
          description:
            "Start date of the redeemable validity in YYYY-MM-DD format",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "valid_until",
          type: "string",
          description:
            "End date of the redeemable validity in YYYY-MM-DD format",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "applicable_to",
          type: "array",
          description:
            'Order types this redeemable applies to, e.g. ["delivery", "takeaway", "dine_in"]',
          isRequired: true,
          schema: {
            type: "array",
            items: {
              type: "string",
              enum: ["delivery", "takeaway", "dine_in"],
            },
          },
        },
        {
          name: "stock_available",
          type: "number",
          description:
            "Maximum number of times this redeemable can be used. Omit for unlimited.",
          isRequired: false,
          schema: { type: "integer" },
        },
        {
          name: "image_url",
          type: "string",
          description: "URL of the image to display for this redeemable",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "applicable_outlets",
          type: "array",
          description:
            "List of outlet IDs this redeemable is valid at. Omit for all outlets.",
          isRequired: false,
          schema: { type: "array", items: { type: "string" } },
        },
        {
          name: "dine_in_only",
          type: "boolean",
          description:
            "Whether this redeemable is restricted to dine-in orders only",
          isRequired: false,
          schema: { type: "boolean" },
        },
      ],
      execute: fn.createRedeemable,
    },
    {
      name: "create_redeemable_campaign",
      description: "Creates a redeemable campaign for in-store use.",
      parameters: [
        {
          name: "name",
          type: "string",
          description: "Internal campaign name.",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "redeemableTitle",
          type: "string",
          description: "Title shown to customers.",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "description",
          type: "string",
          description: "Customer-facing description (HTML allowed).",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "termsAndConditions",
          type: "string",
          description: "Terms and conditions (HTML allowed).",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "imageUrl",
          type: "string",
          description:
            "Image URL (must be an Uploadcare URL; if user provides an external URL, it must be uploaded to the media library first).",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "issuedType",
          type: "string",
          description:
            "Whether the redeemable has unlimited issuance or a limited max issuance.",
          isRequired: true,
          schema: { type: "string", enum: ["unlimited", "limited"] },
        },
        {
          name: "issuedMax",
          type: "number",
          description:
            "Required when issuedType is limited; maximum number of redeemables that can be issued.",
          isRequired: false,
          schema: { type: "number" },
        },
        {
          name: "redemptionType",
          type: "string",
          description: "Redemption limit type.",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "redemptionMax",
          type: "number",
          description: "Maximum number of redemptions.",
          isRequired: false,
          schema: { type: "number" },
        },
        {
          name: "claimLimit",
          type: "number",
          description: "Maximum claims per customer.",
          isRequired: true,
          schema: { type: "number" },
        },
        {
          name: "expiryType",
          type: "string",
          description: "Expiry configuration.",
          isRequired: true,
          schema: { type: "string", enum: ["never", "fix", "specific_date"] },
        },
        {
          name: "expiryDays",
          type: "number",
          description: "Optional. Used when expiryType is fix.",
          isRequired: false,
          schema: { type: "integer" },
        },
        {
          name: "expiryDate",
          type: "string",
          description: "Optional. Used when expiryType is specific_date.",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "redemptionAvailableWhen",
          type: "object",
          description: "When the redeemable becomes available for redemption.",
          isRequired: true,
          schema: {
            type: "object",
            nullable: true,
            properties: {
              type: {
                type: "string",
                enum: [
                  "IMMEDIATELY",
                  "NEXT_DAY",
                  "AFTER_DAYS_AMOUNT",
                  "AFTER_SPECIFIC_DATE",
                ],
              },
              days: {
                type: "integer",
                description: "Optional. Used when type is AFTER_DAYS_AMOUNT.",
              },
              date: {
                type: "string",
                description: "Optional. Used when type is AFTER_SPECIFIC_DATE.",
              },
            },
            required: ["type"],
            additionalProperties: false,
          },
        },
        {
          name: "redemptionAvailableSchedule",
          type: "object",
          description:
            "Optional. Day/time availability schedule. Omit or set null to allow all days/all time.",
          isRequired: false,
          schema: {
            type: "object",
            nullable: true,
            properties: {
              Mon: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
              Tue: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
              Wed: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
              Thu: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
              Fri: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
              Sat: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
              Sun: {
                type: "array",
                nullable: true,
                items: {
                  type: "string",
                  pattern:
                    "^(?:[01]\\d|2[0-3]):[0-5]\\d-(?:[01]\\d|2[0-3]):[0-5]\\d$",
                },
              },
            },
            additionalProperties: false,
          },
        },
      ],
      execute: fn.createRedeemableCampaign,
    },
    {
      name: "update_redeemable_campaign",
      description:
        "Updates an existing redeemable campaign. Only provide the fields you want to change.",
      parameters: [
        {
          name: "id",
          type: "string",
          description: "ID of the redeemable campaign to update.",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "name",
          type: "string",
          description: "Internal campaign name.",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "redeemableTitle",
          type: "string",
          description: "Title shown to customers.",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "description",
          type: "string",
          description: "Customer-facing description (HTML allowed).",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "termsAndConditions",
          type: "string",
          description: "Terms and conditions (HTML allowed).",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "imageUrl",
          type: "string",
          description: "Image URL (must be an Uploadcare URL).",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "issuedType",
          type: "string",
          description:
            "Whether the redeemable has unlimited issuance or a limited max issuance.",
          isRequired: false,
          schema: { type: "string", enum: ["unlimited", "limited"] },
        },
        {
          name: "issuedMax",
          type: "number",
          description:
            "Required when issuedType is limited; maximum number of redeemables that can be issued.",
          isRequired: false,
          schema: { type: "number" },
        },
        {
          name: "redemptionType",
          type: "string",
          description: "Redemption limit type.",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "redemptionMax",
          type: "number",
          description: "Maximum number of redemptions.",
          isRequired: false,
          schema: { type: "number" },
        },
        {
          name: "claimLimit",
          type: "number",
          description: "Maximum claims per customer.",
          isRequired: false,
          schema: { type: "number" },
        },
        {
          name: "expiryType",
          type: "string",
          description: "Expiry configuration.",
          isRequired: false,
          schema: { type: "string", enum: ["never", "fix", "specific_date"] },
        },
        {
          name: "expiryDays",
          type: "number",
          description: "Used when expiryType is fix.",
          isRequired: false,
          schema: { type: "integer" },
        },
        {
          name: "expiryDate",
          type: "string",
          description: "Used when expiryType is specific_date.",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "redemptionAvailableWhen",
          type: "object",
          description: "When the redeemable becomes available for redemption.",
          isRequired: false,
          schema: {
            type: "object",
            nullable: true,
            properties: {
              type: {
                type: "string",
                enum: [
                  "IMMEDIATELY",
                  "NEXT_DAY",
                  "AFTER_DAYS_AMOUNT",
                  "AFTER_SPECIFIC_DATE",
                ],
              },
              days: { type: "integer" },
              date: { type: "string" },
            },
            required: ["type"],
            additionalProperties: false,
          },
        },
        {
          name: "redemptionAvailableSchedule",
          type: "object",
          description:
            "Day/time availability schedule. Set null to allow all days/all time.",
          isRequired: false,
          schema: {
            type: "object",
            nullable: true,
            properties: {
              Mon: { type: "array", nullable: true, items: { type: "string" } },
              Tue: { type: "array", nullable: true, items: { type: "string" } },
              Wed: { type: "array", nullable: true, items: { type: "string" } },
              Thu: { type: "array", nullable: true, items: { type: "string" } },
              Fri: { type: "array", nullable: true, items: { type: "string" } },
              Sat: { type: "array", nullable: true, items: { type: "string" } },
              Sun: { type: "array", nullable: true, items: { type: "string" } },
            },
            additionalProperties: false,
          },
        },
      ],
      execute: fn.updateRedeemableCampaign,
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
                description:
                  "Name of the campaign for internal use. Recommended format (unless instructed otherwise) {dd mmm yy} | Name",
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
    {
      name: "read_email",
      description: "Retrieves the current email in emailJson format",
      parameters: [],
      execute: fn.readEmail,
    },
    {
      name: "update_email_content",
      description:
        "Replaces the current email with a new one provided in emailJson format",
      parameters: [
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
                      properties: {
                        id: {
                          type: "string",
                          description:
                            "A unique id for the block. id must be unique for each block. format {blocktype}-{number} e.g. Header-1",
                        },
                      },
                      required: ["id"],
                    },
                  },
                  required: ["type", "props"],
                },
              },
            },
            required: ["subject", "preHeader", "content"],
          },
        },
      ],
      execute: fn.updateEmailContent,
    },
    {
      name: "update_email_block",
      description:
        "Replaces a specific target email block in the current email in blockJson format",
      parameters: [
        {
          name: "targetBlockId",
          type: "string",
          description: "id of the target email block to replace",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "blockJson",
          type: "object",
          description: "blockJson object defining the new email block",
          isRequired: true,
          schema: {
            type: "object",
            properties: {
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
                      properties: {
                        id: {
                          type: "string",
                          description:
                            "A unique id for the block. id must be unique for each block. format {blocktype}-{number} e.g. Header-1",
                        },
                      },
                      required: ["id"],
                    },
                  },
                  required: ["type", "props"],
                },
              },
            },
          },
        },
      ],
      execute: fn.updateEmailBlock,
    },
    {
      name: "update_email_settings",
      description:
        "Replaces the current email settings like email subject etc with a new one provided in campaignJson format",
      parameters: [
        {
          name: "campaignJson",
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
            },
          },
        },
      ],
      execute: fn.updateEmailSettings,
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
      createRedeemable,
      createRedeemableCampaign,
      updateRedeemableCampaign,
      readEmail,
      updateEmailContent,
      updateEmailBlock,
      updateEmailSettings,
    };
    return MARKETING_TOOLS(marketingFunctions);
  }, [
    createCampaign,
    getBrandItems,
    searchMediaLibrary,
    getReservationTickets,
    getPromos,
    getRedeemables,
    createRedeemable,
    createRedeemableCampaign,
    updateRedeemableCampaign,
    readEmail,
    updateEmailContent,
    updateEmailBlock,
    updateEmailSettings,
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
    ],
  );

  const sidebarChatProps: ChatWrapperProps = useMemo(
    () => ({
      // Authentication and entity context
      auth: {
        token:
          "1c26f13dc6bbc3fb61875291e29a33f7d4314da695f997b0b5e29009798e4ce6a71cebbdaa1466ab2976399a433d3fdf0d460bfce9d0ead7ec1a11a6fa7018bc",
        entityId: "8a608005902f987401902ff891b901a5",
        entityType: EntityType.BRAND,
      },

      // Server configuration
      // chatServerUrl: "https://ai-chat.staging.oddleapp.com",
      chatServerUrl: "http://localhost:3000",
      chatServerKey: "ud21-chat-server-key",
      uploadServerUrl:
        "https://oddle-media-library-staging-215139993835.asia-southeast1.run.app/api/media/upload",

      // Conversation metadata (now dynamic for testing auto-sync!)
      metadata: dynamicMetadata,

      // MCP headers for testing
      mcpHeaders: {
        "test-context": {
          "user-id": "test-user-123",
          "session-id": "test-session-456",
        },
        "app-metadata": {
          "app-name": "showcase-app",
          version: "1.0.0",
        },
      },

      config: {
        ...customConfig,
        enableSuggestedPromptsAnimation: true,
        onMessagesPersisted: (data) => {
          console.log("✅ Messages persisted to database:", data);
          // This callback is triggered after server successfully writes messages to DB
          // Use this for safe navigation to history/chat view
          // Example use cases:
          // - Navigate to conversation history page
          // - Show success toast notification
          // - Update UI to reflect saved state
          // - Enable history navigation button
          if (data.threadId && data.providerResId) {
            console.log(
              `💾 Safe to navigate to thread: ${data.threadId} (conversation: ${data.providerResId})`,
            );
          }
        },

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
        customStyles: {
          backgroundColor: "#F4F6F8",
        },
      },
      tools: tools,
      contextHelpers: contextHelpers,
    }),
    [customConfig, tools, dynamicMetadata, contextHelpers],
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
        {isSidebarVisible && (
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
        )}
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
