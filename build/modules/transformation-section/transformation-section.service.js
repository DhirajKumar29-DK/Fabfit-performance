"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformationSectionService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class TransformationSectionService {
    async getActiveSection() {
        return prisma_1.default.transformationSection.findFirst({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getAllSections() {
        return prisma_1.default.transformationSection.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getSectionById(id) {
        return prisma_1.default.transformationSection.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async createSection(data) {
        return prisma_1.default.transformationSection.create({
            data
        });
    }
    async updateSection(id, data) {
        return prisma_1.default.transformationSection.update({
            where: { id },
            data
        });
    }
    async deleteSection(id) {
        return prisma_1.default.transformationSection.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
exports.TransformationSectionService = TransformationSectionService;
