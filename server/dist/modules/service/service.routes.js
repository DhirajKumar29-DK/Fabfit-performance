"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all Services or active ones (public=true)
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', service_controller_1.getServices);
/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get Service by ID or Slug
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', service_controller_1.getServiceByIdOrSlug);
/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new Service
 *     tags: [Service]
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', service_controller_1.createService);
/**
 * @swagger
 * /api/services/{id}:
 *   patch:
 *     summary: Update an existing Service
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch('/:id', service_controller_1.updateService);
/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Soft delete a Service
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', service_controller_1.deleteService);
exports.default = router;
