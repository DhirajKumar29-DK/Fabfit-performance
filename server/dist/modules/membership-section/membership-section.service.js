"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipSectionService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MembershipSectionService {
    async getActiveSection() {
        return await prisma.membershipSection.findFirst({
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
        return await prisma.membershipSection.create({
            data: {
                badge: data.badge,
                title: data.title,
                description: data.description,
                status: data.status || 'ACTIVE'
            },
        });
    }
    async updateSection(id, data) {
        return await prisma.membershipSection.update({
            where: { id },
            data,
        });
    }
    async deleteSection(id) {
        return await prisma.membershipSection.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                status: 'INACTIVE',
            },
        });
    }
}
exports.MembershipSectionService = MembershipSectionService;
