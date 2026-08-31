"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipPlanController = void 0;
const membership_plan_service_1 = require("./membership-plan.service");
const response_1 = require("../../utils/response");
const planService = new membership_plan_service_1.MembershipPlanService();
class MembershipPlanController {
    // --- PLANS ---
    async getPlans(req, res) {
        try {
            const status = req.query.status;
            const plans = await planService.getPlans(status);
            return (0, response_1.sendSuccess)(res, 200, 'Plans retrieved successfully', plans);
        }
        catch (error) {
            console.error('Get plans error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to retrieve plans');
        }
    }
    async getPlanById(req, res) {
        try {
            const plan = await planService.getPlanById(req.params.id);
            if (!plan)
                return (0, response_1.sendError)(res, 404, 'Plan not found');
            return (0, response_1.sendSuccess)(res, 200, 'Plan retrieved successfully', plan);
        }
        catch (error) {
            console.error('Get plan by ID error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to retrieve plan');
        }
    }
    async createPlan(req, res) {
        try {
            const plan = await planService.createPlan(req.body);
            return (0, response_1.sendSuccess)(res, 201, 'Plan created successfully', plan);
        }
        catch (error) {
            console.error('Create plan error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to create plan');
        }
    }
    async updatePlan(req, res) {
        try {
            const plan = await planService.updatePlan(req.params.id, req.body);
            return (0, response_1.sendSuccess)(res, 200, 'Plan updated successfully', plan);
        }
        catch (error) {
            console.error('Update plan error:', error);
            if (error.message === 'Plan not found') {
                return (0, response_1.sendError)(res, 404, 'Plan not found');
            }
            return (0, response_1.sendError)(res, 500, 'Failed to update plan');
        }
    }
    async deletePlan(req, res) {
        try {
            await planService.deletePlan(req.params.id);
            return (0, response_1.sendSuccess)(res, 200, 'Plan deleted successfully', null);
        }
        catch (error) {
            console.error('Delete plan error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to delete plan');
        }
    }
    // --- FEATURES (Individual Endpoints) ---
    async getFeatures(req, res) {
        try {
            const features = await planService.getFeaturesByPlanId(req.params.planId);
            return (0, response_1.sendSuccess)(res, 200, 'Features retrieved successfully', features);
        }
        catch (error) {
            console.error('Get features error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to retrieve features');
        }
    }
    async createFeature(req, res) {
        try {
            const feature = await planService.createFeature(req.params.planId, req.body);
            return (0, response_1.sendSuccess)(res, 201, 'Feature created successfully', feature);
        }
        catch (error) {
            console.error('Create feature error:', error);
            return (0, response_1.sendError)(res, 500, 'Failed to create feature');
        }
    }
    async updateFeature(req, res) {
        try {
            const feature = await planService.updateFeature(req.params.planId, req.params.featureId, req.body);
            return (0, response_1.sendSuccess)(res, 200, 'Feature updated successfully', feature);
        }
        catch (error) {
            console.error('Update feature error:', error);
            if (error.message === 'Feature not found in this plan') {
                return (0, response_1.sendError)(res, 404, error.message);
            }
            return (0, response_1.sendError)(res, 500, 'Failed to update feature');
        }
    }
    async deleteFeature(req, res) {
        try {
            await planService.deleteFeature(req.params.planId, req.params.featureId);
            return (0, response_1.sendSuccess)(res, 200, 'Feature deleted successfully', null);
        }
        catch (error) {
            console.error('Delete feature error:', error);
            if (error.message === 'Feature not found in this plan') {
                return (0, response_1.sendError)(res, 404, error.message);
            }
            return (0, response_1.sendError)(res, 500, 'Failed to delete feature');
        }
    }
}
exports.MembershipPlanController = MembershipPlanController;
