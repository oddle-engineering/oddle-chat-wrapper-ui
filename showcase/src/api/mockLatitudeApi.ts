// Mock implementation of the Latitude SDK endpoint
// This simulates the behavior of your Next.js API route

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface Brief {
  id: string;
  title: string;
  markdown: string;
  created_at: string;
  word_count: number;
  character_count: number;
  media?: string[];
}

interface MockLatitudeState {
  conversations: Map<string, any>;
  todos: Todo[];
  briefs: Brief[];
}

class MockLatitudeAPI {
  private state: MockLatitudeState = {
    conversations: new Map(),
    todos: [],
    briefs: []
  };

  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Middle Child Bar brand data (used in response generation)
  private defaultBrandInfo = {
    name: "Middle Child Bar",
    locale: "en_SG",
    website: "https://www.middlechild.party/",
    meta_data: {
      slogans: [
        "Often overlooked but never unloved.",
        "That's Middle Child: messy, fun, and full of heart.",
      ],
      brand_images: [
        "https://images.squarespace-cdn.com/content/v1/663dcd9202d167528aac2c5d/84f27b5e-39fb-4030-9dd1-67446f82e960/Middle+Child+Wine+Bar+3.jpg",
        "https://images.squarespace-cdn.com/content/v1/663dcd9202d167528aac2c5d/c630bab2-66ef-4fc2-afd9-7a4ae234aa0f/IMG_4608.jpg",
        "https://images.squarespace-cdn.com/content/v1/663dcd9202d167528aac2c5d/85cc12be-948f-4b58-ac4f-8cc6b20ead79/WhatsApp+Image+2025-07-24+at+17.45.35+%282%29.jpeg",
      ],
      menu_summary: "The menu is rooted in South-East Asian grilling traditions, serving up bold-flavoured lunch plates (until 4pm), tapas-style appetisers, skewers, and hearty mains from the grill. Vegetarian options and playful desserts round out the selection, accompanied by a curated list of natural wines, craft beers, and cocktails.",
      brand_history: "Opened in 2024 in Bugis, Singapore, Middle Child Bar quickly became known for its South-East Asian grill concept and playful, heart-filled approach to hospitality.",
      signature_dishes: [
        "Grilled Chicken Thigh: Boneless thigh glazed with kicap manis and served with spicy garlic chilli oil.",
        "Pork Belly Skewers: Thai red curry-marinated belly with balsamic BBQ.",
        "Braised Beef Short Rib: 300g USDA bone-in short rib, slow-cooked and finished over charcoal with red curry and pickled onions.",
        "Fried Baby Back Pork Ribs: Orange and soy braised ribs tossed in sticky scallion sauce.",
        "Grilled Octopus Leg: Served with cherry tomato & mango salsa, confit lemon, and toasted coconut powder.",
      ],
      ambience_and_experience: "The space is creative and casual with an energetic, playful vibe. Designed for people who enjoy good tunes, flowing drinks, and food designed for sharing.",
      identity_and_philosophy: "Middle Child Bar is 'messy, fun, and full of heart.' The brand's ethos revolves around bold flavours, sharing plates, good company, and a playful, punchy atmosphere.",
    },
    description: "Middle Child Bar is a South-East Asian inspired grill house in the heart of Bugis, Singapore. The venue is lively and playful, offering bold flavours, natural wines, craft beers, and cocktails.",
    cuisine_tags: ["Bar", "Asian fusion", "Grill"],
    social_links: {
      email: "admin@middlechild.party",
      facebook: "https://www.facebook.com/middlechildbar/",
      instagram: "https://www.instagram.com/middlechild.party/?hl=en",
    },
  };

