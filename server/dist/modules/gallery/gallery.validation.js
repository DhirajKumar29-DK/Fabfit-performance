"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGallerySchema = exports.createGallerySchema = void 0;
const zod_1 = require("zod");
exports.createGallerySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    category: zod_1.z.string().min(1, 'Category is required').toUpperCase(),
    description: zod_1.z.string().optional(),
    type: zod_1.z.enum(['IMAGE', 'VIDEO']),
    mediaUrl: zod_1.z.string().min(1, 'Media URL is required'),
    thumbnailUrl: zod_1.z.string().optional(),
    isFeatured: zod_1.z.boolean().optional().default(false),
    status: zod_1.z.enum(['DRAFT', 'ACTIVE', 'INACTIVE']).default('ACTIVE'),
    displayOrder: zod_1.z.number().int().min(0).default(0),
});
exports.updateGallerySchema = exports.createGallerySchema.partial();
