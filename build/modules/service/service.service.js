"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModuleService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class ServiceModuleService {
    async getActiveServices() {
        return prisma_1.default.service.findMany({
            where: {
                status: 'ACTIVE',
                deletedAt: null
            },
            orderBy: {
                displayOrder: 'asc'
            }
        });
    }
    async getAllServices() {
        return prisma_1.default.service.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                displayOrder: 'asc'
            }
        });
    }
    async getServiceById(id) {
        return prisma_1.default.service.findFirst({
            where: {
                id,
                deletedAt: null
            }
        });
    }
    async getServiceBySlug(slug) {
        return prisma_1.default.service.findFirst({
            where: {
                slug,
                deletedAt: null,
                status: 'ACTIVE'
            }
        });
    }
    async createService(data) {
        return prisma_1.default.service.create({
            data
        });
    }
    async updateService(id, data) {
        return prisma_1.default.service.update({
            where: { id },
            data
        });
    }
    async deleteService(id) {
        return prisma_1.default.service.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        });
    }
}
exports.ServiceModuleService = ServiceModuleService;
