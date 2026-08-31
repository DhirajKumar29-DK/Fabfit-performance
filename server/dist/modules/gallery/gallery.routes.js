"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controller_1 = require("./gallery.controller");
const router = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *   name: Gallery
 *   description: API for managing gallery images
 */
/**
 * @openapi
 * /api/gallery:
 *   post:
 *     summary: Create a new gallery image record
 *     tags: [Gallery]
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', gallery_controller_1.GalleryController.createGallery);
/**
 * @openapi
 * /api/gallery:
 *   get:
 *     summary: Get all gallery images
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', gallery_controller_1.GalleryController.getAllGallery);
/**
 * @openapi
 * /api/gallery/preview:
 *   get:
 *     summary: Get a preview of gallery images
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/preview', gallery_controller_1.GalleryController.getPreviewGallery);
/**
 * @openapi
 * /api/gallery/bulk-delete:
 *   post:
 *     summary: Bulk delete gallery images
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/bulk-delete', gallery_controller_1.GalleryController.bulkDelete);
/**
 * @openapi
 * /api/gallery/{id}:
 *   get:
 *     summary: Get a gallery image by ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', gallery_controller_1.GalleryController.getGalleryById);
/**
 * @openapi
 * /api/gallery/{id}:
 *   patch:
 *     summary: Update a gallery image
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.patch('/:id', gallery_controller_1.GalleryController.updateGallery);
/**
 * @openapi
 * /api/gallery/{id}:
 *   delete:
 *     summary: Delete a gallery image
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/:id', gallery_controller_1.GalleryController.deleteGallery);
exports.default = router;
