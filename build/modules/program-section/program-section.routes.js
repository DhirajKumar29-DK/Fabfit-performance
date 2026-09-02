"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const program_section_controller_1 = require("./program-section.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Program Section
 *   description: Program Section content endpoints
 */
/**
 * @swagger
 * /api/program-section:
 *   post:
 *     summary: Create a new program section config
 *     tags: [Program Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badge: { type: string }
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [ACTIVE, INACTIVE] }
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', program_section_controller_1.ProgramSectionController.createSection);
/**
 * @swagger
 * /api/program-section:
 *   get:
 *     summary: Get all program sections
 *     tags: [Program Section]
 *     responses:
 *       200:
 *         description: List of program sections
 */
router.get('/', program_section_controller_1.ProgramSectionController.getAllSections);
/**
 * @swagger
 * /api/program-section/{id}:
 *   get:
 *     summary: Get program section by ID
 *     tags: [Program Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Program section details
 */
router.get('/:id', program_section_controller_1.ProgramSectionController.getSectionById);
/**
 * @swagger
 * /api/program-section/{id}:
 *   patch:
 *     summary: Update a program section
 *     tags: [Program Section]
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
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [ACTIVE, INACTIVE] }
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch('/:id', program_section_controller_1.ProgramSectionController.updateSection);
/**
 * @swagger
 * /api/program-section/{id}:
 *   delete:
 *     summary: Soft delete program section
 *     tags: [Program Section]
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
router.delete('/:id', program_section_controller_1.ProgramSectionController.deleteSection);
exports.default = router;
