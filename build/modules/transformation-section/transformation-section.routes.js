"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transformation_section_controller_1 = require("./transformation-section.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Transformation Section
 *   description: Transformation Section management API
 */
/**
 * @swagger
 * /api/transformation-section:
 *   get:
 *     summary: Get transformation sections
 *     tags: [Transformation Section]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', transformation_section_controller_1.getSections);
/**
 * @swagger
 * /api/transformation-section/{id}:
 *   get:
 *     summary: Get section by ID
 *     tags: [Transformation Section]
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
router.get('/:id', transformation_section_controller_1.getSectionById);
/**
 * @swagger
 * /api/transformation-section:
 *   post:
 *     summary: Create new transformation section
 *     tags: [Transformation Section]
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', transformation_section_controller_1.createSection);
/**
 * @swagger
 * /api/transformation-section/{id}:
 *   patch:
 *     summary: Update transformation section
 *     tags: [Transformation Section]
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
router.patch('/:id', transformation_section_controller_1.updateSection);
/**
 * @swagger
 * /api/transformation-section/{id}:
 *   delete:
 *     summary: Delete transformation section
 *     tags: [Transformation Section]
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
router.delete('/:id', transformation_section_controller_1.deleteSection);
exports.default = router;
