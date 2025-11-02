# Backend Implementation Guide: WebSocket Ticket Authentication

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Database/Redis Setup](#step-1-databaseredis-setup)
4. [Step 2: HTTP Ticket Endpoint](#step-2-http-ticket-endpoint)
5. [Step 3: WebSocket Authentication Handler](#step-3-websocket-authentication-handler)
6. [Step 4: Session Management](#step-4-session-management)
7. [Step 5: Error Handling](#step-5-error-handling)
8. [Step 6: Testing](#step-6-testing)
9. [Step 7: Security & Production](#step-7-security--production)
10. [Complete Examples](#complete-examples)

## Overview

This guide walks you through implementing a **ticket-based WebSocket authentication system**. The flow is:

1. **Client requests a ticket** via HTTP with authentication headers
2. **Server generates and stores ticket** with expiration (1-2 hours)
3. **Client connects to WebSocket** with clean URL (no tokens)
4. **Client sends ticket** as first message after connection
5. **Server validates ticket** and establishes authenticated session

## Prerequisites

### Required Technologies
- **Node.js** (v16+ recommended)
- **Redis** (for ticket storage with TTL)
- **WebSocket library** (ws, socket.io, or similar)
- **HTTP framework** (Express, Fastify, Koa, etc.)

### Required npm packages
```bash
npm install redis ws express cors helmet rate-limiter-flexible
npm install --save-dev @types/ws @types/express
```

## Step 1: Database/Redis Setup

### Option A: Redis Setup (Recommended)
```javascript
// redis.js
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  // Optional: Redis Cluster support
  // cluster: {
  //   nodes: [{ host: 'redis1', port: 6379 }, { host: 'redis2', port: 6379 }]
  // }
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = redisClient;
```

### Option B: Database Schema (If not using Redis)
```sql
-- PostgreSQL/MySQL
CREATE TABLE websocket_tickets (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  entity_id VARCHAR(255),
  entity_type VARCHAR(50),
  provider_res_id VARCHAR(255),
  chat_server_key VARCHAR(255) NOT NULL,
  client_ip VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  
  -- Indexes for performance
  INDEX idx_ticket_expiry (expires_at),
  INDEX idx_user_id (user_id),
  INDEX idx_chat_server_key (chat_server_key)
);

-- Cleanup job (run every hour)
-- DELETE FROM websocket_tickets WHERE expires_at < NOW();
```

## Step 2: HTTP Ticket Endpoint

### 2.1 Authentication Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

// Validate userMpAuthToken (JWT)
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Missing or invalid Authorization header',
        code: 'AUTH_MISSING'
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "
    
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid authentication token',
      code: 'AUTH_INVALID'
    });
  }
};

// Validate chatServerKey
const validateChatServerKey = async (req, res, next) => {
  try {
    const chatServerKey = req.headers['x-chat-server-key'];
    if (!chatServerKey) {
      return res.status(401).json({
        success: false,
        error: 'Missing X-Chat-Server-Key header',
        code: 'SERVER_KEY_MISSING'
      });
    }

    // Validate against known server keys
    const validServerKeys = ['UD21', 'Host', 'Reserve']; // or load from env/database
    if (!validServerKeys.includes(chatServerKey)) {
      return res.status(401).json({
        success: false,
        error: 'Invalid chat server key',
        code: 'SERVER_KEY_INVALID'
      });
    }

    req.chatServerKey = chatServerKey;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error during validation',
      code: 'SERVER_ERROR'
    });
  }
};

module.exports = { authenticateUser, validateChatServerKey };
```

### 2.2 Rate Limiting Middleware
```javascript
// middleware/rateLimiter.js
const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../redis');

// Rate limiter: 10 ticket requests per minute per user
const ticketRateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyGenerator: (req) => `ticket_rate_${req.user.userId}`, // Rate limit per user
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
  blockDuration: 60, // Block for 60 seconds if limit exceeded
});

const rateLimitMiddleware = async (req, res, next) => {
  try {
    await ticketRateLimiter.consume(req);
    next();
  } catch (rateLimiterRes) {
    const remainingPoints = rateLimiterRes.remainingPoints || 0;
    const msBeforeNext = rateLimiterRes.msBeforeNext || 1000;

    res.set({
      'Retry-After': Math.round(msBeforeNext / 1000) || 1,
      'X-RateLimit-Limit': 10,
      'X-RateLimit-Remaining': remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString(),
    });

    res.status(429).json({
      success: false,
      error: 'Too many ticket requests. Please try again later.',
      code: 'RATE_LIMITED'
    });
  }
};

