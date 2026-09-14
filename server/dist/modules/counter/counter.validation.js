"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCounterSchema = exports.createCounterSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createCounterSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, 'Label is required'),
    value: zod_1.z.string().min(1, 'Value is required'),
    suffix: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.CounterStatus).optional(),
    displayOrder: zod_1.z.number().int().optional(),
});
exports.updateCounterSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, 'Label is required').optional(),
    value: zod_1.z.string().min(1, 'Value is required').optional(),
    suffix: zod_1.z.string().optional(),
    icon: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(client_1.CounterStatus).optional(),
    displayOrder: zod_1.z.number().int().optional(),
});
