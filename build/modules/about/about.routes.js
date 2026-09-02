"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const about_controller_1 = require("./about.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: About
 *   description: About section management endpoints
 */
/**
 * @swagger
 * /api/about:
 *   post:
 *     summary: Create a new about entry
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badge: { type: string }
 *               headingLine1: { type: string }
 *               headingLine2: { type: string }
 *               description: { type: string }
 *               checklist:
 *                 type: array
 *                 items: { type: string }
 *               images:
 *                 type: array
 *                 items: { type: string }
 *               status: { type: string, enum: [DRAFT, ACTIVE, INACTIVE] }
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', about_controller_1.AboutController.createAbout);
/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get all about entries
 *     tags: [About]
 *     responses:
 *       200:
 *         description: List of about entries
 */
router.get('/', about_controller_1.AboutController.getAllAbouts);
/**
 * @swagger
 * /api/about/active:
 *   get:
 *     summary: Get the active about entry
 *     tags: [About]
 *     responses:
 *       200:
 *         description: Active about entry
 */
router.get('/active', about_controller_1.AboutController.getActiveAbout);
/**
 * @swagger
 * /api/about/{id}:
 *   get:
 *     summary: Get about entry by ID
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: About entry details
 */
router.get('/:id', about_controller_1.AboutController.getAboutById);
/**
 * @swagger
 * /api/about/{id}:
 *   patch:
 *     summary: Update about entry
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badge: { type: string }
 *               headingLine1: { type: string }
 *               headingLine2: { type: string }
 *               description: { type: string }
 *               checklist:
 *                 type: array
 *                 items: { type: string }
 *               images:
 *                 type: array
 *                 items: { type: string }
 *               status: { type: string, enum: [DRAFT, ACTIVE, INACTIVE] }
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch('/:id', about_controller_1.AboutController.updateAbout);
/**
 * @swagger
 * /api/about/{id}:
 *   delete:
 *     summary: Soft delete about entry
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', about_controller_1.AboutController.deleteAbout);
exports.default = router;
