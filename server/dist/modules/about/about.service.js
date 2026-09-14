"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AboutService {
    static async getActiveAbout() {
        const about = await prisma.about.findFirst({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            }
        });
        return about;
    }
    static async getAllAbouts() {
        return prisma.about.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' }
        });
    }
    static async getAboutById(id) {
        return prisma.about.findFirst({
            where: { id, deletedAt: null }
        });
    }
    static async createAbout(data) {
        return prisma.about.create({
            data
        });
    }
    static async updateAbout(id, data) {
        return prisma.about.update({
            where: { id },
            data
        });
    }
    static async deleteAbout(id) {
        return prisma.about.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'INACTIVE' }
        });
    }
}
exports.AboutService = AboutService;
