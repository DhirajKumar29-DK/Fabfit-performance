"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class TeamMemberService {
    async getActiveTeamMembers() {
        return prisma_1.default.teamMember.findMany({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            },
            orderBy: {
                displayOrder: 'asc'
            }
        });
    }
    async getTeamMembers() {
        return prisma_1.default.teamMember.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                displayOrder: 'asc'
            }
        });
    }
    async getTeamMemberById(id) {
        return prisma_1.default.teamMember.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async createTeamMember(data) {
        return prisma_1.default.teamMember.create({
            data
        });
    }
    async updateTeamMember(id, data) {
        return prisma_1.default.teamMember.update({
            where: { id },
            data
        });
    }
    async deleteTeamMember(id) {
        return prisma_1.default.teamMember.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
exports.TeamMemberService = TeamMemberService;
