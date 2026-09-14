"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadCoachService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class HeadCoachService {
    async getHeadCoaches() {
        return prisma_1.default.headCoach.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getActiveHeadCoach() {
        return prisma_1.default.headCoach.findFirst({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            }
        });
    }
    async getHeadCoachById(id) {
        return prisma_1.default.headCoach.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async createHeadCoach(data) {
        return prisma_1.default.headCoach.create({
            data
        });
    }
    async updateHeadCoach(id, data) {
        return prisma_1.default.headCoach.update({
            where: { id },
            data
        });
    }
    async softDeleteHeadCoach(id) {
        return prisma_1.default.headCoach.update({
            where: { id },
            data: {
                status: 'INACTIVE',
                deletedAt: new Date()
            }
        });
    }
}
exports.HeadCoachService = HeadCoachService;
