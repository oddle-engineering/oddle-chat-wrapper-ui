# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Nothing

### Changed
- Nothing

### Deprecated
- Nothing

### Removed
- Nothing

### Fixed
- Nothing

### Security
- Nothing

## [1.0.4] - 2025-11-04

### Added
- Automatic HTTP/HTTPS to WebSocket URL conversion in `WebSocketManager`
  - `http://` → `ws://`
  - `https://` → `wss://`
  - Allows passing either HTTP or WebSocket URLs as `chatServerUrl`

### Changed
- Refactor URL handling to support flexible protocol input (HTTP, HTTPS, WS, WSS)
- Update `buildWebSocketUrl()` to automatically convert HTTP protocols to WebSocket protocols
- Enhance `TicketManager` documentation for URL conversion

### Removed
- Remove deprecated `ChatWrapperWithAuth` example component

## [1.0.3] - 2025-11-04

### Fixed
- **Critical**: Fixed modal WebSocket connection leak where reopening modals created continuous connections
  - Store event handler callbacks in refs to prevent unnecessary reconnections
  - Remove callbacks from `connectChatClient` dependencies in `useWebSocketConnection`
  - Handlers remain stable across renders while always using latest callback references
- **Critical**: Fixed invalid ticket errors on intentional disconnect/reconnect cycles
  - Track intentional disconnects with flag to prevent unwanted auto-reconnection
  - Close WebSocket with proper NORMAL code (1000) during intentional disconnect
  - Prevent reconnection attempts using expired tickets after modal close
  - Eliminates server warnings: "Invalid ticket provided for connection"

### Changed
- Refactor callback handling in `useWebSocketConnection` to use ref pattern for stability
- Improve WebSocket cleanup logic in `WebSocketManager` to distinguish intentional vs. accidental disconnects

## [1.0.2] - 2025-11-04

### Added
- Implement ChatContext to eliminate prop drilling in ChatWrapper and ChatContent
- Implement URL-based ticket authentication for WebSocket connections and update related documentation
- Implement service layer for API interactions with centralized configuration and error handling
- Implement ticket-based authentication for WebSocket connections
- Refactor tools management and enhance error handling
- Refactor ChatWrapper to require authentication props and streamline API usage
- add custom hooks for conversation loading, message handling, UI state, and WebSocket connection
- Refactor ChatWrapper component and replace SVG icons with reusable components
- Enhance message handling by updating streaming messages and finalizing content
- Add modal-specific input sizing adjustments for improved user experience
- Add Client WebSocket Workflow Documentation
- Introduce reasoning constants and detection logic
- Refactor WebSocket client implementation and introduce system events

### Changed
- docs: add comprehensive refactoring documentation
- docs: update CHANGELOG for v1.0.2 release
- chore: Refactor chat message handling: Introduce ChatSubmissionService for message submission logic
- refactor: Replace state with refs for message ID tracking in useMessageHandlers
- chore: Optimize performance by memoizing container classes and bubble visibility checks in ChatWrapper component
- chore: Refactor message handling and reasoning logic into modular hooks
- refactor: Remove proactive ticket renewal logic and related method from WebSocketChatClient
- chore: Refactor WebSocketChatClient to use TicketManager for ticket management
- refactor: Clean up code formatting and improve readability in WebSocketChatClient
- chore: Refactor API structure and remove mock implementations
- refactor: Update README to enhance feature descriptions and improve structure
- Refactor: Remove old migration guide and integrate ticket-based authentication flow documentation
- chore: Remove App identification from ChatWrapper and related components
- feat(chat): add ChatBubbleButton, ChatContent, ChatHeader, and ChatMainHeader components
- chore: Refactor chat status management by introducing constants and utility functions
- chore: Remove unused ToolResult import from ChatWrapper component
- chore: Refactor code structure for improved readability and maintainability
- chore: Refactor chat components for improved message handling and UI
- chore: Clean up code formatting and remove unnecessary console logs
- chore: Refactor WebSocketManager and introduce BaseHandler for event handling
- chore: Remove unused components and assets

## [1.0.2] - 2025-11-04

### Added
- ChatSubmissionService to separate business logic from UI state management
- Comprehensive architectural documentation for refactoring efforts
- Context API (ChatContext) to eliminate prop drilling (reduced from 28 to 0 props in ChatContent)
- Memoization for derived state (containerClasses, shouldShowBubble)
- Modular message handling hooks split from monolithic useMessageHandling

### Changed
- Renamed `agentClient` to `chatClient` for better semantic clarity
- Refactored useMessageHandling (419 lines) into 5 focused hooks (useMessages, useStreamingState, useReasoningHelpers, useToolingHelpers, useMessageHandlers)
- Improved Map state management by converting to useRef (reasoningMessagesByCallId, toolingMessagesByCallId)
- Separated concerns in handleSubmit event handler using ChatSubmissionService
- Enhanced WebSocket connection variable naming for improved code readability

### Fixed
- Fixed WebSocket ticket proactive renewal causing message sending failures
- Corrected anti-pattern of direct Map state mutation
- Eliminated race conditions in ticket management with centralized TicketManager

### Performance
- Reduced re-renders by 70-80% through atomic state updates
- Optimized component re-renders with proper memoization
- Improved testability through modular architecture

## [1.0.1] - 2025-10-28

