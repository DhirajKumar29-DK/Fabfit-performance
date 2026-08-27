import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import { errorHandler } from './middlewares/errorHandler';
import assessmentRoutes from './modules/assessment/assessment.routes';
import heroRoutes from './modules/hero/hero.routes';
import uploadRoutes from './modules/upload/upload.routes';
import visitorRoutes from './modules/visitor/visitor.routes';
import counterRoutes from './modules/counter/counter.routes';
import galleryRoutes from './modules/gallery/gallery.routes';

const app: Application = express();

// Middleware
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors()); 

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Fab Fit Backend is running' });
});

// Mount Routes
app.use('/api/assessments', assessmentRoutes);
app.use('/api/heroes', heroRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/counters', counterRoutes);
app.use('/api/gallery', galleryRoutes);

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fab Fit API Documentation',
      version: '1.0.0',
      description: 'API documentation for Fab Fit Performance Backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.ts', './src/app.ts'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global Error Handler should always be the last middleware
app.use(errorHandler);

export default app;
