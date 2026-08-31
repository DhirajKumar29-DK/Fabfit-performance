"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransformationSchema = exports.createTransformationSchema = void 0;
const zod_1 = require("zod");
exports.createTransformationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        slug: zod_1.z.string().min(1, 'Slug is required'),
        subtitle: zod_1.z.string().optional().nullable(),
        icon: zod_1.z.string().optional().nullable(),
        beforeImage: zod_1.z.string().min(1, 'Before Image is required'),
        afterImage: zod_1.z.string().min(1, 'After Image is required'),
        highlights: zod_1.z.array(zod_1.z.string()).optional().nullable(),
        stat1Value: zod_1.z.string().optional().nullable(),
        stat1Label: zod_1.z.string().optional().nullable(),
        stat2Value: zod_1.z.string().optional().nullable(),
        stat2Label: zod_1.z.string().optional().nullable(),
        showInMain: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
        displayOrder: zod_1.z.number().int().optional(),
    }),
});
exports.updateTransformationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        subtitle: zod_1.z.string().optional().nullable(),
        icon: zod_1.z.string().optional().nullable(),
        beforeImage: zod_1.z.string().optional(),
        afterImage: zod_1.z.string().optional(),
        highlights: zod_1.z.array(zod_1.z.string()).optional().nullable(),
        stat1Value: zod_1.z.string().optional().nullable(),
        stat1Label: zod_1.z.string().optional().nullable(),
        stat2Value: zod_1.z.string().optional().nullable(),
        stat2Label: zod_1.z.string().optional().nullable(),
        showInMain: zod_1.z.boolean().optional(),
        status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
        displayOrder: zod_1.z.number().int().optional(),
    }),
});
