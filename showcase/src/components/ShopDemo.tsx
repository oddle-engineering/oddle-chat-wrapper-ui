"use client";

import { useState } from "react";
import { ChatWrapper, ChatWrapperProps } from "@oddle/chat-wrapper-ui";
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
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                    }}
                  >
                    SKU: {item.sku}
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
                  {item.description}
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
                <span>💰 ${item.price}</span>
                <span>📦 {item.quantity}</span>
                <span>📂 {item.category}</span>
              </div>

              {/* Status and Quantity */}
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
                      item.status === "in_stock"
                        ? "#dcfce7"
                        : item.status === "low_stock"
                        ? "#fef3c7"
                        : item.status === "out_of_stock"
                        ? "#fecaca"
                        : "#f3f4f6",
                    color:
                      item.status === "in_stock"
                        ? "#166534"
                        : item.status === "low_stock"
                        ? "#92400e"
                        : item.status === "out_of_stock"
                        ? "#991b1b"
                        : "#374151",
                    borderColor:
                      item.status === "in_stock"
                        ? "#bbf7d0"
                        : item.status === "low_stock"
                        ? "#fde68a"
                        : item.status === "out_of_stock"
                        ? "#fca5a5"
                        : "#d1d5db",
                  }}
                >
                  {item.status.replace("_", " ")}
                </span>
                {item.quantity <= item.reorder_level && (
                  <span
                    style={{
                      fontWeight: "500",
                      color: "#dc2626",
                    }}
                  >
                    ⚠️ Reorder
                  </span>
                )}
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
                  Supplier: {item.supplier}
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
  const [showInventoryPanel, setShowInventoryPanel] = useState(true);

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
      add_item: (
        name: string,
        sku: string,
        price: number,
        quantity: number,
        category?: string,
        description?: string,
        supplier?: string,
        reorderLevel: number = 5
      ) => {
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

        if (category) {
          filteredItems = filteredItems.filter(
            (i) => i.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (status) {
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
    },
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
      {/* Left Side Inventory Panel */}
      {showInventoryPanel && (
        <InventoryPanel
          items={items}
          onCreateItem={handleCreateItem}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
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
