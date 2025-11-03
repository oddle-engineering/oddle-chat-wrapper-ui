# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced versioning system with semantic versioning
- Comprehensive changelog automation
- Version management scripts for different release types
- URL-based WebSocket ticket authentication system
- Comprehensive documentation for ticket authentication implementation

### Changed
- **BREAKING**: WebSocket authentication now uses ticket-in-URL instead of post-connection messages
- Improved security with connection-time authentication validation
- Simplified WebSocket connection flow - no authentication handshake required
- Updated API endpoints to use `/api/v1/` prefix instead of `/v1/api/`
- Enhanced markdown rendering with proper bold text styling
- Improved package.json with better scripts for version management

### Deprecated
- Nothing

### Removed
- Nothing

### Fixed
- Nothing

### Security
- Nothing

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