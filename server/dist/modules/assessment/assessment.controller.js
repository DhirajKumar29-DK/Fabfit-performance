"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentController = void 0;
const assessment_service_1 = require("./assessment.service");
const response_1 = require("../../utils/response");
const assessment_validation_1 = require("./assessment.validation");
class AssessmentController {
    static async createAssessment(req, res, next) {
        try {
            const data = { ...req.body };
            const files = req.files;
            if (files) {
                const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
                if (files['bloodReport'] && files['bloodReport'].length > 0) {
                    data.bloodReportUrl = `${baseUrl}/uploads/${files['bloodReport'][0].filename}`;
                }
                if (files['physiqueImage'] && files['physiqueImage'].length > 0) {
                    data.physiqueImageUrl = `${baseUrl}/uploads/${files['physiqueImage'][0].filename}`;
                }
            }
            const validatedData = assessment_validation_1.createAssessmentSchema.parse(data);
            const newAssessment = await assessment_service_1.AssessmentService.createAssessment(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Application submitted successfully!', newAssessment);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async getAllAssessments(req, res, next) {
        try {
            const assessments = await assessment_service_1.AssessmentService.getAllAssessments();
            return (0, response_1.sendSuccess)(res, 200, 'Assessments retrieved successfully', assessments);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAssessmentById(req, res, next) {
        try {
            const { id } = req.params;
            const assessment = await assessment_service_1.AssessmentService.getAssessmentById(id);
            return (0, response_1.sendSuccess)(res, 200, 'Assessment retrieved successfully', assessment);
        }
        catch (error) {
            if (error.message === 'Assessment not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async updateAssessment(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = assessment_validation_1.updateAssessmentSchema.parse(req.body);
            const updatedAssessment = await assessment_service_1.AssessmentService.updateAssessment(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Application updated successfully!', updatedAssessment);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            if (error.message === 'Assessment not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async deleteAssessment(req, res, next) {
        try {
            const { id } = req.params;
            await assessment_service_1.AssessmentService.deleteAssessment(id);
            return (0, response_1.sendSuccess)(res, 200, 'Application deleted successfully!');
        }
        catch (error) {
            if (error.message === 'Assessment not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async bulkDelete(req, res, next) {
        try {
            const { ids } = req.body;
            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ success: false, message: 'Please provide an array of IDs to delete' });
            }
            await assessment_service_1.AssessmentService.bulkDeleteAssessments(ids);
            return (0, response_1.sendSuccess)(res, 200, `${ids.length} applications deleted successfully!`);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AssessmentController = AssessmentController;
