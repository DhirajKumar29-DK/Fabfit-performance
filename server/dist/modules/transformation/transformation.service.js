"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteTransformation = exports.updateTransformation = exports.getTransformationBySlug = exports.getTransformationById = exports.getTransformations = exports.createTransformation = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const client_1 = require("@prisma/client");
const createTransformation = async (data) => {
    return prisma_1.default.transformation.create({
        data,
    });
};
exports.createTransformation = createTransformation;
const getTransformations = async (includeDrafts = false) => {
    const where = includeDrafts ? { deletedAt: null } : { deletedAt: null, status: client_1.TransformationStatus.ACTIVE };
    return prisma_1.default.transformation.findMany({
        where,
        orderBy: {
            displayOrder: 'asc',
        },
    });
};
exports.getTransformations = getTransformations;
const getTransformationById = async (id, includeDrafts = false) => {
    const where = { id, deletedAt: null };
    if (!includeDrafts) {
        where.status = client_1.TransformationStatus.ACTIVE;
    }
    return prisma_1.default.transformation.findFirst({
        where,
    });
};
exports.getTransformationById = getTransformationById;
const getTransformationBySlug = async (slug, includeDrafts = false) => {
    const where = { slug, deletedAt: null };
    if (!includeDrafts) {
        where.status = client_1.TransformationStatus.ACTIVE;
    }
    return prisma_1.default.transformation.findFirst({
        where,
    });
};
exports.getTransformationBySlug = getTransformationBySlug;
const updateTransformation = async (id, data) => {
    return prisma_1.default.transformation.update({
        where: { id },
        data,
    });
};
exports.updateTransformation = updateTransformation;
const softDeleteTransformation = async (id) => {
    return prisma_1.default.transformation.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
exports.softDeleteTransformation = softDeleteTransformation;
