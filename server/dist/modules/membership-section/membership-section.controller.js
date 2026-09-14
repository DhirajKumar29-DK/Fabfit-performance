"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipSectionController = void 0;
const membership_section_service_1 = require("./membership-section.service");
const response_1 = require("../../utils/response");
const membership_section_validation_1 = require("./membership-section.validation");
const membershipSectionService = new membership_section_service_1.MembershipSectionService();
class MembershipSectionController {
    static async getActiveSection(req, res) {
        try {
            const section = await membershipSectionService.getActiveSection();
            if (!section) {
                return (0, response_1.sendSuccess)(res, 200, 'No active membership section found', null);
            }
            return (0, response_1.sendSuccess)(res, 200, 'Membership section fetched successfully', section);
        }
        catch (error) {
            return (0, response_1.sendError)(res, 500, error.message || 'Failed to fetch membership section', error);
        }
    }
    static async createSection(req, res) {
        try {
            const validatedData = membership_section_validation_1.createMembershipSectionSchema.parse(req.body);
            const newSection = await membershipSectionService.createSection(validatedData);
            return (0, response_1.sendSuccess)(res, 201, 'Membership section created successfully', newSection);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return (0, response_1.sendError)(res, 400, 'Validation failed', error.errors);
            }
            return (0, response_1.sendError)(res, 500, error.message || 'Failed to create membership section', error);
        }
    }
    static async updateSection(req, res) {
        try {
            const { id } = req.params;
            const validatedData = membership_section_validation_1.updateMembershipSectionSchema.parse(req.body);
            const updatedSection = await membershipSectionService.updateSection(id, validatedData);
            return (0, response_1.sendSuccess)(res, 200, 'Membership section updated successfully', updatedSection);
        }
        catch (error) {
            if (error.name === 'ZodError') {
                return (0, response_1.sendError)(res, 400, 'Validation failed', error.errors);
            }
            return (0, response_1.sendError)(res, 500, error.message || 'Failed to update membership section', error);
        }
    }
    static async deleteSection(req, res) {
        try {
            const { id } = req.params;
            await membershipSectionService.deleteSection(id);
            return (0, response_1.sendSuccess)(res, 200, 'Membership section deleted successfully');
        }
        catch (error) {
            return (0, response_1.sendError)(res, 500, error.message || 'Failed to delete membership section', error);
        }
    }
}
exports.MembershipSectionController = MembershipSectionController;
