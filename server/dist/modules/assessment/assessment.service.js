"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const client_1 = require("@prisma/client");
class AssessmentService {
    static async createAssessment(data) {
        return await prisma_1.default.assessment.create({
            data: {
                ...data,
                status: client_1.AssessmentStatus.NEW
            }
        });
    }
    static async getAllAssessments() {
        return await prisma_1.default.assessment.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    static async getAssessmentById(id) {
        const assessment = await prisma_1.default.assessment.findFirst({
            where: { id, deletedAt: null }
        });
        if (!assessment) {
            throw new Error('Assessment not found');
        }
        return assessment;
    }
    static async updateAssessment(id, data) {
        // Ensure it exists and is not deleted
        await this.getAssessmentById(id);
        return await prisma_1.default.assessment.update({
            where: { id },
            data
        });
    }
    static async deleteAssessment(id) {
        // Ensure it exists and is not deleted
        await this.getAssessmentById(id);
        return await prisma_1.default.assessment.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
    static async bulkDeleteAssessments(ids) {
        return await prisma_1.default.assessment.updateMany({
            where: { id: { in: ids } },
            data: { deletedAt: new Date() }
        });
    }
}
exports.AssessmentService = AssessmentService;
