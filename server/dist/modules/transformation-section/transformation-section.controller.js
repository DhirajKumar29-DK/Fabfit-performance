"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSection = exports.updateSection = exports.createSection = exports.getSectionById = exports.getSections = void 0;
const transformation_section_service_1 = require("./transformation-section.service");
const response_1 = require("../../utils/response");
const sectionService = new transformation_section_service_1.TransformationSectionService();
const getSections = async (req, res, next) => {
    try {
        const isPublic = req.query.public === 'true';
        if (isPublic) {
            const activeSection = await sectionService.getActiveSection();
            return (0, response_1.sendSuccess)(res, 200, 'Active Transformation Section retrieved successfully', activeSection);
        }
        const sections = await sectionService.getAllSections();
        (0, response_1.sendSuccess)(res, 200, 'Transformation Sections retrieved successfully', sections);
    }
    catch (error) {
        next(error);
    }
};
exports.getSections = getSections;
const getSectionById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const section = await sectionService.getSectionById(id);
        if (!section) {
            return res.status(404).json({ success: false, message: 'Transformation Section not found' });
        }
        (0, response_1.sendSuccess)(res, 200, 'Transformation Section retrieved successfully', section);
    }
    catch (error) {
        next(error);
    }
};
exports.getSectionById = getSectionById;
const createSection = async (req, res, next) => {
    try {
        const newSection = await sectionService.createSection(req.body);
        (0, response_1.sendSuccess)(res, 201, 'Transformation Section created successfully', newSection);
    }
    catch (error) {
        next(error);
    }
};
exports.createSection = createSection;
const updateSection = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await sectionService.getSectionById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Transformation Section not found' });
        }
        const updatedSection = await sectionService.updateSection(id, req.body);
        (0, response_1.sendSuccess)(res, 200, 'Transformation Section updated successfully', updatedSection);
    }
    catch (error) {
        next(error);
    }
};
exports.updateSection = updateSection;
const deleteSection = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await sectionService.getSectionById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Transformation Section not found' });
        }
        await sectionService.deleteSection(id);
        (0, response_1.sendSuccess)(res, 200, 'Transformation Section deleted successfully', null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSection = deleteSection;
