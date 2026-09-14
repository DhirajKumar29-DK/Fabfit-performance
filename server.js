const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const next = require('next');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.production') });
dotenv.config({ path: path.join(__dirname, 'server/.env') });

// Detect environment & configuration
const isHostingerProd = __dirname.includes('/domains/') || __dirname.includes('\\domains\\');
if (!process.env.NODE_ENV && isHostingerProd) {
  process.env.NODE_ENV = 'production';
}
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Ensure Prisma Client is generated if missing
try {
  const { execSync } = require('child_process');
  const prismaClientGenerated = fs.existsSync(path.join(__dirname, 'node_modules/.prisma/client/index.js'));
  if (!prismaClientGenerated) {
    console.log('🔄 Prisma Client not found in node_modules. Generating Prisma Client now...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma Client successfully generated.');
  }
} catch (prismaErr) {
  console.warn('⚠️ Warning during Prisma generate check:', prismaErr.message);
}

// Import Express Backend App
let app;
try {
  if (fs.existsSync(path.join(__dirname, 'server/dist/app.js'))) {
    app = require('./server/dist/app');
    if (app.default) app = app.default;
  } else {
    // If running in development via tsx
    require('tsx/cjs');
    app = require('./server/src/app');
    if (app.default) app = app.default;
  }
} catch (err) {
  console.error('❌ Failed to load Express backend app:', err);
  if (!fs.existsSync(path.join(__dirname, 'server/dist/app.js'))) {
    console.error('💡 TIP: server/dist/app.js was not found and tsx execution failed on server. Please run "npm run build" to compile the backend into JavaScript before deploying.');
  }
  process.exit(1);
}

// Initialize Next.js app
const nextApp = next({ dev, dir: __dirname });
const nextHandler = nextApp.getRequestHandler();

// Serve Next.js static files efficiently in production
const nextStaticDir = path.join(__dirname, '.next', 'static');
if (fs.existsSync(nextStaticDir)) {
  const express = require('express');
  app.use('/_next/static', express.static(nextStaticDir, {
    maxAge: '1y',
    immutable: true,
  }));
}

// Delegate all other routes to Next.js Frontend (Express 5 compatible catch-all)
app.use((req, res) => {
  return nextHandler(req, res);
});

// Prepare Next.js and start unified server
nextApp.prepare().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 Unified FabFit Server is Running!`);
    console.log(`🌐 Frontend (Next.js): http://localhost:${PORT}`);
    console.log(`⚙️  Backend API (Express): http://localhost:${PORT}/api`);
    console.log(`📚 Swagger Docs: http://localhost:${PORT}/swagger-docs`);
    console.log(`⚡ Mode: ${dev ? 'Development' : 'Production'}`);
    console.log(`==================================================\n`);
  });

  // Handle graceful shutdown
  const handleShutdown = () => {
    console.log('Shutdown signal received: closing server cleanly...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleShutdown);
  process.on('SIGINT', handleShutdown);
}).catch((err) => {
  console.error('❌ Failed to prepare Next.js application:', err);
  process.exit(1);
});

module.exports = app;
