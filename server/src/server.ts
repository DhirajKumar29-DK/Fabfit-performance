import app from './app';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📚 Swagger Docs available at: http://localhost:${PORT}/swagger-docs`);
  console.log(`=========================================\n`);
});

// Handle graceful shutdown (optional but good practice)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
