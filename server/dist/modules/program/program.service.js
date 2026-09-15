"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class ProgramService {
    static async getAllPrograms() {
        return prisma_1.default.program.findMany({
            where: { deletedAt: null },
            orderBy: { displayOrder: 'asc' }
        });
    }
    static async getProgramById(id) {
        return prisma_1.default.program.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createProgram(data) {
        return prisma_1.default.program.create({
            data
        });
    }
    static async updateProgram(id, data) {
        return prisma_1.default.program.update({
            where: { id },
            data
        });
    }
    static async deleteProgram(id) {
        return prisma_1.default.program.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.ProgramService = ProgramService;
