"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class HeroService {
    static async createHero(data) {
        return await prisma_1.default.hero.create({
            data
        });
    }
    static async getAllHeroes() {
        return await prisma_1.default.hero.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                displayOrder: 'asc'
            }
        });
    }
    static async getHeroById(id) {
        const hero = await prisma_1.default.hero.findFirst({
            where: { id, deletedAt: null }
        });
        if (!hero) {
            throw new Error('Hero section not found');
        }
        return hero;
    }
    static async updateHero(id, data) {
        await this.getHeroById(id); // Ensure exists
        return await prisma_1.default.hero.update({
            where: { id },
            data
        });
    }
    static async deleteHero(id) {
        await this.getHeroById(id); // Ensure exists
        return await prisma_1.default.hero.update({
            where: { id },
            data: { deletedAt: new Date() }
        });
    }
    static async bulkDeleteHeroes(ids) {
        return await prisma_1.default.hero.updateMany({
            where: {
                id: { in: ids },
                deletedAt: null
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
exports.HeroService = HeroService;
