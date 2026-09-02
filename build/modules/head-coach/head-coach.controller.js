"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeadCoach = exports.updateHeadCoach = exports.createHeadCoach = exports.getHeadCoachById = exports.getHeadCoaches = void 0;
const head_coach_service_1 = require("./head-coach.service");
const response_1 = require("../../utils/response");
const headCoachService = new head_coach_service_1.HeadCoachService();
const getHeadCoaches = async (req, res, next) => {
    try {
        const isPublic = req.query.public === 'true';
        if (isPublic) {
            const activeHeadCoach = await headCoachService.getActiveHeadCoach();
            return (0, response_1.sendSuccess)(res, 200, 'Active Head Coach retrieved successfully', activeHeadCoach ? [activeHeadCoach] : []);
        }
        const headCoaches = await headCoachService.getHeadCoaches();
        (0, response_1.sendSuccess)(res, 200, 'Head Coaches retrieved successfully', headCoaches);
    }
    catch (error) {
        next(error);
    }
};
exports.getHeadCoaches = getHeadCoaches;
const getHeadCoachById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const headCoach = await headCoachService.getHeadCoachById(id);
        if (!headCoach) {
            return res.status(404).json({ success: false, message: 'Head Coach not found' });
        }
        (0, response_1.sendSuccess)(res, 200, 'Head Coach retrieved successfully', headCoach);
    }
    catch (error) {
        next(error);
    }
};
exports.getHeadCoachById = getHeadCoachById;
const createHeadCoach = async (req, res, next) => {
    try {
        const headCoach = await headCoachService.createHeadCoach(req.body);
        (0, response_1.sendSuccess)(res, 201, 'Head Coach created successfully', headCoach);
    }
    catch (error) {
        next(error);
    }
};
exports.createHeadCoach = createHeadCoach;
const updateHeadCoach = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await headCoachService.getHeadCoachById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Head Coach not found' });
        }
        const headCoach = await headCoachService.updateHeadCoach(id, req.body);
        (0, response_1.sendSuccess)(res, 200, 'Head Coach updated successfully', headCoach);
    }
    catch (error) {
        next(error);
    }
};
exports.updateHeadCoach = updateHeadCoach;
const deleteHeadCoach = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await headCoachService.getHeadCoachById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Head Coach not found' });
        }
        await headCoachService.softDeleteHeadCoach(id);
        (0, response_1.sendSuccess)(res, 200, 'Head Coach deleted successfully');
    }
    catch (error) {
        next(error);
    }
};
exports.deleteHeadCoach = deleteHeadCoach;
