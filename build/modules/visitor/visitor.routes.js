"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visitor_controller_1 = require("./visitor.controller");
const router = (0, express_1.Router)();
router.get('/dashboard', visitor_controller_1.VisitorController.getDashboardStats);
router.post('/visit', visitor_controller_1.VisitorController.trackVisitor);
exports.default = router;
