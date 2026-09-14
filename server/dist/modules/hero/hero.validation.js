"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHeroSchema = exports.createHeroSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createHeroSchema = zod_1.z.object({
    badge: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1, 'Title is required'),
    subtitle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    primaryButtonText: zod_1.z.string().optional(),
    primaryButtonLink: zod_1.z.string().optional(),
    secondaryButtonText: zod_1.z.string().optional(),
    secondaryButtonLink: zod_1.z.string().optional(),
    backgroundImage: zod_1.z.string().optional(),
    foregroundImage: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.HeroStatus).optional(),
    displayOrder: zod_1.z.number().int().optional()
});
exports.updateHeroSchema = exports.createHeroSchema.partial();
