"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transformationController = __importStar(require("./transformation.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Transformation Cards
 *   description: Transformation Cards management API (Main & Real Progress)
 */
/**
 * @swagger
 * /api/transformations:
 *   post:
 *     summary: Create a new transformation card
 *     tags: [Transformation Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', transformationController.createTransformation);
/**
 * @swagger
 * /api/transformations:
 *   get:
 *     summary: Get all transformation cards
 *     tags: [Transformation Cards]
 *     parameters:
 *       - in: query
 *         name: public
 *         schema:
 *           type: boolean
 *         description: If true, returns only ACTIVE and non-deleted cards
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', transformationController.getTransformations);
/**
 * @swagger
 * /api/transformations/{id}:
 *   get:
 *     summary: Get transformation card by ID
 *     tags: [Transformation Cards]
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
router.get('/:id', transformationController.getTransformationById);
/**
 * @swagger
 * /api/transformations/slug/{slug}:
 *   get:
 *     summary: Get transformation card by Slug
 *     tags: [Transformation Cards]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/slug/:slug', transformationController.getTransformationBySlug);
/**
 * @swagger
 * /api/transformations/{id}:
 *   patch:
 *     summary: Update a transformation card
 *     tags: [Transformation Cards]
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
 *     responses:
 *       200:
 *         description: Success
 */
router.patch('/:id', transformationController.updateTransformation);
/**
 * @swagger
 * /api/transformations/{id}:
 *   delete:
 *     summary: Soft delete transformation card
 *     tags: [Transformation Cards]
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
router.delete('/:id', transformationController.deleteTransformation);
exports.default = router;
