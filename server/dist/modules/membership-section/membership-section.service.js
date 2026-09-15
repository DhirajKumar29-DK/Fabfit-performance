"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipSectionService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class MembershipSectionService {
    async getActiveSection() {
        return await prisma_1.default.membershipSection.findFirst({
            where: {
                deletedAt: null,
            },
            orderBy: [
                { status: 'asc' }, // ACTIVE first
                { updatedAt: 'desc' }
            ]
        });
    }
    async createSection(data) {
        return await prisma_1.default.membershipSection.create({
            data: {
                badge: data.badge,
                title: data.title,
                description: data.description,
                status: data.status || 'ACTIVE'
            },
        });
    }
    async updateSection(id, data) {
        return await prisma_1.default.membershipSection.update({
            where: { id },
            data,
        });
    }
    async deleteSection(id) {
        return await prisma_1.default.membershipSection.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                status: 'INACTIVE',
            },
        });
    }
}
exports.MembershipSectionService = MembershipSectionService;
