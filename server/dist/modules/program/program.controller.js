"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramController = void 0;
const program_service_1 = require("./program.service");
const program_validation_1 = require("./program.validation");
const response_1 = require("../../utils/response");
class ProgramController {
    static async createProgram(req, res, next) {
        try {
            const validatedData = program_validation_1.createProgramSchema.parse(req.body);
            const program = await program_service_1.ProgramService.createProgram(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Program created successfully', program);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async getAllPrograms(req, res, next) {
        try {
            const programs = await program_service_1.ProgramService.getAllPrograms();
            return (0, response_1.sendSuccess)(res, 200, 'Programs retrieved successfully', programs);
        }
        catch (error) {
            next(error);
        }
    }
    static async getProgramById(req, res, next) {
        try {
            const { id } = req.params;
            const program = await program_service_1.ProgramService.getProgramById(id);
            if (!program) {
                return res.status(404).json({ success: false, message: 'Program not found' });
            }
            return (0, response_1.sendSuccess)(res, 200, 'Program retrieved successfully', program);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateProgram(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = program_validation_1.updateProgramSchema.parse(req.body);
            const program = await program_service_1.ProgramService.updateProgram(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Program updated successfully', program);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async deleteProgram(req, res, next) {
        try {
            const { id } = req.params;
            await program_service_1.ProgramService.deleteProgram(id);
            return (0, response_1.sendSuccess)(res, 200, 'Program deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProgramController = ProgramController;
