# 🏷️ Versioning Strategy

## Semantic Versioning (SemVer)

This project follows [Semantic Versioning](https://semver.org/) with the format: `MAJOR.MINOR.PATCH`

### Version Format: `X.Y.Z`

- **MAJOR** (X): Breaking changes that require consumer code updates
- **MINOR** (Y): New features that are backward compatible  
- **PATCH** (Z): Bug fixes and improvements that are backward compatible

### Examples

```
1.0.0 → 1.0.1  # Bug fix (patch)
1.0.1 → 1.1.0  # New feature (minor)
1.1.0 → 2.0.0  # Breaking change (major)
```

## Release Types

### 🔴 **MAJOR** - Breaking Changes
- Changed component prop interfaces
- Removed or renamed components
- Changed default behavior
- Updated minimum React/Node version requirements
- Changed CSS class names or structure

**Example:**
```typescript
// v1.x.x
<ChatWrapper mode="sidebar" />

// v2.0.0 - Breaking change
<ChatWrapper config={{ mode: "sidebar" }} />
```

### 🟡 **MINOR** - New Features
- Added new components
- Added new props (with defaults)
- Added new hooks or utilities
- Enhanced existing functionality without breaking changes
- New display modes or themes

**Example:**
```typescript
// v1.1.0 - Added new prop
<ChatWrapper 
  mode="sidebar" 
  contextHelpers={...} // New optional prop
/>
```

### 🟢 **PATCH** - Bug Fixes
- Fixed bugs without changing API
- Performance improvements
- Documentation updates
- Internal refactoring
- Dependency updates (non-breaking)

## Pre-release Versions

### Development Versions
- `1.2.0-alpha.1` - Early development, unstable
- `1.2.0-beta.1` - Feature complete, testing phase
- `1.2.0-rc.1` - Release candidate, production ready

### Usage
```bash
# Install specific pre-release
npm install @oddle/chat-wrapper-ui@1.2.0-beta.1

# Install latest pre-release
npm install @oddle/chat-wrapper-ui@beta
```

## Version Tags

### Git Tags
- `v1.0.0` - Stable release
- `v1.2.0-beta.1` - Pre-release
- `latest` - Points to latest stable
- `beta` - Points to latest beta

### NPM Tags
- `latest` - Default, stable releases
- `beta` - Beta releases for testing
- `alpha` - Alpha releases for early adopters

## Release Schedule

### Regular Releases
- **Patch**: As needed for bug fixes
- **Minor**: Monthly for new features
- **Major**: Quarterly or when breaking changes accumulate

### Emergency Releases
- Critical security fixes
- Breaking production issues
- High-impact bug fixes

## Migration Support

### Breaking Changes
- Provide migration guide for major versions
- Maintain previous major version for 6 months
- Add deprecation warnings before removal
- Provide codemods when possible

### Version Support
- **Current Major**: Full support
- **Previous Major**: Security fixes only
- **Older Versions**: No support

## Consumer Guidelines

### Installation
```bash
# Recommended: Pin to specific version
npm install @oddle/chat-wrapper-ui@^1.2.0

# For latest features (more risk)
npm install @oddle/chat-wrapper-ui@latest

# For testing new features
npm install @oddle/chat-wrapper-ui@beta
```

### Update Strategy
```bash
# Safe updates (patch only)
npm update @oddle/chat-wrapper-ui

# Feature updates (minor)
npm install @oddle/chat-wrapper-ui@^1.3.0

# Major updates (breaking changes)
npm install @oddle/chat-wrapper-ui@^2.0.0
# Read migration guide before upgrading
```

### Version Pinning Examples
```json
{
  "dependencies": {
    // Exact version (most stable)
    "@oddle/chat-wrapper-ui": "1.2.3",
    
    // Patch updates only (recommended)
    "@oddle/chat-wrapper-ui": "~1.2.0",
    
    // Minor updates (more features)
    "@oddle/chat-wrapper-ui": "^1.2.0",
    
    // Latest (most risk)
    "@oddle/chat-wrapper-ui": "latest"
  }
}
```