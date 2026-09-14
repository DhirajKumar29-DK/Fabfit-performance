"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDeleteCounters = exports.hardDeleteCounter = exports.deleteCounter = exports.updateCounter = exports.getCounterById = exports.getAllCounters = exports.createCounter = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createCounter = async (data) => {
    return await prisma_1.default.counter.create({
        data,
    });
};
exports.createCounter = createCounter;
const getAllCounters = async (includeDeleted = false) => {
    return await prisma_1.default.counter.findMany({
        where: includeDeleted ? undefined : { deletedAt: null },
        orderBy: { displayOrder: 'asc' },
    });
};
exports.getAllCounters = getAllCounters;
const getCounterById = async (id) => {
    return await prisma_1.default.counter.findFirst({
        where: { id, deletedAt: null },
    });
};
exports.getCounterById = getCounterById;
const updateCounter = async (id, data) => {
    return await prisma_1.default.counter.update({
        where: { id },
        data,
    });
};
exports.updateCounter = updateCounter;
const deleteCounter = async (id) => {
    return await prisma_1.default.counter.update({
        where: { id },
        data: { deletedAt: new Date(), status: 'INACTIVE' },
    });
};
exports.deleteCounter = deleteCounter;
const hardDeleteCounter = async (id) => {
    return await prisma_1.default.counter.delete({
        where: { id },
    });
};
exports.hardDeleteCounter = hardDeleteCounter;
const bulkDeleteCounters = async (ids) => {
    return await prisma_1.default.counter.updateMany({
        where: { id: { in: ids } },
        data: { deletedAt: new Date(), status: 'INACTIVE' },
    });
};
exports.bulkDeleteCounters = bulkDeleteCounters;
