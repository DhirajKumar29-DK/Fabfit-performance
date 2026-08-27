import { Router } from 'express';
import { VisitorController } from './visitor.controller';

const router = Router();

router.get('/dashboard', VisitorController.getDashboardStats);
router.post('/visit', VisitorController.trackVisitor);

export default router;
