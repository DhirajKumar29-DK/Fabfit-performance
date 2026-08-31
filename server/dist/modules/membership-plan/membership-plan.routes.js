"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipPlanRoutes = void 0;
const express_1 = require("express");
const membership_plan_controller_1 = require("./membership-plan.controller");
const router = (0, express_1.Router)();
const controller = new membership_plan_controller_1.MembershipPlanController();
// --- PLANS ---
router.post('/', controller.createPlan.bind(controller));
router.get('/', controller.getPlans.bind(controller));
router.get('/:id', controller.getPlanById.bind(controller));
router.patch('/:id', controller.updatePlan.bind(controller));
router.delete('/:id', controller.deletePlan.bind(controller));
// --- FEATURES (Individual Endpoints) ---
router.get('/:planId/features', controller.getFeatures.bind(controller));
router.post('/:planId/features', controller.createFeature.bind(controller));
router.patch('/:planId/features/:featureId', controller.updateFeature.bind(controller));
router.delete('/:planId/features/:featureId', controller.deleteFeature.bind(controller));
exports.membershipPlanRoutes = router;
