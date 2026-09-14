"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamMemberSchema = exports.createTeamMemberSchema = void 0;
const zod_1 = require("zod");
exports.createTeamMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        category: zod_1.z.string().min(1, 'Category is required'),
        specialization: zod_1.z.string().min(1, 'Specialization is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        image: zod_1.z.string().min(1, 'Image is required'),
        instagramUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
        facebookUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
        status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
        displayOrder: zod_1.z.number().int().optional(),
    }),
});
exports.updateTeamMemberSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        specialization: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        instagramUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
        facebookUrl: zod_1.z.string().url('Must be a valid URL').optional().or(zod_1.z.literal('')),
        status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
        displayOrder: zod_1.z.number().int().optional(),
    }),
});
