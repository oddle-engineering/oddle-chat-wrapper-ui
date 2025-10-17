"use client";

import { useState } from "react";
import {
  ChatWrapper,
  ChatWrapperProps,
  ClientTools,
} from "@oddle/chat-wrapper-ui";
import { apiConfig } from "../config/apiConfig";

// Types for shop inventory system
interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  sku: string;
  category: string;
  status: "in_stock" | "low_stock" | "out_of_stock" | "discontinued";
  supplier?: string;
  reorder_level: number;
  created_at: string;
  updated_at?: string;
}

// Types for reservation system
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

// Types for todo system
interface Todo {
  id: string;
  task: string;
  status: "pending" | "completed";
  created_at: string;
  updated_at?: string;
}

const generateShopToolSchemas = (): ClientTools => {
  return [
    {
      name: "add_item",
      description: "Add a new item to the inventory",
      parameters: [
        {
          name: "name",
          type: "string",
          description: "Name of the item",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "sku",
          type: "string",
          description: "SKU identifier for the item",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "price",
          type: "number",
          description: "Price of the item",
          isRequired: true,
          schema: { type: "number" },
        },
        {
          name: "quantity",
          type: "number",
          description: "Quantity in stock",
          isRequired: true,
          schema: { type: "number" },
        },
        {
          name: "category",
          type: "string",
          description: "Category of the item",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "description",
          type: "string",
          description: "Description of the item",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "supplier",
          type: "string",
          description: "Supplier of the item",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "reorderLevel",
          type: "number",
          description: "Reorder level threshold",
          isRequired: false,
          schema: { type: "number" },
        },
      ],
    },
    {
      name: "update_item",
      description: "Update an existing inventory item",
      parameters: [
        {
          name: "id",
          type: "string",
          description: "ID of the item to update",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "updates",
          type: "object",
          description: "Object containing the fields to update",
          isRequired: true,
          schema: { type: "object", additionalProperties: true },
        },
      ],
    },
    {
      name: "restock_item",
      description: "Add stock to an existing item",
      parameters: [
        {
          name: "id",
          type: "string",
          description: "ID of the item to restock",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "quantity",
          type: "number",
          description: "Quantity to add to stock",
          isRequired: true,
          schema: { type: "number" },
        },
      ],
    },
    {
      name: "sell_item",
      description: "Sell/remove stock from an item",
      parameters: [
        {
          name: "id",
          type: "string",
          description: "ID of the item to sell",
          isRequired: true,
          schema: { type: "string" },
        },
        {
          name: "quantity",
          type: "number",
          description: "Quantity to sell/remove",
          isRequired: true,
          schema: { type: "number" },
        },
      ],
    },
    {
      name: "delete_item",
      description: "Delete an item from inventory",
      parameters: [
        {
          name: "id",
          type: "string",
          description: "ID of the item to delete",
          isRequired: true,
          schema: { type: "string" },
        },
      ],
    },
    {
      name: "list_items",
      description: "List inventory items with optional filters",
      parameters: [
        {
          name: "category",
          type: "string",
          description: "Filter by category",
          isRequired: false,
          schema: { type: "string" },
        },
        {
          name: "status",
          type: "string",
          description: "Filter by status",
          isRequired: false,
          schema: {
            type: "string",
            enum: ["in_stock", "low_stock", "out_of_stock", "discontinued"],
          },
        },
      ],
    },
    {
      name: "get_low_stock_items",
      description: "Get items that need restocking",
      parameters: [],
    },
    {
      name: "add_random_item_to_shop",
      description: "Add a random item to the shop inventory",
      parameters: [],
    },
    {
      name: "get_inventory_stats",
      description: "Get comprehensive inventory statistics",
      parameters: [],
    },
    {
      name: "search_items",
      description: "Search items by name, SKU, category or description",
      parameters: [
        {
          name: "query",
          type: "string",
          description: "Search query",
          isRequired: true,
          schema: { type: "string" },
        },
      ],
    },

    // To-do management tool schemas
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

    // Reservation management tool schemas
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
  ];
};

