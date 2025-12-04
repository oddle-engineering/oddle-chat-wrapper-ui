# Chat Wrapper UI Showcase

Interactive demo application for testing the Chat Wrapper UI component.

## Features

- 🎨 **Live Configuration** - Adjust settings in real-time
- 🎭 **Multiple Modes** - Test sidebar, modal, fullscreen, and embedded modes
- 🌙 **Theme Switching** - Compare light, dark, and auto themes
- 🤖 **Mock API** - Built-in mock chat API for testing
- 📱 **Responsive** - Test on different screen sizes

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Demo Modes

### Sidebar Chat
- Positioned on the left or right side
- Perfect for customer support
- Configurable position

### Modal Chat
- Centered overlay dialog
- Great for focused conversations
- Includes backdrop overlay

### Fullscreen Chat
- Takes over the entire screen
- Immersive chat experience
- Ideal for complex interactions

### Embedded Chat
- Fits within existing layouts
- Highly customizable
- No positioning constraints

## Custom Configuration

Use the configuration panel to:

- Change display modes
- Switch between themes
- Adjust positioning
- Customize app name and placeholder text
- Test different combinations

## Mock API

The showcase includes a realistic mock API that:

- Simulates conversation initialization
- Provides streaming responses
- Includes realistic delays
- Demonstrates error handling

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Testing the Component

This showcase demonstrates how to:

1. Import and use the ChatWrapper component
2. Configure different modes and themes
3. Handle API responses and errors
4. Implement custom styling
5. Integrate with existing applications

## API Integration

The component expects your API to support:

- **POST** `/api/conversation/init` - Initialize conversation
- **POST** `/api/conversation/{id}` - Send message (SSE response)

See the mock API implementation in `src/api/mockApi.ts` for reference.