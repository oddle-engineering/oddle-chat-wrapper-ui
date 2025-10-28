# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced versioning system with semantic versioning
- Comprehensive changelog automation
- Version management scripts for different release types

### Changed
- Improved package.json with better scripts for version management

### Deprecated
- Nothing

### Removed
- Nothing

### Fixed
- Nothing

### Security
- Nothing

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