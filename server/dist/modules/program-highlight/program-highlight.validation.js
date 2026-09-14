"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramHighlightSchema = exports.createProgramHighlightSchema = void 0;
const zod_1 = require("zod");
exports.createProgramHighlightSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    icon: zod_1.z.string().min(1, 'Icon is required'),
    status: zod_1.z.enum(['ACTIVE', 'INACTIVE']).optional(),
    displayOrder: zod_1.z.number().int().optional(),
});
exports.updateProgramHighlightSchema = exports.createProgramHighlightSchema.partial();
