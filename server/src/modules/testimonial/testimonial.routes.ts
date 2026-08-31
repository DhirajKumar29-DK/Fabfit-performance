import { Router } from 'express';
import { TestimonialController } from './testimonial.controller';

const router = Router();
const controller = new TestimonialController();

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export const testimonialRoutes = router;
