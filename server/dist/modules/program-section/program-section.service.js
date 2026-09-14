"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramSectionService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProgramSectionService {
    static async getAllSections() {
        return prisma.programSection.findMany({
            where: { deletedAt: null }
        });
    }
    static async getSectionById(id) {
        return prisma.programSection.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createSection(data) {
        return prisma.programSection.create({
            data
        });
    }
    static async updateSection(id, data) {
        return prisma.programSection.update({
            where: { id },
            data
        });
    }
    static async deleteSection(id) {
        return prisma.programSection.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.ProgramSectionService = ProgramSectionService;
