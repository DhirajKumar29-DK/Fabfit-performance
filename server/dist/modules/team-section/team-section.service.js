"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamSectionService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class TeamSectionService {
    async getActiveTeamSection() {
        return prisma_1.default.teamSection.findFirst({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            }
        });
    }
    async getTeamSections() {
        return prisma_1.default.teamSection.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async getTeamSectionById(id) {
        return prisma_1.default.teamSection.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async createTeamSection(data) {
        if (data.status === 'ACTIVE') {
            await this.handleActiveStatus();
        }
        return prisma_1.default.teamSection.create({
            data
        });
    }
    async updateTeamSection(id, data) {
        if (data.status === 'ACTIVE') {
            await this.handleActiveStatus(id);
        }
        return prisma_1.default.teamSection.update({
            where: { id },
            data
        });
    }
    async deleteTeamSection(id) {
        return prisma_1.default.teamSection.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async handleActiveStatus(excludeId) {
        // If setting a new one as active, set other active ones to INACTIVE
        const whereClause = {
            status: 'ACTIVE',
            deletedAt: null
        };
        if (excludeId) {
            whereClause.id = { not: excludeId };
        }
        await prisma_1.default.teamSection.updateMany({
            where: whereClause,
            data: {
                status: 'INACTIVE'
            }
        });
    }
}
exports.TeamSectionService = TeamSectionService;
