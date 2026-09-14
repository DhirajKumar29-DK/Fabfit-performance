"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeatureSchema = exports.createFeatureSchema = exports.updateMembershipPlanSchema = exports.createMembershipPlanSchema = exports.featureSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.featureSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1, 'Title is required'),
    icon: zod_1.z.string().optional().nullable(),
    status: zod_1.z.nativeEnum(client_1.PlanStatus).default('ACTIVE'),
    displayOrder: zod_1.z.number().int().min(0).default(0),
});
exports.createMembershipPlanSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        duration: zod_1.z.number().int().positive('Duration must be positive'),
        price: zod_1.z.number().positive('Price must be positive'),
        pricePeriod: zod_1.z.string().min(1, 'Price period is required'),
        isPopular: zod_1.z.boolean().default(false),
        enquiryText: zod_1.z.string().min(1, 'Enquiry text is required'),
        enquiryLink: zod_1.z.string().min(1, 'Enquiry link is required'),
        status: zod_1.z.nativeEnum(client_1.PlanStatus).default('ACTIVE'),
        displayOrder: zod_1.z.number().int().min(0).default(0),
        features: zod_1.z.array(exports.featureSchema).optional().default([]),
    }),
});
exports.updateMembershipPlanSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid plan ID'),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        duration: zod_1.z.number().int().positive('Duration must be positive').optional(),
        price: zod_1.z.number().positive('Price must be positive').optional(),
        pricePeriod: zod_1.z.string().min(1, 'Price period is required').optional(),
        isPopular: zod_1.z.boolean().optional(),
        enquiryText: zod_1.z.string().min(1, 'Enquiry text is required').optional(),
        enquiryLink: zod_1.z.string().min(1, 'Enquiry link is required').optional(),
        status: zod_1.z.nativeEnum(client_1.PlanStatus).optional(),
        displayOrder: zod_1.z.number().int().min(0).optional(),
        features: zod_1.z.array(exports.featureSchema).optional(),
    }),
});
exports.createFeatureSchema = zod_1.z.object({
    params: zod_1.z.object({
        planId: zod_1.z.string().uuid('Invalid plan ID'),
    }),
    body: exports.featureSchema.omit({ id: true }),
});
exports.updateFeatureSchema = zod_1.z.object({
    params: zod_1.z.object({
        planId: zod_1.z.string().uuid('Invalid plan ID'),
        featureId: zod_1.z.string().uuid('Invalid feature ID'),
    }),
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required').optional(),
        icon: zod_1.z.string().optional().nullable(),
        status: zod_1.z.nativeEnum(client_1.PlanStatus).optional(),
        displayOrder: zod_1.z.number().int().min(0).optional(),
    }),
});
