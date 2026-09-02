"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const assessment_controller_1 = require("./assessment.controller");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../../public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
/**
 * @swagger
 * tags:
 *   name: Assessments
 *   description: Assessment application endpoints
 */
/**
 * @swagger
 * /api/assessments:
 *   post:
 *     summary: Submit a new assessment
 *     tags: [Assessments]
 *     responses:
 *       201:
 *         description: Application submitted successfully
 */
router.post('/', upload.fields([{ name: 'bloodReport', maxCount: 1 }, { name: 'physiqueImage', maxCount: 1 }]), assessment_controller_1.AssessmentController.createAssessment);
/**
 * @swagger
 * /api/assessments:
 *   get:
 *     summary: Get all assessments (admin)
 *     tags: [Assessments]
 *     responses:
 *       200:
 *         description: List of assessments
 */
router.get('/', assessment_controller_1.AssessmentController.getAllAssessments);
/**
 * @swagger
 * /api/assessments/{id}:
 *   get:
 *     summary: Get assessment by ID
 *     tags: [Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment details
 *       404:
 *         description: Assessment not found
 */
router.get('/:id', assessment_controller_1.AssessmentController.getAssessmentById);
/**
 * @swagger
 * /api/assessments/{id}:
 *   patch:
 *     summary: Update assessment status or notes
 *     tags: [Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment updated successfully
 */
router.patch('/:id', assessment_controller_1.AssessmentController.updateAssessment);
/**
 * @swagger
 * /api/assessments/{id}:
 *   delete:
 *     summary: Soft delete assessment
 *     tags: [Assessments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assessment deleted successfully
 */
router.delete('/:id', assessment_controller_1.AssessmentController.deleteAssessment);
router.post('/bulk-delete', assessment_controller_1.AssessmentController.bulkDelete);
exports.default = router;