  // Mock tools that simulate the Latitude SDK tools
  private createMockTools(controller: ReadableStreamDefaultController, encoder: TextEncoder) {
    return {
      create_to_do: async (args: { title: string; description: string }) => {
        console.log("Mock: Creating to-do:", args);
        await this.delay(300);
        
        const todoId = this.generateId();
        const newTodo: Todo = {
          id: todoId,
          title: args.title,
          description: args.description,
          created_at: new Date().toISOString(),
          status: "pending",
        };

        this.state.todos.push(newTodo);

        // Send tool result event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "tool-result",
              tool: "create_to_do",
              data: newTodo,
              todos: this.state.todos,
            })}\n\n`
          )
        );

        return newTodo;
      },

      read_to_dos: async () => {
        console.log("Mock: Reading to-dos, current count:", this.state.todos.length);
        await this.delay(200);

        const todoData = {
          todos: this.state.todos,
          count: this.state.todos.length,
          pending: this.state.todos.filter((t) => t.status === "pending").length,
          completed: this.state.todos.filter((t) => t.status === "completed").length,
        };

        // Send tool result event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "tool-result",
              tool: "read_to_dos",
              data: todoData,
              todos: this.state.todos,
            })}\n\n`
          )
        );

        return todoData;
      },

      create_brief: async (args: { title: string; markdown: string }) => {
        console.log("Mock: Creating brief:", args);
        await this.delay(500);

        const briefId = this.generateId();
        const briefData: Brief = {
          id: briefId,
          title: args.title,
          markdown: args.markdown,
          created_at: new Date().toISOString(),
          word_count: args.markdown.split(/\s+/).length,
          character_count: args.markdown.length,
        };

        this.state.briefs.push(briefData);

        // Send tool result event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "tool-result",
              tool: "create_brief",
              data: briefData,
              briefs: this.state.briefs,
            })}\n\n`
          )
        );

        return briefData;
      },

      read_briefs: async () => {
        console.log("Mock: Reading briefs, current count:", this.state.briefs.length);
        await this.delay(200);

        const briefData = {
          briefs: this.state.briefs,
          count: this.state.briefs.length,
          total_words: this.state.briefs.reduce((sum, brief) => sum + brief.word_count, 0),
        };

        // Send tool result event
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "tool-result",
              tool: "read_briefs",
              data: briefData,
              briefs: this.state.briefs,
            })}\n\n`
          )
        );

        return briefData;
      },
    };
  }

  // Generate mock AI responses based on user input
  private generateMockResponse(userInput: string): string {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('brief') || lowerInput.includes('plan') || lowerInput.includes('strategy')) {
      return this.generateBriefPlannerResponse(userInput);
    } else if (lowerInput.includes('todo') || lowerInput.includes('task')) {
      return this.generateTodoResponse(userInput);
    } else if (lowerInput.includes('middle child') || lowerInput.includes('bar') || lowerInput.includes('restaurant')) {
      return this.generateMiddleChildResponse(userInput);
    } else {
      return this.generateGeneralResponse(userInput);
    }
  }

  private generateBriefPlannerResponse(userInput: string): string {
    return `# Brief Planning Response

Thank you for your request: "${userInput}"

As your Middle Child Bar Brief Planner, I'm here to help you create comprehensive marketing briefs and strategic planning documents. Let me analyze your request and create some actionable items.

## Analysis

Based on your input, I can help you with:
- Marketing strategy development
- Content planning for Middle Child Bar
- Campaign brief creation
- Brand positioning documents

## Next Steps

I'll create some todos and a detailed brief for you. Let me start by organizing the tasks we need to accomplish.

*[AI is now using tools to create todos and briefs...]*`;
  }

  private generateTodoResponse(userInput: string): string {
    return `# Task Management

I understand you want to work with todos and tasks. Let me help you organize and manage your action items effectively.

Your request: "${userInput}"

I can help you:
- Create new todos with clear descriptions
- Read and organize existing tasks
- Track progress on your Middle Child Bar projects

Let me create some relevant todos based on your request.

*[Creating todos for you...]*`;
  }

  private generateMiddleChildResponse(userInput: string): string {
    const brand = this.defaultBrandInfo;
    return `# Middle Child Bar Assistant

Hello! I'm your dedicated assistant for ${brand.name} - that's right, we're "often overlooked but never unloved" and absolutely "messy, fun, and full of heart."

You asked: "${userInput}"

## About ${brand.name}

We're a South-East Asian inspired grill house in the heart of Bugis, Singapore. Our space is all about:
- Bold flavours and sharing plates
- Natural wines, craft beers, and creative cocktails  
- Good tunes, art, and lively crowds
- That perfectly imperfect middle child energy

Our signature dishes include:
${brand.meta_data.signature_dishes.slice(0, 3).map(dish => `- ${dish}`).join('\n')}

## How I Can Help

I can assist you with:
- Creating marketing briefs for our brand
- Planning promotional campaigns
- Organizing tasks and project management
- Developing content that captures our playful spirit

Let me create some actionable items for you!

*[Using tools to help organize your Middle Child Bar projects...]*`;
  }

  private generateGeneralResponse(userInput: string): string {
    return `# AI Assistant Response

Thank you for your message: "${userInput}"

I'm here to help you with planning, organization, and creating comprehensive briefs. As an AI assistant powered by the Latitude platform, I can:

## My Capabilities
- Create and manage todos for project organization
- Generate detailed briefs and planning documents  
- Assist with Middle Child Bar brand-related tasks
- Provide strategic insights and recommendations

## What's Next?

Based on your input, let me create some relevant todos and potentially a brief to help move your project forward.

*[AI is processing your request and using available tools...]*`;
  }

  // Simulate the streaming response with realistic delays and tool usage
  async streamResponse(
    userInput: string,
    conversationUuid: string | null,
    todos: Todo[],
    briefs: Brief[],
    controller: ReadableStreamDefaultController,
    encoder: TextEncoder
  ) {
    try {
      // Initialize state with provided data
      this.state.todos = todos || [];
      this.state.briefs = briefs || [];
      
      const tools = this.createMockTools(controller, encoder);

      // Send chain started event
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "event",
            event: "latitude-event",
            data: { type: "chain-started" }
          })}\n\n`
        )
      );

      await this.delay(300);

      // Send step started event
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "event",
            event: "latitude-event", 
            data: { type: "step-started" }
          })}\n\n`
        )
      );

      await this.delay(500);

      // Generate the main response
      const response = this.generateMockResponse(userInput);
      
      // Stream the text response word by word
      const words = response.split(' ');
      for (let i = 0; i < words.length; i++) {
        const word = i === 0 ? words[i] : ' ' + words[i];
        
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "event",
              event: "provider-event",
              data: {
                type: "text-delta",
                textDelta: word
              }
            })}\n\n`
          )
        );
        
        await this.delay(30 + Math.random() * 70);
      }

      await this.delay(800);

      // Simulate tool usage based on user input
      const lowerInput = userInput.toLowerCase();
      
      if (lowerInput.includes('todo') || lowerInput.includes('task') || lowerInput.includes('organize')) {
        // Create some todos
        await tools.create_to_do({
          title: "Plan Middle Child Bar Campaign",
          description: "Develop a comprehensive marketing campaign for the upcoming season"
        });
        
        await this.delay(400);
        
        await tools.create_to_do({
          title: "Review Menu Descriptions", 
          description: "Update menu descriptions to highlight signature dishes and ingredients"
        });
        
        await tools.read_to_dos();
      }

      if (lowerInput.includes('brief') || lowerInput.includes('plan') || lowerInput.includes('strategy')) {
        // Create a brief
        const briefMarkdown = `# Middle Child Bar Marketing Brief

