"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramSectionController = void 0;
const program_section_service_1 = require("./program-section.service");
const program_section_validation_1 = require("./program-section.validation");
const response_1 = require("../../utils/response");
class ProgramSectionController {
    static async createSection(req, res, next) {
        try {
            const validatedData = program_section_validation_1.createProgramSectionSchema.parse(req.body);
            const section = await program_section_service_1.ProgramSectionService.createSection(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Program section created successfully', section);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async getAllSections(req, res, next) {
        try {
            const sections = await program_section_service_1.ProgramSectionService.getAllSections();
            return (0, response_1.sendSuccess)(res, 200, 'Program sections retrieved successfully', sections);
        }
        catch (error) {
            next(error);
        }
    }
    static async getSectionById(req, res, next) {
        try {
            const { id } = req.params;
            const section = await program_section_service_1.ProgramSectionService.getSectionById(id);
            if (!section) {
                return res.status(404).json({ success: false, message: 'Program section not found' });
            }
            return (0, response_1.sendSuccess)(res, 200, 'Program section retrieved successfully', section);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateSection(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = program_section_validation_1.updateProgramSectionSchema.parse(req.body);
            const section = await program_section_service_1.ProgramSectionService.updateSection(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Program section updated successfully', section);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async deleteSection(req, res, next) {
        try {
            const { id } = req.params;
            await program_section_service_1.ProgramSectionService.deleteSection(id);
            return (0, response_1.sendSuccess)(res, 200, 'Program section deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProgramSectionController = ProgramSectionController;
