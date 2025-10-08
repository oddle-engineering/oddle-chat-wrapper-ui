# Chat Wrapper UI Showcase

## 🚀 Quick Start

Get the showcase running in under 1 minute:

```bash
# Clone and navigate to the repository
git clone <your-repo-url>
cd oddle-wrapper-chat-ui

# Option 1: Automated setup
./setup-showcase.sh

# Option 2: Manual setup
npm run showcase:install
npm run showcase

# Option 3: Step by step
cd showcase
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to see the showcase.

## 🎯 What You Can Test

### 1. Display Modes
- **Sidebar** - Chat positioned on left/right side
- **Modal** - Centered overlay dialog
- **Fullscreen** - Takes over entire screen
- **Embedded** - Fits within existing layouts

### 2. Themes
- **Light** - Clean, bright interface
- **Dark** - Modern dark mode
- **Auto** - Follows system preference

### 3. Interactive Features
- Real-time configuration changes
- Mock API with streaming responses
- Responsive design testing
- Custom styling options

### 4. Configuration Panel
Adjust settings on the fly:
- Mode selection
- Theme switching
- Position options (for sidebar)
- App name customization
- Placeholder text changes

## 🤖 Mock API

The showcase includes a realistic mock API that simulates:

- Conversation initialization
- Streaming message responses
- Realistic typing delays
- Error handling scenarios

No backend required - everything works locally!

## 📱 Testing Different Scenarios

### Customer Support Chat
```tsx
<ChatWrapper
  apiUrl="https://your-api.com"
  config={{
    mode: "sidebar",
    position: "right",
    appName: "Customer Support",
    theme: "light",
    placeholder: "How can we help you today?"
  }}
/>
```

### AI Assistant Modal
```tsx
<ChatWrapper
  apiUrl="https://your-api.com"
  config={{
    mode: "modal",
    appName: "AI Assistant",
    theme: "dark",
    placeholder: "Ask me anything..."
  }}
/>
```

### Help Center Widget
```tsx
<ChatWrapper
  apiUrl="https://your-api.com"
  config={{
    mode: "embedded",
    appName: "Help Center",
    theme: "auto",
    features: {
      fileUpload: true,
      messageHistory: true
    }
  }}
/>
```

## 🛠 Development Tips

### Testing Your API
Replace the mock API URL with your real endpoint:

```tsx
// In showcase/src/App.tsx
const chatProps: ChatWrapperProps = {
  apiUrl: 'https://your-real-api.com', // <- Change this
  config: {
    // your config
  }
};
```

### Custom Styling
Test custom styles in the configuration panel:

```tsx
config: {
  customStyles: {
    fontFamily: 'Inter, sans-serif',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }
}
```

### Error Handling
Test error scenarios by:
1. Modifying the mock API to return errors
2. Testing with invalid API URLs
3. Simulating network failures

## 🔧 Customization

### Adding New Demo Configurations
Edit `showcase/src/App.tsx` to add new demo scenarios:

```tsx
const demos = [
  // existing demos...
  {
    id: 'your-demo',
    title: 'Your Custom Demo',
    description: 'Description of your demo',
    config: {
      mode: 'sidebar',
      appName: 'Your App',
      // ... your config
    }
  }
];
```

### Modifying Mock Responses
Edit `showcase/src/api/mockApi.ts` to customize mock responses:

```tsx
const responses = [
  "Your custom response...",
  "Another response...",
  // Add more responses
];
```

## 📦 Production Build

Build the showcase for deployment:

```bash
cd showcase
npm run build
npm run preview  # Test production build
```

The built files will be in `showcase/dist/`.

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is occupied:
```bash
cd showcase
npx vite --port 3001
```

### Build Errors
Ensure the main package is built first:
```bash
npm run build  # Build main package
cd showcase
npm run build  # Build showcase
```

### TypeScript Errors
Check that all dependencies are installed:
```bash
npm install          # Main package
cd showcase
npm install          # Showcase
```

## 🌟 Features Showcase

The demo application demonstrates:

- ✅ Pure CSS implementation (no external UI libraries)
- ✅ Configurable API endpoints
- ✅ Multiple display modes
- ✅ Theme system
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Mock API integration
- ✅ Real-time configuration
- ✅ Custom styling
- ✅ Error handling

Perfect for testing before integrating into your own applications!