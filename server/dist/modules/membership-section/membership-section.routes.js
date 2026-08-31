"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const membership_section_controller_1 = require("./membership-section.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: MembershipSection
 *   description: Membership section management
 */
/**
 * @swagger
 * /api/membership-section:
 *   get:
 *     summary: Get the active membership section
 *     tags: [MembershipSection]
 *     responses:
 *       200:
 *         description: Active membership section retrieved successfully
 */
router.get('/', membership_section_controller_1.MembershipSectionController.getActiveSection);
/**
 * @swagger
 * /api/membership-section:
 *   post:
 *     summary: Create a new membership section
 *     tags: [MembershipSection]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - badge
 *               - title
 *               - description
 *             properties:
 *               badge:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *     responses:
 *       201:
 *         description: Membership section created successfully
 */
router.post('/', membership_section_controller_1.MembershipSectionController.createSection);
/**
 * @swagger
 * /api/membership-section/{id}:
 *   patch:
 *     summary: Update an existing membership section
 *     tags: [MembershipSection]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The section id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               badge:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *     responses:
 *       200:
 *         description: Membership section updated successfully
 */
router.patch('/:id', membership_section_controller_1.MembershipSectionController.updateSection);
/**
 * @swagger
 * /api/membership-section/{id}:
 *   delete:
 *     summary: Soft delete a membership section
 *     tags: [MembershipSection]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The section id
 *     responses:
 *       200:
 *         description: Membership section deleted successfully
 */
router.delete('/:id', membership_section_controller_1.MembershipSectionController.deleteSection);
exports.default = router;
