"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramSchema = exports.createProgramSchema = void 0;
const zod_1 = require("zod");
exports.createProgramSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    shortDescription: zod_1.z.string().min(1, 'Short description is required'),
    image: zod_1.z.string().min(1, 'Image is required'),
    icon: zod_1.z.string().min(1, 'Icon is required'),
    isFeatured: zod_1.z.boolean().optional(),
    status: zod_1.z.enum(['ACTIVE', 'INACTIVE']).optional(),
    displayOrder: zod_1.z.number().int().optional(),
    featuredItem1Title: zod_1.z.string().nullable().optional(),
    featuredItem1Icon: zod_1.z.string().nullable().optional(),
    featuredItem2Title: zod_1.z.string().nullable().optional(),
    featuredItem2Icon: zod_1.z.string().nullable().optional(),
    featuredItem3Title: zod_1.z.string().nullable().optional(),
    featuredItem3Icon: zod_1.z.string().nullable().optional(),
    featuredItem4Title: zod_1.z.string().nullable().optional(),
    featuredItem4Icon: zod_1.z.string().nullable().optional(),
});
exports.updateProgramSchema = exports.createProgramSchema.partial();
