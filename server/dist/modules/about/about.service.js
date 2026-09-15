"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class AboutService {
    static async getActiveAbout() {
        const about = await prisma_1.default.about.findFirst({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            }
        });
        return about;
    }
    static async getAllAbouts() {
        return prisma_1.default.about.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' }
        });
    }
    static async getAboutById(id) {
        return prisma_1.default.about.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createAbout(data) {
        return prisma_1.default.about.create({
            data
        });
    }
    static async updateAbout(id, data) {
        return prisma_1.default.about.update({
            where: { id },
            data
        });
    }
    static async deleteAbout(id) {
        return prisma_1.default.about.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.AboutService = AboutService;