// ReservationsPanel Component
const ReservationsPanel = ({ reservations }: { reservations: Reservation[] }) => {
  return (
    <div style={{ padding: "16px", height: "100%", overflow: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, color: "#10b981", fontSize: "18px", fontWeight: "600" }}>
          Reservations ({reservations.length})
        </h3>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {reservations.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            color: "#6b7280", 
            padding: "40px 20px",
            border: "2px dashed #d1d5db",
            borderRadius: "8px"
          }}>
            <p style={{ margin: 0, fontSize: "14px" }}>No reservations yet</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "12px" }}>Ask the AI to create a reservation!</p>
          </div>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                    {reservation.customerName}
                  </h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
                    ID: {reservation.id}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor: 
                      reservation.status === "confirmed" ? "#dcfce7" :
                      reservation.status === "pending" ? "#fef3c7" :
                      reservation.status === "cancelled" ? "#fee2e2" :
                      reservation.status === "completed" ? "#dbeafe" :
                      "#f3f4f6",
                    color:
                      reservation.status === "confirmed" ? "#166534" :
                      reservation.status === "pending" ? "#92400e" :
                      reservation.status === "cancelled" ? "#dc2626" :
                      reservation.status === "completed" ? "#1e40af" :
                      "#4b5563",
                  }}
                >
                  {reservation.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "13px" }}>
                <div>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Date:</span>
                  <span style={{ marginLeft: "4px", color: "#6b7280" }}>{reservation.date}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Time:</span>
                  <span style={{ marginLeft: "4px", color: "#6b7280" }}>{reservation.time}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Party Size:</span>
                  <span style={{ marginLeft: "4px", color: "#6b7280" }}>{reservation.partySize}</span>
                </div>
                <div>
                  <span style={{ fontWeight: "500", color: "#374151" }}>Email:</span>
                  <span style={{ marginLeft: "4px", color: "#6b7280" }}>{reservation.email}</span>
                </div>
                {reservation.phone && (
                  <div>
                    <span style={{ fontWeight: "500", color: "#374151" }}>Phone:</span>
                    <span style={{ marginLeft: "4px", color: "#6b7280" }}>{reservation.phone}</span>
                  </div>
                )}
                {reservation.table && (
                  <div>
                    <span style={{ fontWeight: "500", color: "#374151" }}>Table:</span>
                    <span style={{ marginLeft: "4px", color: "#6b7280" }}>{reservation.table}</span>
                  </div>
                )}
              </div>
              
              {reservation.specialRequests && (
                <div style={{ marginTop: "12px", padding: "8px", backgroundColor: "#f9fafb", borderRadius: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Special Requests:</span>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}>
                    {reservation.specialRequests}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// TodosPanel Component
const TodosPanel = ({ todos }: { todos: Todo[] }) => {
  return (
    <div style={{ padding: "16px", height: "100%", overflow: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, color: "#10b981", fontSize: "18px", fontWeight: "600" }}>
          To-Dos ({todos.length})
        </h3>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {todos.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            color: "#6b7280", 
            padding: "40px 20px",
            border: "2px dashed #d1d5db",
            borderRadius: "8px"
          }}>
            <p style={{ margin: 0, fontSize: "14px" }}>No to-dos yet</p>
            <p style={{ margin: "8px 0 0 0", fontSize: "12px" }}>Ask the AI to create a to-do item!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "12px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: todo.status === "completed" ? "#10b981" : "#d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {todo.status === "completed" && (
                  <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>✓</span>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <p style={{ 
                  margin: 0, 
                  fontSize: "14px", 
                  color: todo.status === "completed" ? "#6b7280" : "#111827",
                  textDecoration: todo.status === "completed" ? "line-through" : "none",
                  fontWeight: todo.status === "completed" ? "normal" : "500"
                }}>
                  {todo.task}
                </p>
                <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#9ca3af" }}>
                  Created: {new Date(todo.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  backgroundColor: todo.status === "completed" ? "#dcfce7" : "#fef3c7",
                  color: todo.status === "completed" ? "#166534" : "#92400e",
                }}
              >
                {todo.status.toUpperCase()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// InventoryPanel Component
const InventoryPanel = ({
  items,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  isLoading,
}: {
  items: InventoryItem[];
  onCreateItem: (item: Omit<InventoryItem, "id" | "created_at">) => void;
  onUpdateItem: (id: string, updates: Partial<InventoryItem>) => void;
  onDeleteItem: (id: string) => void;
  isLoading: boolean;
}) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    sku: "",
    category: "",
    supplier: "",
    reorder_level: 5,
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.sku.trim() || newItem.price <= 0)
      return;

    const status: InventoryItem["status"] =
      newItem.quantity <= 0
        ? "out_of_stock"
        : newItem.quantity <= newItem.reorder_level
        ? "low_stock"
        : "in_stock";

    onCreateItem({
      name: newItem.name.trim(),
      description: newItem.description.trim() || undefined,
      price: newItem.price,
      quantity: newItem.quantity,
      sku: newItem.sku.trim(),
      category: newItem.category.trim() || "General",
      status,
      supplier: newItem.supplier.trim() || undefined,
      reorder_level: newItem.reorder_level,
    });

    setNewItem({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      sku: "",
      category: "",
      supplier: "",
      reorder_level: 5,
    });
    setShowForm(false);
  };

  const categories = [
    "General",
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Home",
    "Sports",
    "Beauty",
  ];

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
            Inventory
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "4px 12px",
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
            disabled={isLoading}
          >
            {showForm ? "Cancel" : "Add Item"}
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
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Item Name"
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
              value={newItem.sku}
              onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
              placeholder="SKU"
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
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              placeholder="Description (optional)"
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
              rows={2}
              disabled={isLoading}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="Price"
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
              />
              <input
                type="number"
                min="0"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Quantity"
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
              />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
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
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                value={newItem.reorder_level}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    reorder_level: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Reorder Level"
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
              />
            </div>
            <input
              type="text"
              value={newItem.supplier}
              onChange={(e) =>
                setNewItem({ ...newItem, supplier: e.target.value })
              }
              placeholder="Supplier (optional)"
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
                isLoading ||
                !newItem.name.trim() ||
                !newItem.sku.trim() ||
                newItem.price <= 0
              }
            >
              Add to Inventory
            </button>
          </form>
        )}
      </div>

      {/* Inventory List */}
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
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: "32px 0",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>No items in inventory</p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Add items or ask the AI to help!
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
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
              {/* Item Header */}
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
                    }}
                  >
                    {JSON.stringify(item.name)}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                    }}
                  >
                    SKU: {JSON.stringify(item.sku)}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteItem(item.id)}
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

              {/* Item Description */}
              {item.description && (
                <p
                  style={{
                    color: "#4b5563",
                    fontSize: "13px",
                    margin: 0,
                  }}
                >
                  {JSON.stringify(item.description)}
                </p>
              )}

              {/* Item Details */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#4b5563",
                }}
              >
                <span>💰 ${JSON.stringify(item.price)}</span>
                <span>📦 {JSON.stringify(item.quantity)}</span>
                <span>📂 {JSON.stringify(item.category)}</span>
              </div>

              {/* Quick Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                }}
              >
                <button
                  onClick={() =>
                    onUpdateItem(item.id, { quantity: item.quantity + 1 })
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
                  +1
                </button>
                {item.quantity > 0 && (
                  <button
                    onClick={() =>
                      onUpdateItem(item.id, {
                        quantity: Math.max(0, item.quantity - 1),
                      })
                    }
                    style={{
                      padding: "2px 8px",
                      fontSize: "12px",
                      backgroundColor: "#fef3c7",
                      color: "#92400e",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fde68a")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fef3c7")
                    }
                    disabled={isLoading}
                  >
                    -1
                  </button>
                )}
                <button
                  onClick={() =>
                    onUpdateItem(item.id, { quantity: item.quantity + 10 })
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
                  +10
                </button>
              </div>

              {/* Supplier */}
              {item.supplier && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                  }}
                >
                  Supplier: {JSON.stringify(item.supplier)}
                </div>
              )}

              {/* Created Date */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                }}
              >
                Added: {new Date(item.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Shop Demo Component
export const ShopDemo = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showInventoryPanel, setShowInventoryPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<"inventory" | "reservations" | "todos">("inventory");

  // Inventory management functions
  const handleCreateItem = (item: Omit<InventoryItem, "id" | "created_at">) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            ...updates,
            updated_at: new Date().toISOString(),
          };
          // Auto-update status based on quantity
          if ("quantity" in updates) {
            updatedItem.status =
              updatedItem.quantity <= 0
                ? "out_of_stock"
                : updatedItem.quantity <= updatedItem.reorder_level
                ? "low_stock"
                : "in_stock";
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Generate random items for demo
  const generateRandomItems = () => {
    const randomItems = [
      "Wireless Headphones",
      "Coffee Maker",
      "Smartphone Case",
      "Book Light",
      "Running Shoes",
      "Laptop Stand",
      "Water Bottle",
      "Desk Organizer",
      "Bluetooth Speaker",
      "Gaming Mouse",
      "Yoga Mat",
      "Notebook Set",
    ];

    const categories = ["Electronics", "Home", "Books", "Sports", "General"];
    const suppliers = ["TechCorp", "HomeGoods Inc", "SportsPro", "OfficeMax"];

    const randomItem =
      randomItems[Math.floor(Math.random() * randomItems.length)];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomSupplier =
      suppliers[Math.floor(Math.random() * suppliers.length)];
    const randomPrice = Math.floor(Math.random() * 200) + 10;
    const randomQuantity = Math.floor(Math.random() * 50) + 1;

    return {
      name: randomItem,
      description: `High-quality ${randomItem.toLowerCase()} for everyday use`,
      price: randomPrice,
      quantity: randomQuantity,
      sku: `SKU-${Date.now()}`,
      category: randomCategory,
      supplier: randomSupplier,
      reorder_level: 5,
      status:
        randomQuantity <= 5
          ? "low_stock"
          : ("in_stock" as InventoryItem["status"]),
    };
  };

  // Chat wrapper props with integrated tools
  const chatProps: ChatWrapperProps = {
    apiUrl: apiConfig.baseUrl + "/api/shop-agent", // Using conversation endpoint
    config: {
      mode: "embedded",
      appName: "Shop Inventory",
      theme: "light",
      placeholder: "Manage inventory or ask for help...",
      constrainedHeight: true, // Fill parent container completely
      onMessage: (message) => {
        console.log("Message received:", message);
      },
      onError: (error) => {
        console.error("Chat error:", error);
      },
      onToolResult: (tool, result) => {
        console.log("Tool result:", tool, result);
        if (tool === "inventory" && Array.isArray(result)) {
          setItems(result);
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
      // Inventory management tools
      add_item: (parameters: {
        name: string;
        sku: string;
        price: number;
        quantity: number;
        category?: string;
        description?: string;
        supplier?: string;
        reorderLevel: number;
      }) => {
        const {
          name,
          sku,
          price,
          quantity,
          category,
          description,
          supplier,
          reorderLevel,
        } = parameters;

        console.log("Adding item:", {
          name,
          sku,
          price,
          quantity,
          category,
          description,
          supplier,
          reorderLevel,
        });

        const status: InventoryItem["status"] =
          quantity <= 0
            ? "out_of_stock"
            : quantity <= reorderLevel
            ? "low_stock"
            : "in_stock";

        const newItem: InventoryItem = {
          id: Date.now().toString(),
          name,
          sku,
          price,
          quantity,
          category: category || "General",
          description,
          supplier,
          reorder_level: reorderLevel,
          status,
          created_at: new Date().toISOString(),
        };
        setItems((prev) => [...prev, newItem]);
        return {
          success: true,
          item: newItem,
          message: `Added ${name} to inventory`,
        };
      },

      update_item: (id: string, updates: Partial<InventoryItem>) => {
        console.log("Updating item:", { id, updates });
        const item = items.find((i) => i.id === id);
        if (!item) {
          return { success: false, error: "Item not found" };
        }

        const updatedItem = {
          ...item,
          ...updates,
          updated_at: new Date().toISOString(),
        };
        // Auto-update status based on quantity
        if ("quantity" in updates) {
          updatedItem.status =
            updatedItem.quantity <= 0
              ? "out_of_stock"
              : updatedItem.quantity <= updatedItem.reorder_level
              ? "low_stock"
              : "in_stock";
        }

        setItems((prev) => prev.map((i) => (i.id === id ? updatedItem : i)));
        return {
          success: true,
          item: updatedItem,
          message: `Updated ${item.name}`,
        };
      },

      restock_item: (id: string, quantity: number) => {
        console.log("Restocking item:", { id, quantity });
        const item = items.find((i) => i.id === id);
        if (!item) {
          return { success: false, error: "Item not found" };
        }

        const newQuantity = item.quantity + quantity;
        const status: InventoryItem["status"] =
          newQuantity <= 0
            ? "out_of_stock"
            : newQuantity <= item.reorder_level
            ? "low_stock"
            : "in_stock";

        const updatedItem = {
          ...item,
          quantity: newQuantity,
          status,
          updated_at: new Date().toISOString(),
        };

        setItems((prev) => prev.map((i) => (i.id === id ? updatedItem : i)));
        return {
          success: true,
          item: updatedItem,
          message: `Restocked ${item.name} with ${quantity} units. New quantity: ${newQuantity}`,
        };
      },

      sell_item: (id: string, quantity: number) => {
        console.log("Selling item:", { id, quantity });
        const item = items.find((i) => i.id === id);
        if (!item) {
          return { success: false, error: "Item not found" };
        }

        if (item.quantity < quantity) {
          return { success: false, error: "Insufficient stock" };
        }

        const newQuantity = item.quantity - quantity;
        const status: InventoryItem["status"] =
          newQuantity <= 0
            ? "out_of_stock"
            : newQuantity <= item.reorder_level
            ? "low_stock"
            : "in_stock";

        const updatedItem = {
          ...item,
          quantity: newQuantity,
          status,
          updated_at: new Date().toISOString(),
        };

        setItems((prev) => prev.map((i) => (i.id === id ? updatedItem : i)));
        return {
          success: true,
          item: updatedItem,
          revenue: quantity * item.price,
          message: `Sold ${quantity} units of ${item.name}. Remaining: ${newQuantity}`,
        };
      },

      delete_item: (id: string) => {
        console.log("Deleting item:", id);
        const item = items.find((i) => i.id === id);
        if (!item) {
          return { success: false, error: "Item not found" };
        }

        setItems((prev) => prev.filter((i) => i.id !== id));
        return {
          success: true,
          message: `Deleted ${item.name} from inventory`,
        };
      },

      list_items: (category?: string, status?: InventoryItem["status"]) => {
        console.log("Listing items:", { category, status });
        let filteredItems = items;

        if (category && typeof category === "string") {
          filteredItems = filteredItems.filter(
            (i) => i.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (status && typeof status === "string") {
          filteredItems = filteredItems.filter((i) => i.status === status);
        }

        return {
          success: true,
          items: filteredItems,
          total: filteredItems.length,
          message: `Found ${filteredItems.length} item${
            filteredItems.length !== 1 ? "s" : ""
          }`,
        };
      },

      get_low_stock_items: () => {
        console.log("Getting low stock items");
        const lowStockItems = items.filter(
          (i) => i.quantity <= i.reorder_level
        );
        return {
          success: true,
          items: lowStockItems,
          total: lowStockItems.length,
          message: `${lowStockItems.length} item${
            lowStockItems.length !== 1 ? "s" : ""
          } need restocking`,
        };
      },

      add_random_item_to_shop: () => {
        console.log("Adding random item to shop");
        const randomItemData = generateRandomItems();
        const newItem: InventoryItem = {
          ...randomItemData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
        };
        setItems((prev) => [...prev, newItem]);
        return {
          success: true,
          item: newItem,
          message: `Added random item: ${newItem.name} to inventory`,
        };
      },

      // Shop specific tools
      get_inventory_stats: () => {
        console.log("Getting inventory statistics");
        const stats = {
          total_items: items.length,
          total_value: items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          in_stock: items.filter((i) => i.status === "in_stock").length,
          low_stock: items.filter((i) => i.status === "low_stock").length,
          out_of_stock: items.filter((i) => i.status === "out_of_stock").length,
          categories: [...new Set(items.map((i) => i.category))].length,
        };

        return {
          success: true,
          stats,
          message: `Inventory stats: ${
            stats.total_items
          } items, $${stats.total_value.toFixed(2)} total value`,
        };
      },

      search_items: (query: string) => {
        console.log("Searching items:", query);
        if (!query || typeof query !== "string") {
          return {
            success: false,
            error: "Search query must be a non-empty string",
            items: [],
            total: 0,
            message: "Invalid search query",
          };
        }

        const searchResults = items.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.sku.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            (item.description &&
              item.description.toLowerCase().includes(query.toLowerCase()))
        );

        return {
          success: true,
          query,
          items: searchResults,
          total: searchResults.length,
          message: `Found ${searchResults.length} item${
            searchResults.length !== 1 ? "s" : ""
          } matching "${query}"`,
        };
      },

      // To-do management tools
      create_to_do: async (params: { task_description: string }) => {
        console.log("Creating to-do:", params);
        const newTodo = {
          id: Date.now().toString(),
          task: params.task_description,
          status: "pending" as const,
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

      read_to_dos: async () => {
        console.log("Reading to-dos");
        return {
          success: true,
          todos: todos,
          message: `Retrieved ${todos.length} to-do items`,
        };
      },

      // Reservation management tools
      create_reservation: async (params: any) => {
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
      },

      update_reservation: async (params: any) => {
        console.log("Updating reservation:", params);
        const reservation = reservations.find(
          (r) => r.id === params.reservation_id
        );
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
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
        setReservations((prev) =>
          prev.map((r) =>
            r.id === params.reservation_id ? updatedReservation : r
          )
        );
        return {
          success: true,
          reservation: updatedReservation,
          message: `Updated reservation for ${reservation.customerName}`,
        };
      },

      cancel_reservation: async (params: { id: string; reason?: string }) => {
        console.log("Cancelling reservation:", params);
        const reservation = reservations.find((r) => r.id === params.id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }

        const updatedReservation = {
          ...reservation,
          status: "cancelled" as const,
          updated_at: new Date().toISOString(),
        };
        setReservations((prev) =>
          prev.map((r) => (r.id === params.id ? updatedReservation : r))
        );
        return {
          success: true,
          reservation: updatedReservation,
          message: `Cancelled reservation for ${reservation.customerName}${
            params.reason ? `: ${params.reason}` : ""
          }`,
        };
      },

      confirm_reservation: async (params: { id: string; table?: string }) => {
        console.log("Confirming reservation:", params);
        const reservation = reservations.find((r) => r.id === params.id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }

        const updatedReservation = {
          ...reservation,
          status: "confirmed" as const,
          table: params.table,
          updated_at: new Date().toISOString(),
        };
        setReservations((prev) =>
          prev.map((r) => (r.id === params.id ? updatedReservation : r))
        );
        return {
          success: true,
          reservation: updatedReservation,
          message: `Confirmed reservation for ${reservation.customerName}${
            params.table ? ` at table ${params.table}` : ""
          }`,
        };
      },

      mark_no_show: async (params: { id: string }) => {
        console.log("Marking reservation as no-show:", params.id);
        const reservation = reservations.find((r) => r.id === params.id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }

        const updatedReservation = {
          ...reservation,
          status: "no_show" as const,
          updated_at: new Date().toISOString(),
        };
        setReservations((prev) =>
          prev.map((r) => (r.id === params.id ? updatedReservation : r))
        );
        return {
          success: true,
          reservation: updatedReservation,
          message: `Marked ${reservation.customerName} as no-show`,
        };
      },

      complete_reservation: async (params: { id: string }) => {
        console.log("Completing reservation:", params.id);
        const reservation = reservations.find((r) => r.id === params.id);
        if (!reservation) {
          return { success: false, error: "Reservation not found" };
        }

        const updatedReservation = {
          ...reservation,
          status: "completed" as const,
          updated_at: new Date().toISOString(),
        };
        setReservations((prev) =>
          prev.map((r) => (r.id === params.id ? updatedReservation : r))
        );
        return {
          success: true,
          reservation: updatedReservation,
          message: `Completed reservation for ${reservation.customerName}`,
        };
      },

      list_reservations: async (params?: {
        status?: Reservation["status"];
        date?: string;
      }) => {
        console.log("Listing reservations:", params);
        let filteredReservations = reservations;

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

        return {
          success: true,
          reservations: filteredReservations,
          total: filteredReservations.length,
          message: `Found ${filteredReservations.length} reservation${
            filteredReservations.length !== 1 ? "s" : ""
          }`,
        };
      },

      get_availability: async (params: { date: string; time?: string }) => {
        console.log("Checking availability:", params);
        const dayReservations = reservations.filter(
          (r) => r.date === params.date && r.status !== "cancelled"
        );
        const totalTables = 20; // Mock restaurant capacity
        const bookedTables = dayReservations.length;
        const availableTables = totalTables - bookedTables;

        return {
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
        };
      },

      get_reservation_stats: async () => {
        console.log("Getting reservation statistics");
        const stats = {
          total: reservations.length,
          confirmed: reservations.filter((r) => r.status === "confirmed")
            .length,
          pending: reservations.filter((r) => r.status === "pending").length,
          cancelled: reservations.filter((r) => r.status === "cancelled")
            .length,
          completed: reservations.filter((r) => r.status === "completed")
            .length,
          no_shows: reservations.filter((r) => r.status === "no_show").length,
        };

        return {
          success: true,
          stats,
          message: `Reservation stats: ${stats.total} total, ${stats.confirmed} confirmed, ${stats.pending} pending`,
        };
      },
    },
    clientTools: generateShopToolSchemas(),
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        overflow: "hidden",
        backgroundColor: "#f0fdf4",
        position: "relative",
        isolation: "isolate",
      }}
    >
      {/* Left Side Data Panel */}
      {showInventoryPanel && (
        <div
          style={{
            width: "400px",
            backgroundColor: "#f8fafc",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e2e8f0",
              backgroundColor: "white",
            }}
          >
            {(["inventory", "reservations", "todos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "none",
                  backgroundColor: activeTab === tab ? "#10b981" : "transparent",
                  color: activeTab === tab ? "white" : "#6b7280",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {tab} ({
                  tab === "inventory" ? items.length :
                  tab === "reservations" ? reservations.length :
                  todos.length
                })
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            {activeTab === "inventory" && (
              <InventoryPanel
                items={items}
                onCreateItem={handleCreateItem}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
                isLoading={false}
              />
            )}
            {activeTab === "reservations" && (
              <ReservationsPanel reservations={reservations} />
            )}
            {activeTab === "todos" && (
              <TodosPanel todos={todos} />
            )}
          </div>
        </div>
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
              Shop Inventory Management
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
              }}
            >
              Track stock levels, manage products, and optimize inventory
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
              onClick={() => setShowInventoryPanel(!showInventoryPanel)}
              style={{
                padding: "4px 12px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
                backgroundColor: showInventoryPanel ? "#dcfce7" : "#f3f4f6",
                color: showInventoryPanel ? "#166534" : "#374151",
              }}
              onMouseOver={(e) => {
                if (!showInventoryPanel)
                  e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = showInventoryPanel
                  ? "#dcfce7"
                  : "#f3f4f6";
              }}
            >
              {showInventoryPanel ? "Hide" : "Show"} Inventory
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

export default ShopDemo;
