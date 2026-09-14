"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTestimonialSchema = exports.createTestimonialSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createTestimonialSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        profession: zod_1.z.string().min(1, 'Profession is required'),
        quote: zod_1.z.string().min(1, 'Quote is required'),
        image: zod_1.z.string().optional().nullable(),
        stat1Value: zod_1.z.string().optional().nullable(),
        stat1Label: zod_1.z.string().optional().nullable(),
        stat1Icon: zod_1.z.string().optional().nullable(),
        stat2Value: zod_1.z.string().optional().nullable(),
        stat2Label: zod_1.z.string().optional().nullable(),
        stat2Icon: zod_1.z.string().optional().nullable(),
        stat3Value: zod_1.z.string().optional().nullable(),
        stat3Label: zod_1.z.string().optional().nullable(),
        stat3Icon: zod_1.z.string().optional().nullable(),
        status: zod_1.z.nativeEnum(client_1.TestimonialStatus).default('ACTIVE'),
        displayOrder: zod_1.z.number().int().min(0).default(0),
    }),
});
exports.updateTestimonialSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid testimonial ID'),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).optional(),
        profession: zod_1.z.string().min(1).optional(),
        quote: zod_1.z.string().min(1).optional(),
        image: zod_1.z.string().optional().nullable(),
        stat1Value: zod_1.z.string().optional().nullable(),
        stat1Label: zod_1.z.string().optional().nullable(),
        stat1Icon: zod_1.z.string().optional().nullable(),
        stat2Value: zod_1.z.string().optional().nullable(),
        stat2Label: zod_1.z.string().optional().nullable(),
        stat2Icon: zod_1.z.string().optional().nullable(),
        stat3Value: zod_1.z.string().optional().nullable(),
        stat3Label: zod_1.z.string().optional().nullable(),
        stat3Icon: zod_1.z.string().optional().nullable(),
        status: zod_1.z.nativeEnum(client_1.TestimonialStatus).optional(),
        displayOrder: zod_1.z.number().int().min(0).optional(),
    }),
});
