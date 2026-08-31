"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TestimonialService {
    async getAll(status) {
        const where = status
            ? { status, deletedAt: null }
            : { deletedAt: null };
        return prisma.testimonial.findMany({
            where,
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getById(id) {
        return prisma.testimonial.findUnique({
            where: { id, deletedAt: null },
        });
    }
    async create(data) {
        return prisma.testimonial.create({ data });
    }
    async update(id, data) {
        const existing = await prisma.testimonial.findUnique({
            where: { id, deletedAt: null },
        });
        if (!existing)
            throw new Error('Testimonial not found');
        return prisma.testimonial.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const existing = await prisma.testimonial.findUnique({
            where: { id, deletedAt: null },
        });
        if (!existing)
            throw new Error('Testimonial not found');
        return prisma.testimonial.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
exports.TestimonialService = TestimonialService;
