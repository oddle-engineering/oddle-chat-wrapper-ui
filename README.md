# Chat Wrapper UI

Reusable chat interface component for company projects.

## Installation

```bash
npm install @your-company/chat-wrapper-ui
```

## Usage

```tsx
import { ChatWrapper } from '@your-company/chat-wrapper-ui';

function App() {
  return (
    <ChatWrapper
      mode="sidebar"
      position="right"
      appName="My App"
      apiEndpoint="https://your-api.com"
      theme="light"
    />
  );
}
```

## Configuration

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| mode | 'sidebar' \| 'fullscreen' \| 'modal' \| 'embedded' | Yes | Display mode |
| appName | string | Yes | Application name |
| apiEndpoint | string | Yes | Backend API URL |
| position | 'left' \| 'right' | No | Sidebar position |
| theme | 'light' \| 'dark' \| 'auto' | No | Color theme |
| apiKey | string | No | API authentication key |

## Development

```bash
npm run dev      # Start development
npm run build    # Build package
npm publish      # Publish to registry
```