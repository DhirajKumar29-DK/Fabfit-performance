"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamSection = exports.updateTeamSection = exports.createTeamSection = exports.getTeamSectionById = exports.getTeamSections = void 0;
const team_section_service_1 = require("./team-section.service");
const response_1 = require("../../utils/response");
const teamSectionService = new team_section_service_1.TeamSectionService();
const getTeamSections = async (req, res, next) => {
    try {
        const isPublic = req.query.public === 'true';
        if (isPublic) {
            const activeSection = await teamSectionService.getActiveTeamSection();
            return (0, response_1.sendSuccess)(res, 200, 'Active Team Section retrieved successfully', activeSection ? [activeSection] : []);
        }
        const sections = await teamSectionService.getTeamSections();
        (0, response_1.sendSuccess)(res, 200, 'Team Sections retrieved successfully', sections);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeamSections = getTeamSections;
const getTeamSectionById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const section = await teamSectionService.getTeamSectionById(id);
        if (!section) {
            return res.status(404).json({ success: false, message: 'Team Section not found' });
        }
        (0, response_1.sendSuccess)(res, 200, 'Team Section retrieved successfully', section);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeamSectionById = getTeamSectionById;
const createTeamSection = async (req, res, next) => {
    try {
        const newSection = await teamSectionService.createTeamSection(req.body);
        (0, response_1.sendSuccess)(res, 201, 'Team Section created successfully', newSection);
    }
    catch (error) {
        next(error);
    }
};
exports.createTeamSection = createTeamSection;
const updateTeamSection = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await teamSectionService.getTeamSectionById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Team Section not found' });
        }
        const updatedSection = await teamSectionService.updateTeamSection(id, req.body);
        (0, response_1.sendSuccess)(res, 200, 'Team Section updated successfully', updatedSection);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTeamSection = updateTeamSection;
const deleteTeamSection = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await teamSectionService.getTeamSectionById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Team Section not found' });
        }
        await teamSectionService.deleteTeamSection(id);
        (0, response_1.sendSuccess)(res, 200, 'Team Section deleted successfully', null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTeamSection = deleteTeamSection;
