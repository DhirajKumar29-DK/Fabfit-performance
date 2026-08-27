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
const counterController = __importStar(require("./counter.controller"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Counters
 *   description: Counter management endpoints
 */
/**
 * @swagger
 * /api/counters:
 *   post:
 *     summary: Create a new counter
 *     tags: [Counters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - label
 *               - value
 *             properties:
 *               label:
 *                 type: string
 *               value:
 *                 type: string
 *               suffix:
 *                 type: string
 *               icon:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DRAFT, ACTIVE, INACTIVE]
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Counter created successfully
 */
router.post('/', counterController.createCounter);
/**
 * @swagger
 * /api/counters:
 *   get:
 *     summary: Get all counters
 *     tags: [Counters]
 *     responses:
 *       200:
 *         description: List of counters
 */
router.get('/', counterController.getAllCounters);
/**
 * @swagger
 * /api/counters/{id}:
 *   get:
 *     summary: Get counter by ID
 *     tags: [Counters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Counter details
 *       404:
 *         description: Counter not found
 */
router.get('/:id', counterController.getCounterById);
/**
 * @swagger
 * /api/counters/{id}:
 *   put:
 *     summary: Update a counter
 *     tags: [Counters]
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
 *               label:
 *                 type: string
 *               value:
 *                 type: string
 *               suffix:
 *                 type: string
 *               icon:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [DRAFT, ACTIVE, INACTIVE]
 *               displayOrder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Counter updated successfully
 *       404:
 *         description: Counter not found
 */
router.put('/:id', counterController.updateCounter);
/**
 * @swagger
 * /api/counters/{id}:
 *   delete:
 *     summary: Delete a counter (soft delete)
 *     tags: [Counters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Counter deleted successfully
 *       404:
 *         description: Counter not found
 */
/**
 * @swagger
 * /api/counters/bulk-delete:
 *   post:
 *     summary: Bulk delete counters
 *     tags: [Counters]
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
 *         description: Counter deleted successfully
 *       400:
 *         description: Bad request
 */
router.post('/bulk-delete', counterController.bulkDelete);
router.delete('/:id', counterController.deleteCounter);
exports.default = router;
