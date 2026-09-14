"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const gallery_service_1 = require("./gallery.service");
const gallery_validation_1 = require("./gallery.validation");
const response_1 = require("../../utils/response");
class GalleryController {
    static async createGallery(req, res, next) {
        try {
            const validatedData = gallery_validation_1.createGallerySchema.parse(req.body);
            const item = await gallery_service_1.GalleryService.createGallery(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Gallery item created successfully!', item);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            next(error);
        }
    }
    static async getAllGallery(req, res, next) {
        try {
            const type = req.query.type;
            const items = await gallery_service_1.GalleryService.getAllGallery(type);
            return (0, response_1.sendSuccess)(res, 200, 'Gallery retrieved successfully', items);
        }
        catch (error) {
            next(error);
        }
    }
    static async getPreviewGallery(req, res, next) {
        try {
            const items = await gallery_service_1.GalleryService.getPreviewGallery();
            return (0, response_1.sendSuccess)(res, 200, 'Preview gallery retrieved successfully', items);
        }
        catch (error) {
            next(error);
        }
    }
    static async getGalleryById(req, res, next) {
        try {
            const { id } = req.params;
            const item = await gallery_service_1.GalleryService.getGalleryById(id);
            return (0, response_1.sendSuccess)(res, 200, 'Gallery item retrieved successfully', item);
        }
        catch (error) {
            if (error.message === 'Gallery item not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async updateGallery(req, res, next) {
        try {
            const { id } = req.params;
            const validatedData = gallery_validation_1.updateGallerySchema.parse(req.body);
            const updatedItem = await gallery_service_1.GalleryService.updateGallery(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Gallery item updated successfully!', updatedItem);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
            }
            if (error.message === 'Gallery item not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async deleteGallery(req, res, next) {
        try {
            const { id } = req.params;
            await gallery_service_1.GalleryService.deleteGallery(id);
            return (0, response_1.sendSuccess)(res, 200, 'Gallery item deleted successfully!');
        }
        catch (error) {
            if (error.message === 'Gallery item not found') {
                return res.status(404).json({ success: false, message: error.message });
            }
            next(error);
        }
    }
    static async bulkDelete(req, res, next) {
        try {
            const { ids } = req.body;
            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ success: false, message: 'Please provide an array of IDs to delete' });
            }
            await gallery_service_1.GalleryService.bulkDeleteGallery(ids);
            return (0, response_1.sendSuccess)(res, 200, `${ids.length} items deleted successfully!`);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.GalleryController = GalleryController;
