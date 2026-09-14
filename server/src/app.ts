import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';
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
import pageStructureRoutes from './modules/page-structure/page-structure.routes';

const app: Application = express();

// Middleware
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://fabfitperformance.com',
  'https://www.fabfitperformance.com',
  'http://fabfitperformance.com',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('fabfitperformance.com')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
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
app.use('/api/page-structure', pageStructureRoutes);

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


// Global Error Handler should always be the last middleware
app.use(errorHandler);

// Serve exported Next.js frontend if out directory exists
const outDirectory = path.join(__dirname, '../../out');
if (fs.existsSync(outDirectory)) {
  app.use(express.static(outDirectory));
  app.use((req: Request, res: Response, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.startsWith('/uploads') && !req.path.startsWith('/swagger-docs')) {
      const cleanPath = req.path.replace(/^\/|\/$/g, '');
      const htmlFile = cleanPath === '' ? 'index.html' : `${cleanPath}.html`;
      const targetPath = path.join(outDirectory, htmlFile);
      if (fs.existsSync(targetPath)) {
        return res.sendFile(targetPath);
      }
      const indexFallback = path.join(outDirectory, cleanPath, 'index.html');
      if (fs.existsSync(indexFallback)) {
        return res.sendFile(indexFallback);
      }
      const notFoundPath = path.join(outDirectory, '404.html');
      if (fs.existsSync(notFoundPath)) {
        return res.status(404).sendFile(notFoundPath);
      }
    }
    next();
  });
}

export default app;
