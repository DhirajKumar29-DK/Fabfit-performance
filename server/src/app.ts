import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
import aboutRoutes from './modules/about/about.routes';
import programRoutes from './modules/program/program.routes';
import highlightRoutes from './modules/program-highlight/program-highlight.routes';
import sectionRoutes from './modules/program-section/program-section.routes';
import membershipSectionRoutes from './modules/membership-section/membership-section.routes';
import { membershipPlanRoutes } from './modules/membership-plan/membership-plan.routes';
import { testimonialRoutes } from './modules/testimonial/testimonial.routes';
import headCoachRoutes from './modules/head-coach/head-coach.routes';
import teamSectionRoutes from './modules/team-section/team-section.routes';
import teamMemberRoutes from './modules/team-member/team-member.routes';
import serviceRoutes from './modules/service/service.routes';
import transformationSectionRoutes from './modules/transformation-section/transformation-section.routes';
import transformationRoutes from './modules/transformation/transformation.routes';
import authRoutes from './modules/auth/auth.routes';

const app: Application = express();

// Middleware
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
})); 

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
app.use('/api/about', aboutRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/program-highlights', highlightRoutes);
app.use('/api/program-section', sectionRoutes);
app.use('/api/membership-section', membershipSectionRoutes);
app.use('/api/membership-plans', membershipPlanRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/head-coach', headCoachRoutes);
app.use('/api/team-section', teamSectionRoutes);
app.use('/api/team-members', teamMemberRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/transformation-section', transformationSectionRoutes);
app.use('/api/transformations', transformationRoutes);
app.use('/api/auth', authRoutes);

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
        url: process.env.BASE_URL || 'http://localhost:5000',
        description: 'API Server',
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.ts', './src/app.ts'], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, '../out')));

// Handle all other routes (SPA fallback to Next.js Frontend)
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../out/index.html'));
});

// Global Error Handler should always be the last middleware
app.use(errorHandler);

export default app;
