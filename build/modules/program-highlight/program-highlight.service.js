"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramHighlightService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProgramHighlightService {
    static async getAllHighlights() {
        return prisma.programHighlight.findMany({
            where: { deletedAt: null },
            orderBy: { displayOrder: 'asc' }
        });
    }
    static async getHighlightById(id) {
        return prisma.programHighlight.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createHighlight(data) {
        return prisma.programHighlight.create({
            data
        });
    }
    static async updateHighlight(id, data) {
        return prisma.programHighlight.update({
            where: { id },
            data
        });
    }
    static async deleteHighlight(id) {
        return prisma.programHighlight.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.ProgramHighlightService = ProgramHighlightService;
