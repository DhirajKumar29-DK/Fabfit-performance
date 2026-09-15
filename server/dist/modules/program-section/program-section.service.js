"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramSectionService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class ProgramSectionService {
    static async getAllSections() {
        return prisma_1.default.programSection.findMany({
            where: { deletedAt: null }
        });
    }
    static async getSectionById(id) {
        return prisma_1.default.programSection.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createSection(data) {
        return prisma_1.default.programSection.create({
            data
        });
    }
    static async updateSection(id, data) {
        return prisma_1.default.programSection.update({
            where: { id },
            data
        });
    }
    static async deleteSection(id) {
        return prisma_1.default.programSection.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.ProgramSectionService = ProgramSectionService;
