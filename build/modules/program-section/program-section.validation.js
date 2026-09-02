"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramSectionSchema = exports.createProgramSectionSchema = void 0;
const zod_1 = require("zod");
exports.createProgramSectionSchema = zod_1.z.object({
    badge: zod_1.z.string().min(1, 'Badge is required'),
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    status: zod_1.z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
});
exports.updateProgramSectionSchema = exports.createProgramSectionSchema.partial();
