"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDelete = exports.deleteCounter = exports.updateCounter = exports.getCounterById = exports.getAllCounters = exports.createCounter = void 0;
const counterService = __importStar(require("./counter.service"));
const counter_validation_1 = require("./counter.validation");
const response_1 = require("../../utils/response");
const createCounter = async (req, res, next) => {
    try {
        const validatedData = counter_validation_1.createCounterSchema.parse(req.body);
        const counter = await counterService.createCounter(validatedData);
        (0, response_1.sendSuccess)(res, 201, 'Counter created successfully', counter);
    }
    catch (error) {
        next(error);
    }
};
exports.createCounter = createCounter;
const getAllCounters = async (req, res, next) => {
    try {
        const counters = await counterService.getAllCounters();
        (0, response_1.sendSuccess)(res, 200, 'Counters retrieved successfully', counters);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCounters = getAllCounters;
const getCounterById = async (req, res, next) => {
    try {
        const counter = await counterService.getCounterById(req.params.id);
        if (!counter) {
            (0, response_1.sendError)(res, 404, 'Counter not found');
            return;
        }
        (0, response_1.sendSuccess)(res, 200, 'Counter retrieved successfully', counter);
    }
    catch (error) {
        next(error);
    }
};
exports.getCounterById = getCounterById;
const updateCounter = async (req, res, next) => {
    try {
        const validatedData = counter_validation_1.updateCounterSchema.parse(req.body);
        const existingCounter = await counterService.getCounterById(req.params.id);
        if (!existingCounter) {
            (0, response_1.sendError)(res, 404, 'Counter not found');
            return;
        }
        const counter = await counterService.updateCounter(req.params.id, validatedData);
        (0, response_1.sendSuccess)(res, 200, 'Counter updated successfully', counter);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCounter = updateCounter;
const deleteCounter = async (req, res, next) => {
    try {
        const existingCounter = await counterService.getCounterById(req.params.id);
        if (!existingCounter) {
            (0, response_1.sendError)(res, 404, 'Counter not found');
            return;
        }
        await counterService.deleteCounter(req.params.id);
        (0, response_1.sendSuccess)(res, 200, 'Counter deleted successfully', null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCounter = deleteCounter;
const bulkDelete = async (req, res, next) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            (0, response_1.sendError)(res, 400, 'Please provide an array of counter IDs to delete');
            return;
        }
        await counterService.bulkDeleteCounters(ids);
        (0, response_1.sendSuccess)(res, 200, `${ids.length} counters deleted successfully`, null);
    }
    catch (error) {
        next(error);
    }
};
exports.bulkDelete = bulkDelete;
