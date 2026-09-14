"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAboutSchema = exports.createAboutSchema = void 0;
const zod_1 = require("zod");
exports.createAboutSchema = zod_1.z.object({
    badge: zod_1.z.string().optional(),
    headingLine1: zod_1.z.string().min(1, 'Heading Line 1 is required'),
    headingLine2: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    checklist: zod_1.z.any().optional(),
    images: zod_1.z.any().optional(),
    status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).optional()
});
exports.updateAboutSchema = exports.createAboutSchema.partial();
