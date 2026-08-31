"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeamSectionSchema = exports.createTeamSectionSchema = void 0;
const zod_1 = require("zod");
exports.createTeamSectionSchema = zod_1.z.object({
    body: zod_1.z.object({
        badge: zod_1.z.string().min(1, 'Badge is required'),
        title: zod_1.z.string().min(1, 'Title is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
    }),
});
exports.updateTeamSectionSchema = zod_1.z.object({
    body: zod_1.z.object({
        badge: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional(),
    }),
});
