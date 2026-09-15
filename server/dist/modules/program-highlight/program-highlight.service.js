"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramHighlightService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class ProgramHighlightService {
    static async getAllHighlights() {
        return prisma_1.default.programHighlight.findMany({
            where: { deletedAt: null },
            orderBy: { displayOrder: 'asc' }
        });
    }
    static async getHighlightById(id) {
        return prisma_1.default.programHighlight.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createHighlight(data) {
        return prisma_1.default.programHighlight.create({
            data
        });
    }
    static async updateHighlight(id, data) {
        return prisma_1.default.programHighlight.update({
            where: { id },
            data
        });
    }
    static async deleteHighlight(id) {
        return prisma_1.default.programHighlight.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.ProgramHighlightService = ProgramHighlightService;
