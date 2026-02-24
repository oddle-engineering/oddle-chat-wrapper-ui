import DOMPurify from 'dompurify';

// Security configuration for different contexts
const SECURITY_CONFIGS = {
  // For user messages - very strict, no HTML allowed except basic formatting
  userMessage: {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'code', 'pre', 'br'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    ALLOW_DATA_ATTR: false,
  },
  
  // For assistant messages - allow more formatting but still secure
  assistantMessage: {
    ALLOWED_TAGS: [
      'p', 'br', 'b', 'i', 'em', 'strong', 'code', 'pre', 
      'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    ALLOWED_ATTR: ['class'],
    KEEP_CONTENT: true,
    ALLOW_DATA_ATTR: false,
  },
  
  // For plain text only - strips all HTML
  plainText: {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }
};

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The input string to sanitize
 * @param context - The context for sanitization (userMessage, assistantMessage, plainText)
 * @returns Sanitized string
 */
export function sanitizeInput(
  input: string, 
  context: keyof typeof SECURITY_CONFIGS = 'userMessage'
): string {
  if (typeof input !== 'string') {
    console.warn('sanitizeInput received non-string input:', typeof input);
    return '';
  }

  if (!input.trim()) {
    return '';
  }

  try {
    const config = SECURITY_CONFIGS[context];
    const sanitized = DOMPurify.sanitize(input, config);
    
    // Additional validation - ensure no script-like content
    if (containsSuspiciousContent(sanitized)) {
      console.warn('Suspicious content detected and removed:', input);
      return sanitized.replace(/javascript:/gi, '').replace(/data:/gi, '');
    }
    
    return sanitized;
  } catch (error) {
    console.error('Error sanitizing input:', error);
    // In case of error, return empty string to be safe
    return '';
  }
}

/**
 * Checks for suspicious content patterns
 * @param content - Content to check
 * @returns true if suspicious content found
 */
function containsSuspiciousContent(content: string): boolean {
  const suspiciousPatterns = [
    /javascript:/i,
    /data:.*base64/i,
    /vbscript:/i,
    /on\w+\s*=/i, // event handlers like onclick=
    /<script/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<style/i,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(content));
}

/**
 * Sanitizes message content specifically for chat messages
 * @param message - The message content
 * @param isAssistant - Whether this is an assistant message (allows more formatting)
 * @returns Sanitized message
 */
export function sanitizeMessage(message: string, isAssistant = false): string {
  // Preserve newlines by temporarily replacing them with placeholders
  const newlinePlaceholder = '___NEWLINE___';
  const preservedMessage = message.replace(/\n/g, newlinePlaceholder);
  
  const context = isAssistant ? 'assistantMessage' : 'userMessage';
  const sanitized = sanitizeInput(preservedMessage, context);
  
  // Restore newlines
  return sanitized.replace(new RegExp(newlinePlaceholder, 'g'), '\n');
}

/**
 * Sanitizes plain text input (removes all HTML)
 * @param text - The text to sanitize
 * @returns Plain text string
 */
export function sanitizePlainText(text: string): string {
  return sanitizeInput(text, 'plainText');
}

/**
 * Validates and sanitizes file names
 * @param fileName - The file name to sanitize
 * @returns Sanitized file name
 */
export function sanitizeFileName(fileName: string): string {
  if (typeof fileName !== 'string') return '';
  
  // Remove or replace dangerous characters
  return fileName
    .replace(/[<>:"/\\|?*]/g, '_') // Replace dangerous chars with underscore
    .replace(/\.\./g, '_') // Prevent directory traversal
    .replace(/^\./, '_') // Prevent hidden files
    .trim()
    .substring(0, 255); // Limit length
}

/**
 * Validates URL for safety
 * @param url - URL to validate
 * @returns true if URL is safe
 */
export function isUrlSafe(url: string): boolean {
  if (typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    
    // Allow only safe protocols
    const safeProtocols = ['http:', 'https:', 'data:'];
    if (!safeProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    // Block suspicious patterns
    if (containsSuspiciousContent(url)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Configures DOMPurify with additional security hooks
 */
export function configureDOMPurify(): void {
  // Add hook to sanitize URLs
  DOMPurify.addHook('beforeSanitizeAttributes', (node) => {
    // Remove dangerous attributes
    const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus'];
    dangerousAttrs.forEach(attr => {
      if (node.hasAttribute(attr)) {
        node.removeAttribute(attr);
      }
    });
    
    // Validate href attributes
    if (node.hasAttribute('href')) {
      const href = node.getAttribute('href');
      if (href && !isUrlSafe(href)) {
        node.removeAttribute('href');
      }
    }
    
    // Validate src attributes
    if (node.hasAttribute('src')) {
      const src = node.getAttribute('src');
      if (src && !isUrlSafe(src)) {
        node.removeAttribute('src');
      }
    }
  });
}

// Initialize DOMPurify configuration
configureDOMPurify();