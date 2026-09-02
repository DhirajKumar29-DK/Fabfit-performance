"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_section_controller_1 = require("./team-section.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/team-section:
 *   get:
 *     summary: Get all Team Sections or active one (public=true)
 *     tags: [TeamSection]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', team_section_controller_1.getTeamSections);
/**
 * @swagger
 * /api/team-section/{id}:
 *   get:
 *     summary: Get Team Section by ID
 *     tags: [TeamSection]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', team_section_controller_1.getTeamSectionById);
/**
 * @swagger
 * /api/team-section:
 *   post:
 *     summary: Create a new Team Section
 *     tags: [TeamSection]
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', team_section_controller_1.createTeamSection);
/**
 * @swagger
 * /api/team-section/{id}:
 *   patch:
 *     summary: Update an existing Team Section
 *     tags: [TeamSection]
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch('/:id', team_section_controller_1.updateTeamSection);
/**
 * @swagger
 * /api/team-section/{id}:
 *   delete:
 *     summary: Soft delete a Team Section
 *     tags: [TeamSection]
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', team_section_controller_1.deleteTeamSection);
exports.default = router;
