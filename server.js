const path = require('path');
const fs = require('fs');
const http = require('http');
const dotenv = require('dotenv');
const next = require('next');

// ─────────────────────────────────────────────────────────────────────────
// 1. ENVIRONMENT DETECTION & CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────
const isHostingerProd = __dirname.includes('/domains/') || __dirname.includes('\\domains\\') || process.env.NODE_ENV === 'production';

// Load environment variables (.env, .env.production, and server/.env)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.production') });
dotenv.config({ path: path.join(__dirname, 'server/.env') });

if (isHostingerProd) {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';
  // Hostinger's LiteSpeed/Passenger proxy maps domain traffic to port 3000
  if (!process.env.PORT) process.env.PORT = '3000';
}

// Fallback critical environment variables to guarantee database & auth availability
if (!process.env.PORT) process.env.PORT = '3000';
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'mysql://u963801592_fabfitperforU:fabFitperfor3108@srv1100.hstgr.io:3306/u963801592_fabfitperfor';
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'fabfit_admin_secret_key_15days';
}
if (!process.env.NEXT_PUBLIC_API_URL) {
  process.env.NEXT_PUBLIC_API_URL = 'https://fabfitperformance.com';
}

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'production';
const dev = NODE_ENV !== 'production';

console.log(`[STARTUP] Starting FabFit Unified Server (Mode: ${NODE_ENV}, Port: ${PORT})...`);

// ─────────────────────────────────────────────────────────────────────────
// 2. PRISMA CLIENT GENERATION CHECK
// ─────────────────────────────────────────────────────────────────────────
try {
  const { execSync } = require('child_process');
  const prismaClientGenerated = fs.existsSync(path.join(__dirname, 'node_modules/.prisma/client/index.js')) ||
                                fs.existsSync(path.join(__dirname, 'node_modules/.prisma/client/default.js'));
  if (!prismaClientGenerated) {
    console.log('🔄 Prisma Client not found in node_modules. Generating Prisma Client now...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    if (fs.existsSync(path.join(__dirname, 'server/prisma/schema.prisma'))) {
      execSync('npx prisma generate --schema=./server/prisma/schema.prisma', { stdio: 'inherit' });
    }
    console.log('✅ Prisma Client successfully generated.');
  }
} catch (prismaErr) {
  console.warn('⚠️ Warning during Prisma generate check:', prismaErr.message);
}

// ─────────────────────────────────────────────────────────────────────────
// 3. LOAD EXPRESS BACKEND APPLICATION
// ─────────────────────────────────────────────────────────────────────────
let app;
try {
  if (fs.existsSync(path.join(__dirname, 'server/dist/app.js'))) {
    app = require('./server/dist/app');
    if (app.default) app = app.default;
    console.log('✅ Express backend loaded from server/dist/app.js');
  } else {
    // If running in development via tsx
    require('tsx/cjs');
    app = require('./server/src/app');
    if (app.default) app = app.default;
    console.log('✅ Express backend loaded from server/src/app.ts');
  }
} catch (err) {
  console.error('❌ Failed to load Express backend app:', err);
  if (!fs.existsSync(path.join(__dirname, 'server/dist/app.js'))) {
    console.error('💡 TIP: server/dist/app.js was not found. Please compile the backend using "npm run build" before deploying.');
  }
  process.exit(1);
}

const server = http.createServer(app);

// ─────────────────────────────────────────────────────────────────────────
// 4. NEXT.JS FRONTEND INITIALIZATION & BOOTSTRAP QUEUE
// ─────────────────────────────────────────────────────────────────────────
const nextApp = next({ dev, dir: __dirname });
const nextHandler = nextApp.getRequestHandler();

// Serve Next.js static assets with high performance caching in production
const nextStaticDir = path.join(__dirname, '.next', 'static');
if (fs.existsSync(nextStaticDir)) {
  const express = require('express');
  app.use('/_next/static', express.static(nextStaticDir, {
    maxAge: '1y',
    immutable: true,
  }));
}

// Serve public static assets
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  const express = require('express');
  app.use(express.static(publicDir));
}

let isNextReady = false;
const pendingRequests = [];
const BOOTSTRAP_TIMEOUT_MS = 30000;

// Catch-all handler for Next.js frontend pages (queued until Next.js is prepared)
app.use((req, res) => {
  if (isNextReady) {
    return nextHandler(req, res);
  }

  // Queue frontend requests received during server startup
  const timer = setTimeout(() => {
    if (!res.headersSent) {
      console.error(`⏱️ [BOOTSTRAP TIMEOUT] ${req.method} ${req.originalUrl} — Next.js preparing`);
      res.status(503).json({ error: true, message: 'Server is starting up. Please refresh in a moment.' });
    }
  }, BOOTSTRAP_TIMEOUT_MS);

  pendingRequests.push({ req, res, timer });
});

// ─────────────────────────────────────────────────────────────────────────
// 5. START HTTP SERVER IMMEDIATELY (Prevents LiteSpeed 403/503 timeouts)
// ─────────────────────────────────────────────────────────────────────────
server.listen(PORT, HOST, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Unified FabFit Server is Listening on ${HOST}:${PORT}!`);
  console.log(`🌐 Frontend (Next.js): http://localhost:${PORT}`);
  console.log(`⚙️  Backend API (Express): http://localhost:${PORT}/api`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/swagger-docs`);
  console.log(`⚡ Mode: ${dev ? 'Development' : 'Production'}`);
  console.log(`==================================================\n`);
});

// Prepare Next.js in the background
nextApp.prepare().then(() => {
  console.log('✅ Next.js frontend prepared and ready to serve requests.');
  isNextReady = true;

  // Flush queued page requests
  if (pendingRequests.length > 0) {
    console.log(`🚀 Flushing ${pendingRequests.length} queued page requests.`);
    while (pendingRequests.length > 0) {
      const item = pendingRequests.shift();
      if (item) {
        clearTimeout(item.timer);
        if (!item.res.headersSent) {
          nextHandler(item.req, item.res);
        }
      }
    }
  }
}).catch((err) => {
  console.error('❌ Failed to prepare Next.js application:', err);
  process.exit(1);
});

// Handle graceful shutdown
const handleShutdown = (signal) => {
  console.log(`[SHUTDOWN] Received ${signal}: closing server cleanly...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

module.exports = app;
