import { 
  sanitizeMessage, 
  sanitizePlainText, 
  sanitizeFileName, 
  isUrlSafe 
} from '../security';

describe('Security Utils', () => {
  describe('sanitizeMessage', () => {
    it('should remove script tags from user messages', () => {
      const maliciousInput = 'Hello <script>alert("xss")</script> world';
      const result = sanitizeMessage(maliciousInput, false);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert');
    });

    it('should remove event handlers from user messages', () => {
      const maliciousInput = '<div onclick="alert(\'xss\')">Click me</div>';
      const result = sanitizeMessage(maliciousInput, false);
      expect(result).not.toContain('onclick');
      expect(result).not.toContain('alert');
    });

    it('should allow basic formatting in user messages', () => {
      const input = 'Hello <b>world</b> and <code>code</code>';
      const result = sanitizeMessage(input, false);
      expect(result).toContain('<b>world</b>');
      expect(result).toContain('<code>code</code>');
    });

    it('should allow more formatting in assistant messages', () => {
      const input = '<h1>Title</h1><p>Paragraph</p><ul><li>Item</li></ul>';
      const result = sanitizeMessage(input, true);
      expect(result).toContain('<h1>Title</h1>');
      expect(result).toContain('<p>Paragraph</p>');
      expect(result).toContain('<ul><li>Item</li></ul>');
    });

    it('should remove javascript: URLs', () => {
      const maliciousInput = '<a href="javascript:alert(\'xss\')">Link</a>';
      const result = sanitizeMessage(maliciousInput, false);
      expect(result).not.toContain('javascript:');
    });
  });

  describe('sanitizePlainText', () => {
    it('should strip all HTML tags', () => {
      const input = '<b>Bold</b> and <script>alert("xss")</script>';
      const result = sanitizePlainText(input);
      expect(result).toBe('Bold and ');
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });
  });

  describe('sanitizeFileName', () => {
    it('should remove dangerous characters', () => {
      const maliciousName = '../../../etc/passwd';
      const result = sanitizeFileName(maliciousName);
      expect(result).not.toContain('../');
      expect(result).not.toContain('/');
    });

    it('should replace dangerous characters with underscores', () => {
      const maliciousName = 'file<script>.txt';
      const result = sanitizeFileName(maliciousName);
      expect(result).toBe('file_script_.txt');
    });

    it('should limit filename length', () => {
      const longName = 'a'.repeat(300);
      const result = sanitizeFileName(longName);
      expect(result.length).toBeLessThanOrEqual(255);
    });
  });

  describe('isUrlSafe', () => {
    it('should allow safe HTTP URLs', () => {
      expect(isUrlSafe('http://example.com')).toBe(true);
      expect(isUrlSafe('https://example.com')).toBe(true);
    });

    it('should allow safe data URLs', () => {
      expect(isUrlSafe('data:image/png;base64,abc123')).toBe(true);
    });

    it('should block javascript URLs', () => {
      expect(isUrlSafe('javascript:alert("xss")')).toBe(false);
    });

    it('should block other dangerous protocols', () => {
      expect(isUrlSafe('vbscript:msgbox("xss")')).toBe(false);
      expect(isUrlSafe('file:///etc/passwd')).toBe(false);
    });

    it('should handle invalid URLs', () => {
      expect(isUrlSafe('not-a-url')).toBe(false);
      expect(isUrlSafe('')).toBe(false);
    });
  });
});