"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialService = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
class TestimonialService {
    async getAll(status) {
        const where = status
            ? { status, deletedAt: null }
            : { deletedAt: null };
        return prisma_1.default.testimonial.findMany({
            where,
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getById(id) {
        return prisma_1.default.testimonial.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async create(data) {
        return prisma_1.default.testimonial.create({ data });
    }
    async update(id, data) {
        const existing = await prisma_1.default.testimonial.findUnique({
            where: { id, deletedAt: null },
        });
        if (!existing)
            throw new Error('Testimonial not found');
        return prisma_1.default.testimonial.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const existing = await prisma_1.default.testimonial.findUnique({
            where: { id, deletedAt: null },
        });
        if (!existing)
            throw new Error('Testimonial not found');
        return prisma_1.default.testimonial.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
exports.TestimonialService = TestimonialService;
