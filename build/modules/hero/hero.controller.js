"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroController = void 0;
const hero_service_1 = require("./hero.service");
const response_1 = require("../../utils/response");
const hero_validation_1 = require("./hero.validation");
class HeroController {
    static async createHero(req, res, next) {
        try {
            const validatedData = hero_validation_1.createHeroSchema.parse(req.body);
            const newHero = await hero_service_1.HeroService.createHero(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Hero section created successfully!', newHero);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async getAllHeroes(req, res, next) {
        try {
            const heroes = await hero_service_1.HeroService.getAllHeroes();
            return (0, response_1.sendSuccess)(res, 200, 'Hero sections retrieved successfully', heroes);
        }
        catch (error) {
            next(error);
        }
    }
    static async getHeroById(req, res, next) {
        try {
            const { id } = req.params;
            const hero = await hero_service_1.HeroService.getHeroById(id);
            return (0, response_1.sendSuccess)(res, 200, 'Hero section retrieved successfully', hero);
        }
        catch (error) {
            if (error.message === 'Hero section not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async updateHero(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = hero_validation_1.updateHeroSchema.parse(req.body);
            const updatedHero = await hero_service_1.HeroService.updateHero(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Hero section updated successfully!', updatedHero);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            if (error.message === 'Hero section not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async deleteHero(req, res, next) {
        try {
            const { id } = req.params;
            await hero_service_1.HeroService.deleteHero(id);
            return (0, response_1.sendSuccess)(res, 200, 'Hero section deleted successfully!');
        }
        catch (error) {
            if (error.message === 'Hero section not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async bulkDeleteHeroes(req, res, next) {
        try {
            const { ids } = req.body;
            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ success: false, message: 'Please provide an array of IDs' });
            }
            const result = await hero_service_1.HeroService.bulkDeleteHeroes(ids);
            return (0, response_1.sendSuccess)(res, 200, `${result.count} hero sections deleted successfully!`);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.HeroController = HeroController;
