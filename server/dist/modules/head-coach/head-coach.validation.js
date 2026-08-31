"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHeadCoachSchema = exports.createHeadCoachSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createHeadCoachSchema = zod_1.z.object({
    body: zod_1.z.object({
        coachName: zod_1.z.string().min(1, 'Coach name is required'),
        label: zod_1.z.string().min(1, 'Label is required'),
        subtitle: zod_1.z.string().min(1, 'Subtitle is required'),
        heading: zod_1.z.string().min(1, 'Heading is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        image: zod_1.z.string().min(1, 'Image is required'),
        badgeText: zod_1.z.string().optional().nullable(),
        ctaText: zod_1.z.string().min(1, 'CTA Text is required'),
        ctaLink: zod_1.z.string().min(1, 'CTA Link is required'),
        status: zod_1.z.nativeEnum(client_1.HeadCoachStatus).optional()
    }),
});
exports.updateHeadCoachSchema = zod_1.z.object({
    body: zod_1.z.object({
        coachName: zod_1.z.string().optional(),
        label: zod_1.z.string().optional(),
        subtitle: zod_1.z.string().optional(),
        heading: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        badgeText: zod_1.z.string().optional().nullable(),
        ctaText: zod_1.z.string().optional(),
        ctaLink: zod_1.z.string().optional(),
        status: zod_1.z.nativeEnum(client_1.HeadCoachStatus).optional()
    }),
});
