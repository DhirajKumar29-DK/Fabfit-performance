"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hero_controller_1 = require("./hero.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Heroes
 *   description: Hero section management endpoints
 */
/**
 * @swagger
 * /api/heroes:
 *   post:
 *     summary: Create a new hero section
 *     tags: [Heroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               badge: { type: string }
 *               subtitle: { type: string }
 *               description: { type: string }
 *               primaryButtonText: { type: string }
 *               primaryButtonLink: { type: string }
 *               secondaryButtonText: { type: string }
 *               secondaryButtonLink: { type: string }
 *               backgroundImage: { type: string }
 *               foregroundImage: { type: string }
 *               status: { type: string, enum: [DRAFT, ACTIVE, INACTIVE] }
 *               displayOrder: { type: number }
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post('/', hero_controller_1.HeroController.createHero);
/**
 * @swagger
 * /api/heroes:
 *   get:
 *     summary: Get all hero sections
 *     tags: [Heroes]
 *     responses:
 *       200:
 *         description: List of hero sections
 */
router.get('/', hero_controller_1.HeroController.getAllHeroes);
/**
 * @swagger
 * /api/heroes:
 *   delete:
 *     summary: Bulk soft delete hero sections
 *     tags: [Heroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Bulk deleted successfully
 */
router.post('/bulk-delete', hero_controller_1.HeroController.bulkDeleteHeroes);
/**
 * @swagger
 * /api/heroes/{id}:
 *   get:
 *     summary: Get hero section by ID
 *     tags: [Heroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero section details
 */
router.get('/:id', hero_controller_1.HeroController.getHeroById);
/**
 * @swagger
 * /api/heroes/{id}:
 *   patch:
 *     summary: Update hero section
 *     tags: [Heroes]
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
 *               title: { type: string }
 *               status: { type: string, enum: [DRAFT, ACTIVE, INACTIVE] }
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch('/:id', hero_controller_1.HeroController.updateHero);
/**
 * @swagger
 * /api/heroes/{id}:
 *   delete:
 *     summary: Soft delete hero section
 *     tags: [Heroes]
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
router.delete('/:id', hero_controller_1.HeroController.deleteHero);
exports.default = router;