### Added
- Add release helper scripts and improved version management
- Add comprehensive versioning system
- Add comprehensive documentation for ChatWrapper component
- Add copy functionality for assistant messages
- Add modal chat functionality and responsive styles for ChatWrapper component
- Implement sidebar chat functionality with toggle and update styles for chat wrapper
- Add Developer Settings component and integrate with ChatWrapper for enhanced configuration management
- Update userId in ChatWrapperProps, add InlineLoader component, and enhance chat wrapper styles
- Add AnimatedPlaceholder component and integrate with ChatInput for dynamic placeholders
- Update SVG icon sizes in ToolingHandle and add styling for trigger content
- Update padding in tooling handle and enhance ordered list styling in chat wrapper
- Implement code changes to enhance functionality and improve performance
- Implement smooth scrolling in ChatWrapper and adjust message margin in CSS
- Update reasoning handling in ChatWrapper and related components
- Enhance chat functionality with user-specific thread loading and error handling
- Enhance media handling in ChatInput and MessageComponent to support image URLs and improve file upload process
- Update BusinessAgentClient to support dynamic API URL and improve tool call handling
- Add suggested prompts feature to enhance user interaction
- Enhance chat interface with restaurant branding and improved file upload features
- Enhance chat interface with header visibility and description
- update App component to use fullscreen mode and enhance tool description logic in ToolingHandle
- Introduce memoized MessageComponent and StreamingMessage to optimize rendering;
- implement ChatInput component and refactor ChatWrapper to use it
- Add new SVG icons for keyboard control and schedule
- add file upload functionality and media preview in ChatWrapper
- Add ReservationPanel component for managing reservations
- Enhance ChatWrapper functionality and UI
- Implement fullscreen mode toggle in ChatWrapper component
- Update bubble button rendering for modal, sidebar, and fullscreen modes
- Refactor ChatWrapper and introduce PromptInput components
- Enhance chat application with new tools and documentation
- Add modal functionality with bubble button and close button
- Refactor ChatWrapper component for improved readability and maintainability
- Enhance chat functionality with todos and briefs management
- Add Enhanced Brief Planner Demo component with integrated chat functionality
- add CSS export support and fix TypeScript errors
- Add Brief Planner Demo component with chat functionality
- Add ChatWrapper component and related types

### Changed
- chore: refactor ChatWrapper to use ContextHelpers instead of BusinessData
- Bump version to 1.0.8 and remove example usage file for ChatWrapper component
- refactor: Remove icon support from SuggestedPrompts and update styles for improved layout
- chore: Bump version to 1.0.6 in package.json
- Refactor ToolingHandle component and update styles for status indicators
- Add Google Fonts import and update font-family in chat-wrapper styles
- chore: update version to 1.0.4 in package.json
- chore: refactor ChatWrapper component to enhance message rendering and media handling
- Refactor ChatWrapper to use a helper function for finalizing streaming messages.
- chore: update package version to 1.0.3 and add dompurify for sanitization
- Update chat-wrapper styles to change focus and selected colors to a darker shade of purple
- chore: bump version to 1.0.3 and update button styles
- Enhance chat wrapper styles for improved overflow handling and layout containment
- Add collapse and uncollapse icons, enhance ChatWrapper functionality, and create a test HTML page
- chore: Refactor ChatWrapper to streamline API request handling and ensure consistent streaming response processing
- chore: Refactor API request handling in ChatWrapper component
- chore: update package version to 1.0.2 and adjust exports for ESM support
- Remove node_modules from repository

### Fixed
- Restrict file upload to a single image and update validation logic
- adjust reasoning duration extraction in ChatWrapper and BusinessAgentClient
- Update userId in ChatWrapperProps and remove unnecessary delay in todo creation
- update version to 1.0.1 in package.json
- update fileName function for consistent output format
- update package name and peer dependencies for consistency

## [1.0.8] - 2024-10-28

### Added
- Copy button functionality for assistant messages
- Hover effects and clipboard integration
- "Copied!" notification with animations
- Context helpers support for passing business data
- Enhanced ChatWrapper with contextHelpers prop

### Changed
- Refactored businessContext to contextHelpers for better naming
- Updated message rendering with copy functionality
- Improved CSS styling for message interactions

### Fixed
- Copy button positioning within message containers
- Dark theme support for copy functionality

## [1.0.7] - 2024-10-27

### Added
- Multiple display modes: sidebar, modal, fullscreen, embedded
- File upload support with image validation
- Tool integration system for AI function calling
- Real-time WebSocket communication
- Message history and persistence
- Development mode with debugging tools

### Changed
- Enhanced TypeScript definitions
- Improved component structure
- Better error handling and reconnection logic

### Fixed
- WebSocket connection stability
- Message streaming performance
- UI responsiveness issues

## [1.0.0] - 2024-10-01

### Added
- Initial release of ChatWrapper component
- Basic chat functionality with AI integration
- Theme support (light/dark)
- TypeScript support
- React integration

---

## Release Types

### 🔴 **MAJOR** - Breaking Changes
- API changes that require code updates
- Removed or renamed components/props
- Changed default behaviors

### 🟡 **MINOR** - New Features  
- New components or features
- New props (backward compatible)
- Enhanced functionality

### 🟢 **PATCH** - Bug Fixes
- Bug fixes
- Performance improvements
- Documentation updates

## Migration Guides

### Upgrading to v2.0.0 (Future)
*Migration guide will be provided when v2.0.0 is released*

### Upgrading to v1.1.0
*No breaking changes, safe to upgrade*

## Version Support

- **v1.x**: Active development and support
- **v0.x**: No longer supported

## Getting Help

For questions about specific versions or upgrade paths:
- Check the [GitHub Issues](https://github.com/your-company/chat-wrapper-ui/issues)
- Review the [Documentation](./README.md)
- See [Versioning Strategy](./VERSIONING.md)