"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialController = void 0;
const testimonial_service_1 = require("./testimonial.service");
const response_1 = require("../../utils/response");
const service = new testimonial_service_1.TestimonialService();
class TestimonialController {
    async getAll(req, res) {
        try {
            const status = req.query.status;
            const testimonials = await service.getAll(status);
            return (0, response_1.sendSuccess)(res, 200, 'Testimonials retrieved successfully', testimonials);
        }
        catch (error) {
            console.error('Get testimonials error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to retrieve testimonials');
        }
    }
    async getById(req, res) {
        try {
            const testimonial = await service.getById(req.params.id);
            if (!testimonial)
                return (0, response_1.sendError)(res, 404, 'Testimonial not found');
            return (0, response_1.sendSuccess)(res, 200, 'Testimonial retrieved successfully', testimonial);
        }
        catch (error) {
            console.error('Get testimonial by ID error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to retrieve testimonial');
        }
    }
    async create(req, res) {
        try {
            const testimonial = await service.create(req.body);
            return (0, response_1.sendSuccess)(res, 201, 'Testimonial created successfully', testimonial);
        }
        catch (error) {
            console.error('Create testimonial error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to create testimonial');
        }
    }
    async update(req, res) {
        try {
            const testimonial = await service.update(req.params.id, req.body);
            return (0, response_1.sendSuccess)(res, 200, 'Testimonial updated successfully', testimonial);
        }
        catch (error) {
            console.error('Update testimonial error:', error);
            if (error.message === 'Testimonial not found') {
                return (0, response_1.sendError)(res, 404, 'Testimonial not found');
            }
            return (0, response_1.sendError)(res, 500, 'Failed to update testimonial');
        }
    }
    async delete(req, res) {
        try {
            await service.delete(req.params.id);
            return (0, response_1.sendSuccess)(res, 200, 'Testimonial deleted successfully', null);
        }
        catch (error) {
            console.error('Delete testimonial error:', error);
            if (error.message === 'Testimonial not found') {
                return (0, response_1.sendError)(res, 404, 'Testimonial not found');
            }
            return (0, response_1.sendError)(res, 500, 'Failed to delete testimonial');
        }
    }
}
exports.TestimonialController = TestimonialController;