## Overview
This brief outlines the strategic approach for Middle Child Bar's upcoming marketing initiatives.

## Brand Positioning
- **Personality**: Messy, fun, and full of heart
- **Target**: Food lovers who appreciate bold South-East Asian flavors
- **Experience**: Sharing plates, good company, lively atmosphere

## Key Messages
1. "Often overlooked but never unloved" - embracing the middle child spirit
2. Bold flavors from the South-East Asian grill tradition
3. Perfect for after-work drinks and casual dinners

## Recommended Actions
- Highlight signature dishes in social media content
- Emphasize the sharing plates concept
- Showcase the lively, artistic atmosphere
- Feature natural wines and craft beer selection

## Success Metrics
- Increased foot traffic during peak hours
- Higher engagement on social media posts
- Positive customer feedback on new menu items`;

        await tools.create_brief({
          title: "Middle Child Bar Marketing Strategy",
          markdown: briefMarkdown
        });
        
        await tools.read_briefs();
      }

      // Send provider completed event
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "event",
            event: "latitude-event",
            data: { 
              type: "provider-completed",
              response: { text: response }
            }
          })}\n\n`
        )
      );

      await this.delay(200);

      // Generate or use conversation UUID
      const uuid = conversationUuid || this.generateId();
      
      // Send chain completed event  
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "event",
            event: "latitude-event",
            data: { 
              type: "chain-completed",
              uuid: uuid
            }
          })}\n\n`
        )
      );

      // Send final completion
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "finished",
            uuid: uuid,
            result: {
              response: { text: response },
              uuid: uuid
            }
          })}\n\n`
        )
      );

    } catch (error) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: "stream-error",
            error: error instanceof Error ? error.message : "Unknown error"
          })}\n\n`
        )
      );
    }
  }

  // Main handler that simulates the Next.js API route
  async handleBriefPlannerRequest(requestData: any): Promise<Response> {
    const { messages, promptPath: _promptPath, conversationUuid, todos, briefs, media } = requestData;

    console.log("Mock Latitude API: Starting streaming request...");
    console.log("Conversation UUID:", conversationUuid);

    // Get the last user message
    const userMessages = messages.filter((msg: any) => msg.role === "user");
    const userInput = userMessages[userMessages.length - 1]?.content || "";

    console.log("Mock processing request:", {
      hasConversationUuid: !!conversationUuid,
      userInput,
      messagesCount: messages.length,
      mediaCount: Array.isArray(media) ? media.length : 0,
    });

    // Create a readable stream for SSE
    const stream = new ReadableStream({
      start: async (controller) => {
        const encoder = new TextEncoder();
        
        try {
          await this.streamResponse(
            userInput,
            conversationUuid,
            todos,
            briefs,
            controller,
            encoder
          );
        } catch (error) {
          console.error("Mock API streaming error:", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                error: error instanceof Error ? error.message : "Unknown error",
              })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", 
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

export const mockLatitudeAPI = new MockLatitudeAPI();