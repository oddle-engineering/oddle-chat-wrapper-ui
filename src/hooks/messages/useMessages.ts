import { useState, useCallback } from "react";
import { Message } from "../../types";
import { sanitizeMessage } from "../../utils/security";

/**
 * Hook for managing core message state and operations
 *
 * Responsibilities:
 * - Message array state
 * - Adding messages
 * - Updating messages
 * - Message ID generation
 */
export function useMessages() {
  // Default welcome message for new chat conversations
  // const defaultWelcomeMessage: Message = {
  //   id: "cmifwx1yf000gs601c50277uu",
  //   role: "assistant",
  //   content:
  //     'Absolutely! Below is a fully modular email template for boldly announcing your new menu item at Totto Ramen AUS, perfectly formatted for dashboard use with all copy and block settings included. Just update the image and details when your actual new menu item is ready to feature.\n\n---\n\n```json\n[\n  {\n    "type": "Header",\n    "props": {\n      "id": "Header-2",\n      "displayInfo": {\n        "brandLogo": { "show": true },\n        "brandName": { "show": true }\n      },\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      }\n    }\n  },\n  {\n    "type": "Title",\n    "props": {\n      "id": "Title-2",\n      "text": "🔥 Bold Flavours Await: Discover Our Newest Creation!",\n      "size": "h3",\n      "color": { "hex": "#3D0099" },\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      },\n      "fontFamily": "Arial"\n    }\n  },\n  {\n    "type": "Text",\n    "props": {\n      "id": "Text-3",\n      "text": {\n        "html": "Hi {{customer.firstName}},<br /><br /><b>The wait is over!</b> We\'re thrilled to unveil the newest star on Totto Ramen AUS\'s menu. Crafted with passion and bold flavours, this limited-time dish will take your ramen experience to the next level.<br /><br />Ready to ignite your taste buds? Scroll down to discover more!"\n      },\n      "size": "body1",\n      "color": { "hex": "#000000" },\n      "linkColor": { "hex": "#3D0099" },\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      },\n      "fontFamily": "Arial"\n    }\n  },\n  {\n    "type": "Image",\n    "props": {\n      "id": "Image-2",\n      "media": {\n        "url": "https://s3-ap-southeast-1.amazonaws.com/v3-beta.image.oddle.me/logo/pysQjgrro7afVnqTYoL_jBeFN8-DpcmBlNpg_ugqm0c=.jpg"\n      },\n      "altText": "Exciting New Ramen Dish at Totto Ramen AUS",\n      "size": { "scale": 80 },\n      "margin": { "edgeToEdge": false },\n      "borderRadius": "rounded",\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      }\n    }\n  },\n  {\n    "type": "Divider",\n    "props": {\n      "id": "Divider-2",\n      "style": "solid",\n      "thickness": "4px",\n      "length": "large",\n      "color": { "hex": "#3D0099" },\n      "blockSettings": { "backgroundColor": { "hex": null } }\n    }\n  },\n  {\n    "type": "Title",\n    "props": {\n      "id": "Title-3",\n      "text": "✨ New Menu Item Unveiled!",\n      "size": "h4",\n      "color": { "hex": "#3D0099" },\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      },\n      "fontFamily": "Arial"\n    }\n  },\n  {\n    "type": "Text",\n    "props": {\n      "id": "Text-4",\n      "text": {\n        "html": "Dive into our chef\'s latest masterpiece, <b>exclusive for our beloved ramen lovers!</b> Bursting with unique flavours and top-tier ingredients, this new menu item adds a bold twist to your dining experience. Available now for dine-in, takeaway, and delivery."\n      },\n      "size": "body2",\n      "color": { "hex": "#000000" },\n      "linkColor": { "hex": "#3D0099" },\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      },\n      "fontFamily": "Arial"\n    }\n  },\n  {\n    "type": "Button",\n    "props": {\n      "id": "Button-2",\n      "text": "Order the New Dish Now",\n      "url": { "value": "https://tottoramenau.com" },\n      "textColor": { "hex": "#ffffff" },\n      "backgroundColor": { "hex": "#3D0099" },\n      "variant": "contained",\n      "radius": "rounded",\n      "size": "large",\n      "width": "auto",\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      }\n    }\n  },\n  {\n    "type": "Spacer",\n    "props": { "id": "Spacer-2", "height": "medium" }\n  },\n  {\n    "type": "PersonalSignOff",\n    "props": {\n      "id": "SignOff-2",\n      "one": { "text": "Hungry for more?", "size": "body2", "color": { "hex": "#3D0099" } },\n      "two": { "text": "The Totto Ramen AUS Team", "size": "body2", "color": "#3D0099" },\n      "displayInfo": { "one": { "show": true }, "two": { "show": true } },\n      "blockSettings": {\n        "backgroundColor": { "hex": null },\n        "contentAlignment": { "option": "center" }\n      }\n    }\n  },\n  {\n    "type": "Footer",\n    "props": {\n      "id": "Footer-2",\n      "text": {\n        "html": "<b>Totto Ramen AUS</b><br />best ramen<br />Thank you for choosing Totto Ramen.<br />For more details, visit our <a href=\'https://tottoramenau.com\'>website</a>."\n      },\n      "socialLinksSettings": {\n        "facebook": { "show": false },\n        "whatsapp": { "show": false },\n        "line": { "show": false },\n        "tiktok": { "show": false },\n        "website": { "show": true }\n      },\n      "color": { "hex": "#3D0099" },\n      "displayInfo": {\n        "brandLogo": { "show": true },\n        "brandName": { "show": true },\n        "contents": true,\n        "socialLinks": true\n      },\n      "blockSettings": {\n        "dividerColor": { "hex": "#3D0099" },\n        "backgroundColor": { "hex": "#F4F6F8" }\n      }\n    }\n  }\n]\n```\n\n**How to use:**  \n- Replace the image URL and related text with your actual new menu item when available.\n- Paste into your modular email builder for an instantly bold and visually stunning campaign.\n\nLet me know if you want this to feature a real menu image, more details, or unique promo fields!',
  //   timestamp: new Date("2025-11-26T11:19:34.674Z"),
  //   isStreaming: false,
  // };

  const [messages, setMessages] = useState<Message[]>([]);

  // Generate unique message ID
  const generateId = useCallback(
    () => Math.random().toString(36).substring(2) + Date.now().toString(36),
    []
  );

  // Add a new message to the chat
  const addMessage = useCallback(
    (role: Message["role"], content: string) => {
      const isAssistant = role === "assistant";
      const sanitizedContent = sanitizeMessage(content, isAssistant);

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role,
          content: sanitizedContent,
          timestamp: new Date(),
        },
      ]);
    },
    [generateId]
  );

  // Update an existing message
  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  }, []);

  // Update message content specifically
  const updateMessageContent = useCallback(
    (id: string, content: string, isStreaming?: boolean) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                content,
                isStreaming,
              }
            : msg
        )
      );
    },
    []
  );

  return {
    messages,
    setMessages,
    addMessage,
    updateMessage,
    updateMessageContent,
    generateId,
  };
}
