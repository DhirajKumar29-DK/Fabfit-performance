"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramHighlightController = void 0;
const program_highlight_service_1 = require("./program-highlight.service");
const program_highlight_validation_1 = require("./program-highlight.validation");
const response_1 = require("../../utils/response");
class ProgramHighlightController {
    static async createHighlight(req, res, next) {
        try {
            const validatedData = program_highlight_validation_1.createProgramHighlightSchema.parse(req.body);
            const highlight = await program_highlight_service_1.ProgramHighlightService.createHighlight(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Program highlight created successfully', highlight);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async getAllHighlights(req, res, next) {
        try {
            const highlights = await program_highlight_service_1.ProgramHighlightService.getAllHighlights();
            return (0, response_1.sendSuccess)(res, 200, 'Program highlights retrieved successfully', highlights);
        }
        catch (error) {
            next(error);
        }
    }
    static async getHighlightById(req, res, next) {
        try {
            const { id } = req.params;
            const highlight = await program_highlight_service_1.ProgramHighlightService.getHighlightById(id);
            if (!highlight) {
                return res.status(404).json({ success: false, message: 'Program highlight not found' });
            }
            return (0, response_1.sendSuccess)(res, 200, 'Program highlight retrieved successfully', highlight);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateHighlight(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = program_highlight_validation_1.updateProgramHighlightSchema.parse(req.body);
            const highlight = await program_highlight_service_1.ProgramHighlightService.updateHighlight(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Program highlight updated successfully', highlight);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async deleteHighlight(req, res, next) {
        try {
            const { id } = req.params;
            await program_highlight_service_1.ProgramHighlightService.deleteHighlight(id);
            return (0, response_1.sendSuccess)(res, 200, 'Program highlight deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProgramHighlightController = ProgramHighlightController;
