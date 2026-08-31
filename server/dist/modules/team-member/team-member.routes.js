"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_member_controller_1 = require("./team-member.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/team-members:
 *   get:
 *     summary: Get all Team Members or active ones (public=true)
 *     tags: [TeamMember]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', team_member_controller_1.getTeamMembers);
/**
 * @swagger
 * /api/team-members/{id}:
 *   get:
 *     summary: Get Team Member by ID
 *     tags: [TeamMember]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', team_member_controller_1.getTeamMemberById);
/**
 * @swagger
 * /api/team-members:
 *   post:
 *     summary: Create a new Team Member
 *     tags: [TeamMember]
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', team_member_controller_1.createTeamMember);
/**
 * @swagger
 * /api/team-members/{id}:
 *   patch:
 *     summary: Update an existing Team Member
 *     tags: [TeamMember]
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch('/:id', team_member_controller_1.updateTeamMember);
/**
 * @swagger
 * /api/team-members/{id}:
 *   delete:
 *     summary: Soft delete a Team Member
 *     tags: [TeamMember]
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', team_member_controller_1.deleteTeamMember);
exports.default = router;