module.exports = rateLimitMiddleware;
```

### 2.3 Ticket Generation Endpoint
```javascript
// routes/websocket.js
const express = require('express');
const crypto = require('crypto');
const redisClient = require('../redis');
const { authenticateUser, validateChatServerKey } = require('../middleware/auth');
const rateLimitMiddleware = require('../middleware/rateLimiter');

const router = express.Router();

// POST /api/websocket/ticket
router.post('/ticket', 
  authenticateUser,           // Validate JWT token
  validateChatServerKey,      // Validate server key
  rateLimitMiddleware,        // Rate limiting
  async (req, res) => {
    try {
      const { userId, entityId, entityType, providerResId, clientInfo } = req.body;
      
      // Validate required fields
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'userId is required',
          code: 'VALIDATION_ERROR'
        });
      }

      // Verify userId matches authenticated user
      if (req.user.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'userId mismatch with authenticated user',
          code: 'USER_MISMATCH'
        });
      }

      // Generate cryptographically secure ticket
      const ticketId = crypto.randomBytes(32).toString('hex');
      const ticket = `ws_ticket_${ticketId}`;
      
      // Set expiration (2 hours from now)
      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
      
      // Prepare ticket data
      const ticketData = {
        id: ticket,
        userId,
        entityId: entityId || null,
        entityType: entityType || null,
        providerResId: providerResId || null,
        chatServerKey: req.chatServerKey,
        clientIP: req.ip || req.connection.remoteAddress,
        userAgent: clientInfo?.userAgent || req.get('User-Agent'),
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
        used: false
      };

      // Store in Redis with TTL (2 hours = 7200 seconds)
      const redisKey = `ticket:${ticket}`;
      await redisClient.setex(redisKey, 7200, JSON.stringify(ticketData));

      // Log ticket generation for monitoring
      console.log(`WebSocket ticket generated for user ${userId}, expires at ${expiresAt.toISOString()}`);

      // Return ticket to client
      res.json({
        success: true,
        ticket,
        expiresAt: expiresAt.toISOString()
      });

    } catch (error) {
      console.error('Error generating WebSocket ticket:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate WebSocket ticket',
        code: 'TICKET_GENERATION_ERROR'
      });
    }
  }
);

module.exports = router;
```

## Step 3: WebSocket Authentication Handler

### 3.1 WebSocket Server Setup
```javascript
// websocket/server.js
const WebSocket = require('ws');
const url = require('url');
const redisClient = require('../redis');

class WebSocketServer {
  constructor(options = {}) {
    this.port = options.port || 8080;
    this.wss = new WebSocket.Server({ 
      port: this.port,
      verifyClient: this.verifyClient.bind(this)
    });
    
    this.setupEventHandlers();
    console.log(`WebSocket server listening on port ${this.port}`);
  }

  // Optional: Additional connection verification
  verifyClient(info) {
    // You can add additional checks here (IP whitelist, etc.)
    return true;
  }

  setupEventHandlers() {
    this.wss.on('connection', (ws, req) => {
      // Initialize connection state
      ws.authenticated = false;
      ws.userId = null;
      ws.sessionId = this.generateSessionId();
      ws.connectedAt = new Date();

      console.log(`New WebSocket connection: ${ws.sessionId}`);

      // Set connection timeout for authentication
      const authTimeout = setTimeout(() => {
        if (!ws.authenticated) {
          console.log(`Authentication timeout for session ${ws.sessionId}`);
          ws.close(4001, 'Authentication timeout');
        }
      }, 30000); // 30 seconds to authenticate

      ws.on('message', async (message) => {
        try {
          await this.handleMessage(ws, message, authTimeout);
        } catch (error) {
          console.error('Error handling message:', error);
          this.sendError(ws, 'Message processing error', 'MESSAGE_ERROR');
        }
      });

      ws.on('close', (code, reason) => {
        clearTimeout(authTimeout);
        console.log(`WebSocket connection closed: ${ws.sessionId}, code: ${code}, reason: ${reason}`);
      });

      ws.on('error', (error) => {
        clearTimeout(authTimeout);
        console.error(`WebSocket error for session ${ws.sessionId}:`, error);
      });

      // Send connection acknowledgment
      this.sendMessage(ws, {
        type: 'connection_established',
        sessionId: ws.sessionId,
        timestamp: ws.connectedAt.toISOString()
      });
    });
  }

