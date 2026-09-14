"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membershipPlanRoutes = void 0;
const express_1 = require("express");
const membership_plan_controller_1 = require("./membership-plan.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const controller = new membership_plan_controller_1.MembershipPlanController();
// --- PLANS ---
router.post('/', auth_middleware_1.authenticateAdmin, controller.createPlan.bind(controller));
router.get('/', controller.getPlans.bind(controller));
router.get('/:id', controller.getPlanById.bind(controller));
router.patch('/:id', auth_middleware_1.authenticateAdmin, controller.updatePlan.bind(controller));
router.delete('/:id', auth_middleware_1.authenticateAdmin, controller.deletePlan.bind(controller));
router.get('/:planId/features', controller.getFeatures.bind(controller));
router.post('/:planId/features', auth_middleware_1.authenticateAdmin, controller.createFeature.bind(controller));
router.patch('/:planId/features/:featureId', auth_middleware_1.authenticateAdmin, controller.updateFeature.bind(controller));
router.delete('/:planId/features/:featureId', auth_middleware_1.authenticateAdmin, controller.deleteFeature.bind(controller));
exports.membershipPlanRoutes = router;
