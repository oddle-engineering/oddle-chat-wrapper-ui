# Security Documentation

This document outlines the security measures implemented in the Chat Wrapper UI to prevent XSS attacks and other security vulnerabilities.

## Input Sanitization

### DOMPurify Integration

The chat component uses [DOMPurify](https://github.com/cure53/DOMPurify) for comprehensive HTML sanitization to prevent XSS attacks.

#### Sanitization Contexts

1. **User Messages (`userMessage`)**
   - **Allowed Tags**: `b`, `i`, `em`, `strong`, `code`, `pre`, `br`
   - **Allowed Attributes**: None
   - **Strictest security level** - minimal formatting allowed

2. **Assistant Messages (`assistantMessage`)**
   - **Allowed Tags**: `p`, `br`, `b`, `i`, `em`, `strong`, `code`, `pre`, `ul`, `ol`, `li`, `blockquote`, `h1-h6`
   - **Allowed Attributes**: `class` (for styling)
   - **Moderate security** - allows more formatting for rich AI responses

3. **Plain Text (`plainText`)**
   - **Allowed Tags**: None
   - **Strips all HTML** - returns plain text only

### Security Features

#### Real-time Input Protection
- Removes dangerous patterns while typing (`<script>`, `javascript:`, event handlers)
- Prevents immediate XSS injection through input fields

#### Content Pattern Detection
- Detects and blocks suspicious patterns:
  - `javascript:` URLs
  - `data:` URLs with base64 content
  - Event handlers (`onclick`, `onload`, etc.)
  - Script tags, iframes, objects, embeds
  - Style and link tags

#### File Upload Security
- **File Type Validation**: Only allows safe file types
  - Images: JPEG, PNG, GIF, WebP
  - Documents: PDF, DOC, DOCX
  - Text: Plain text, CSV
- **File Size Limits**: Maximum 10MB per file
- **Filename Sanitization**: Removes dangerous characters
- **Path Traversal Prevention**: Blocks `../` patterns

### Security Hooks

#### URL Validation
```typescript
function isUrlSafe(url: string): boolean {
  // Validates URLs to ensure they use safe protocols
  // Blocks javascript:, data:, and other dangerous schemes
}
```

#### Attribute Sanitization
- Automatically removes dangerous attributes
- Validates `href` and `src` attributes
- Prevents execution of embedded scripts

## Implementation Details

### Input Sanitization Points

1. **Chat Input Component** (`ChatInput.tsx`)
   - Real-time sanitization during typing
   - Final sanitization before message submission
   - File upload validation

2. **Message Streaming** (`ChatWrapper.tsx`)
   - Character-by-character sanitization for assistant responses
   - Final message sanitization before storage

3. **Message Storage**
   - All messages sanitized before adding to state
   - Role-based sanitization levels

### Configuration

The security system is automatically configured on initialization:

```typescript
import { configureDOMPurify } from './utils/security';

// Auto-configures DOMPurify with security hooks
configureDOMPurify();
```

## Security Best Practices

### For Developers

1. **Always sanitize user input** before processing or displaying
2. **Use appropriate sanitization context** based on content type
3. **Validate file uploads** before processing
4. **Monitor console warnings** for blocked content
5. **Regular security audits** of dependencies

### Content Security Policy (CSP)

Recommended CSP headers for additional security:

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  connect-src 'self' ws: wss:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
```

## Security Monitoring

### Console Warnings

The system logs security-related warnings:

```javascript
// Input sanitization warnings
console.warn('Message was blocked due to security concerns');
console.warn('Suspicious content detected and removed:', input);

// File upload warnings  
console.warn('File type not allowed:', fileName);
console.warn('File too large:', fileName);
```

### Security Metrics

Monitor these security indicators:

- Number of blocked messages
- File upload rejections
- Pattern detection triggers
- Sanitization warnings

## Threat Model

### Protected Against

✅ **Cross-Site Scripting (XSS)**
- Stored XSS via message content
- Reflected XSS via URL parameters
- DOM-based XSS via dynamic content

✅ **Malicious File Uploads**
- Executable file uploads
- Path traversal attacks
- Oversized file attacks

✅ **Content Injection**
- Script injection
- Style injection
- Event handler injection

### Additional Considerations

⚠️ **Server-Side Validation Required**
- Client-side sanitization is not sufficient alone
- Implement server-side validation and sanitization
- Use secure file storage with proper access controls

⚠️ **Network Security**
- Use HTTPS in production
- Implement proper WebSocket security
- Validate all server responses

## Updates and Maintenance

### DOMPurify Updates

Keep DOMPurify updated to latest version for security patches:

```bash
npm update dompurify
```

### Security Reviews

- Review security implementation quarterly
- Test with security scanning tools
- Monitor for new XSS vectors and attack patterns

### Incident Response

If security issues are discovered:

1. Immediately update to patched versions
2. Review logs for potential exploitation
3. Notify users if necessary
4. Document lessons learned

## Contact

For security concerns or questions, please:
- Review this documentation
- Check console warnings and logs  
- Test in development environment first
- Follow responsible disclosure practices