  async handleMessage(ws, message, authTimeout) {
    const data = JSON.parse(message.toString());

    // Handle authentication first
    if (data.type === 'ticket_authenticate') {
      await this.handleAuthentication(ws, data, authTimeout);
      return;
    }

    // Check if authenticated for other message types
    if (!ws.authenticated) {
      this.sendError(ws, 'Authentication required', 'AUTH_REQUIRED');
      return;
    }

    // Handle other message types
    switch (data.type) {
      case 'chat_message':
        await this.handleChatMessage(ws, data);
        break;
      case 'configure_tools':
        await this.handleConfigureTools(ws, data);
        break;
      case 'heartbeat_ping':
        this.handleHeartbeat(ws, data);
        break;
      default:
        this.sendError(ws, 'Unknown message type', 'UNKNOWN_MESSAGE_TYPE');
    }
  }

  async handleAuthentication(ws, data, authTimeout) {
    try {
      const { ticket, clientInfo } = data;

      if (!ticket) {
        this.sendError(ws, 'Missing ticket in authentication message', 'TICKET_MISSING');
        return;
      }

      // Validate ticket format
      if (!ticket.startsWith('ws_ticket_')) {
        this.sendError(ws, 'Invalid ticket format', 'TICKET_INVALID');
        return;
      }

      // Retrieve ticket from Redis
      const redisKey = `ticket:${ticket}`;
      const ticketDataStr = await redisClient.get(redisKey);

      if (!ticketDataStr) {
        this.sendError(ws, 'Invalid or expired ticket', 'TICKET_INVALID');
        return;
      }

      const ticketData = JSON.parse(ticketDataStr);

      // Validate ticket hasn't been used (optional: single-use tickets)
      if (ticketData.used) {
        this.sendError(ws, 'Ticket already used', 'TICKET_USED');
        return;
      }

      // Validate expiration
      const expiresAt = new Date(ticketData.expiresAt);
      if (Date.now() >= expiresAt.getTime()) {
        // Clean up expired ticket
        await redisClient.del(redisKey);
        this.sendError(ws, 'Ticket has expired', 'TICKET_EXPIRED');
        return;
      }

      // Optional: Validate client IP (for extra security)
      // const clientIP = ws._socket.remoteAddress;
      // if (ticketData.clientIP !== clientIP) {
      //   this.sendError(ws, 'IP address mismatch', 'IP_MISMATCH');
      //   return;
      // }

      // Mark ticket as used (optional: single-use)
      await redisClient.del(redisKey);

      // Authentication successful
      clearTimeout(authTimeout);
      ws.authenticated = true;
      ws.userId = ticketData.userId;
      ws.entityId = ticketData.entityId;
      ws.entityType = ticketData.entityType;
      ws.chatServerKey = ticketData.chatServerKey;

      // Store session in Redis (optional: for cross-server session sharing)
      const sessionData = {
        sessionId: ws.sessionId,
        userId: ticketData.userId,
        entityId: ticketData.entityId,
        entityType: ticketData.entityType,
        chatServerKey: ticketData.chatServerKey,
        authenticatedAt: new Date().toISOString()
      };
      
      await redisClient.setex(`session:${ws.sessionId}`, 86400, JSON.stringify(sessionData)); // 24h TTL

      console.log(`WebSocket authentication successful for user ${ws.userId}, session ${ws.sessionId}`);

      // Send success response
      this.sendMessage(ws, {
        type: 'authentication_success',
        sessionId: ws.sessionId,
        user: {
          userId: ticketData.userId,
          entityId: ticketData.entityId,
          entityType: ticketData.entityType
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Authentication error:', error);
      this.sendError(ws, 'Authentication failed', 'AUTH_ERROR');
    }
  }

  async handleChatMessage(ws, data) {
    // Process chat message
    console.log(`Chat message from ${ws.userId}:`, data.content);
    
    // Here you would integrate with your AI/chat processing logic
    // For now, just echo back
    this.sendMessage(ws, {
      type: 'chat_response',
      content: `Echo: ${data.content}`,
      timestamp: new Date().toISOString()
    });
  }

  async handleConfigureTools(ws, data) {
    // Handle tool configuration
    console.log(`Tools configured for ${ws.userId}:`, data.toolSchemas?.length || 0, 'tools');
    
    this.sendMessage(ws, {
      type: 'tools_configured',
      toolCount: data.toolSchemas?.length || 0,
      timestamp: new Date().toISOString()
    });
  }

  handleHeartbeat(ws, data) {
    // Respond to heartbeat
    this.sendMessage(ws, {
      type: 'heartbeat_pong',
      timestamp: new Date().toISOString(),
      originalTimestamp: data.timestamp,
      pingTime: data.pingTime
    });
  }

  sendMessage(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  sendError(ws, error, code) {
    this.sendMessage(ws, {
      type: 'authentication_error', // or 'error' for general errors
      error,
      code,
      timestamp: new Date().toISOString()
    });
  }

  generateSessionId() {
    return `session_${crypto.randomBytes(16).toString('hex')}`;
  }
}

module.exports = WebSocketServer;
```

## Step 4: Session Management

### 4.1 Session Storage and Cleanup
```javascript
// utils/sessionManager.js
const redisClient = require('../redis');

class SessionManager {
  // Get active session data
  static async getSession(sessionId) {
    try {
      const sessionData = await redisClient.get(`session:${sessionId}`);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }

  // Update session data
  static async updateSession(sessionId, updates) {
    try {
      const existingSession = await this.getSession(sessionId);
      if (!existingSession) return false;

      const updatedSession = { ...existingSession, ...updates };
      await redisClient.setex(`session:${sessionId}`, 86400, JSON.stringify(updatedSession));
      return true;
    } catch (error) {
      console.error('Error updating session:', error);
      return false;
    }
  }

  // Remove session
  static async removeSession(sessionId) {
    try {
      await redisClient.del(`session:${sessionId}`);
      return true;
    } catch (error) {
      console.error('Error removing session:', error);
      return false;
    }
  }

  // Get all active sessions for a user
  static async getUserSessions(userId) {
    try {
      const keys = await redisClient.keys('session:*');
      const sessions = [];

      for (const key of keys) {
        const sessionData = await redisClient.get(key);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          if (session.userId === userId) {
            sessions.push(session);
          }
        }
      }

      return sessions;
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return [];
    }
  }
}

module.exports = SessionManager;
```

## Step 5: Error Handling

### 5.1 Centralized Error Handler
```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Default error response
  let statusCode = 500;
  let errorCode = 'SERVER_ERROR';
  let message = 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    errorCode = 'AUTH_ERROR';
    message = 'Authentication failed';
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503;
    errorCode = 'DATABASE_ERROR';
    message = 'Database connection failed';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    code: errorCode,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

### 5.2 WebSocket Error Codes
```javascript
// constants/errorCodes.js
const WS_ERROR_CODES = {
  // Authentication errors
  AUTH_REQUIRED: { code: 4001, message: 'Authentication required' },
  TICKET_MISSING: { code: 4002, message: 'Missing authentication ticket' },
  TICKET_INVALID: { code: 4003, message: 'Invalid or expired ticket' },
  TICKET_USED: { code: 4004, message: 'Ticket already used' },
  TICKET_EXPIRED: { code: 4005, message: 'Ticket has expired' },
  AUTH_TIMEOUT: { code: 4006, message: 'Authentication timeout' },
  
  // Message errors
  MESSAGE_ERROR: { code: 4010, message: 'Message processing error' },
  UNKNOWN_MESSAGE_TYPE: { code: 4011, message: 'Unknown message type' },
  INVALID_JSON: { code: 4012, message: 'Invalid JSON message' },
  
  // Server errors
  SERVER_ERROR: { code: 4500, message: 'Internal server error' }
};

module.exports = WS_ERROR_CODES;
```

## Step 6: Testing

### 6.1 Unit Tests
```javascript
// tests/ticket.test.js
const request = require('supertest');
const app = require('../app');

describe('WebSocket Ticket API', () => {
  test('should generate ticket with valid authentication', async () => {
    const response = await request(app)
      .post('/api/websocket/ticket')
      .set('Authorization', 'Bearer valid-jwt-token')
      .set('X-Chat-Server-Key', 'UD21')
      .send({
        userId: 'test-user',
        entityId: 'test-brand',
        entityType: 'BRAND'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.ticket).toMatch(/^ws_ticket_/);
    expect(response.body.expiresAt).toBeDefined();
  });

  test('should reject request without authentication', async () => {
    const response = await request(app)
      .post('/api/websocket/ticket')
      .send({
        userId: 'test-user'
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('AUTH_MISSING');
  });
});
```

### 6.2 Integration Tests
```javascript
// tests/websocket.test.js
const WebSocket = require('ws');
const { generateTestTicket } = require('./helpers');

describe('WebSocket Authentication', () => {
  test('should authenticate with valid ticket', (done) => {
    const ws = new WebSocket('ws://localhost:8080/ws');
    
    ws.on('open', async () => {
      const ticket = await generateTestTicket();
      
      ws.send(JSON.stringify({
        type: 'ticket_authenticate',
        ticket: ticket
      }));
    });

    ws.on('message', (data) => {
      const message = JSON.parse(data);
      
      if (message.type === 'authentication_success') {
        expect(message.sessionId).toBeDefined();
        expect(message.user.userId).toBeDefined();
        ws.close();
        done();
      }
    });
  });
});
```

## Step 7: Security & Production

### 7.1 Environment Configuration
```javascript
// config/env.js
require('dotenv').config();

module.exports = {
  // Server
  PORT: process.env.PORT || 3000,
  WS_PORT: process.env.WS_PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Security
  JWT_SECRET: process.env.JWT_SECRET,
  TICKET_EXPIRY_HOURS: parseInt(process.env.TICKET_EXPIRY_HOURS) || 2,
  
  // Redis
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  
  // Rate limiting
  TICKET_RATE_LIMIT: parseInt(process.env.TICKET_RATE_LIMIT) || 10,
  RATE_WINDOW_MINUTES: parseInt(process.env.RATE_WINDOW_MINUTES) || 1,
  
  // Monitoring
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  ENABLE_METRICS: process.env.ENABLE_METRICS === 'true'
};
```

### 7.2 Security Headers & CORS
```javascript
// middleware/security.js
const helmet = require('helmet');
const cors = require('cors');

const securityMiddleware = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "ws:", "wss:"],
      },
    },
  }),
  
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Chat-Server-Key']
  })
];

module.exports = securityMiddleware;
```

### 7.3 Monitoring & Logging
```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ...(process.env.NODE_ENV !== 'production' ? [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ] : [])
  ]
});

// Log WebSocket events
const logWSEvent = (event, sessionId, userId, data = {}) => {
  logger.info('WebSocket Event', {
    event,
    sessionId,
    userId,
    timestamp: new Date().toISOString(),
    ...data
  });
};

module.exports = { logger, logWSEvent };
```

## Complete Examples

### Main Application Setup
```javascript
// app.js
const express = require('express');
const redisClient = require('./redis');
const WebSocketServer = require('./websocket/server');
const websocketRoutes = require('./routes/websocket');
const securityMiddleware = require('./middleware/security');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');

const app = express();

// Security middleware
app.use(securityMiddleware);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/websocket', websocketRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

// Error handling
app.use(errorHandler);

// Start HTTP server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`HTTP server listening on port ${PORT}`);
});

// Start WebSocket server
const WS_PORT = process.env.WS_PORT || 8080;
new WebSocketServer({ port: WS_PORT });

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('Received SIGTERM, shutting down gracefully');
  await redisClient.quit();
  process.exit(0);
});

module.exports = app;
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose ports
EXPOSE 3000 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - REDIS_HOST=redis
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - redis
    volumes:
      - ./logs:/app/logs

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

volumes:
  redis_data:
```

## Quick Start Checklist

- [ ] **Set up Redis** (local or cloud)
- [ ] **Install dependencies** (`npm install redis ws express cors helmet`)
- [ ] **Configure environment variables** (`.env` file)
- [ ] **Implement HTTP ticket endpoint** (`POST /api/websocket/ticket`)
- [ ] **Set up WebSocket server** with authentication handler
- [ ] **Add authentication middleware** (JWT + server key validation)
- [ ] **Add rate limiting** (prevent abuse)
- [ ] **Implement error handling** (standardized error responses)
- [ ] **Add logging and monitoring**
- [ ] **Write tests** (unit + integration)
- [ ] **Configure production settings** (security headers, CORS)
- [ ] **Deploy and test** with frontend client

This implementation provides a secure, scalable, and maintainable WebSocket authentication system that your frontend can immediately use!