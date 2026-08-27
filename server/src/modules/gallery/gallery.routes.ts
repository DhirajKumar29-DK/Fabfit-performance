import { Router } from 'express';
import { GalleryController } from './gallery.controller';

const router = Router();

router.post('/', GalleryController.createGallery);
router.get('/', GalleryController.getAllGallery);
router.get('/preview', GalleryController.getPreviewGallery);
router.post('/bulk-delete', GalleryController.bulkDelete);
router.get('/:id', GalleryController.getGalleryById);
router.patch('/:id', GalleryController.updateGallery);
router.delete('/:id', GalleryController.deleteGallery);

export default router;
