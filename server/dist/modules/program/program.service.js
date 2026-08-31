"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProgramService {
    static async getAllPrograms() {
        return prisma.program.findMany({
            where: { deletedAt: null },
            orderBy: { displayOrder: 'asc' }
        });
    }
    static async getProgramById(id) {
        return prisma.program.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createProgram(data) {
        return prisma.program.create({
            data
        });
    }
    static async updateProgram(id, data) {
        return prisma.program.update({
            where: { id },
            data
        });
    }
    static async deleteProgram(id) {
        return prisma.program.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.ProgramService = ProgramService;
