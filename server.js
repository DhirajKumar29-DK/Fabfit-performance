const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.production') });
dotenv.config({ path: path.join(__dirname, 'server/.env') });

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

// Start Combined Server
const server = app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Combined FabFit Server is Running!`);
  console.log(`🌐 Website & Frontend: http://localhost:${PORT}`);
  console.log(`⚙️  Backend API Base:   http://localhost:${PORT}/api`);
  console.log(`📚 Swagger API Docs:   http://localhost:${PORT}/swagger-docs`);
  console.log(`==================================================\n`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing server');
  server.close(() => {
    console.log('Server closed cleanly');
  });
});
