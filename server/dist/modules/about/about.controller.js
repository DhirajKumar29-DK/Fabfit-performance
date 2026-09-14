"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutController = void 0;
const about_service_1 = require("./about.service");
const about_validation_1 = require("./about.validation");
const response_1 = require("../../utils/response");
class AboutController {
    static async getActiveAbout(req, res, next) {
        try {
            const about = await about_service_1.AboutService.getActiveAbout();
            return (0, response_1.sendSuccess)(res, 200, 'Active About retrieved successfully', about);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllAbouts(req, res, next) {
        try {
            const abouts = await about_service_1.AboutService.getAllAbouts();
            return (0, response_1.sendSuccess)(res, 200, 'All About entries retrieved successfully', abouts);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAboutById(req, res, next) {
        try {
            const { id } = req.params;
            const about = await about_service_1.AboutService.getAboutById(id);
            if (!about) {
                return res.status(404).json({ success: false, message: 'About entry not found' });
            }
            return (0, response_1.sendSuccess)(res, 200, 'About entry retrieved successfully', about);
        }
        catch (error) {
            next(error);
        }
    }
    static async createAbout(req, res, next) {
        try {
            const validatedData = about_validation_1.createAboutSchema.parse(req.body);
            const about = await about_service_1.AboutService.createAbout(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'About entry created successfully', about);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async updateAbout(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = about_validation_1.updateAboutSchema.parse(req.body);
            const about = await about_service_1.AboutService.updateAbout(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'About entry updated successfully', about);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async deleteAbout(req, res, next) {
        try {
            const { id } = req.params;
            await about_service_1.AboutService.deleteAbout(id);
            return (0, response_1.sendSuccess)(res, 200, 'About entry deleted successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AboutController = AboutController;
