"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeamMember = exports.updateTeamMember = exports.createTeamMember = exports.getTeamMemberById = exports.getTeamMembers = void 0;
const team_member_service_1 = require("./team-member.service");
const response_1 = require("../../utils/response");
const teamMemberService = new team_member_service_1.TeamMemberService();
const getTeamMembers = async (req, res, next) => {
    try {
        const isPublic = req.query.public === 'true';
        if (isPublic) {
            const activeMembers = await teamMemberService.getActiveTeamMembers();
            return (0, response_1.sendSuccess)(res, 200, 'Active Team Members retrieved successfully', activeMembers);
        }
        const members = await teamMemberService.getTeamMembers();
        (0, response_1.sendSuccess)(res, 200, 'Team Members retrieved successfully', members);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeamMembers = getTeamMembers;
const getTeamMemberById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const member = await teamMemberService.getTeamMemberById(id);
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team Member not found' });
        }
        (0, response_1.sendSuccess)(res, 200, 'Team Member retrieved successfully', member);
    }
    catch (error) {
        next(error);
    }
};
exports.getTeamMemberById = getTeamMemberById;
const createTeamMember = async (req, res, next) => {
    try {
        const newMember = await teamMemberService.createTeamMember(req.body);
        (0, response_1.sendSuccess)(res, 201, 'Team Member created successfully', newMember);
    }
    catch (error) {
        next(error);
    }
};
exports.createTeamMember = createTeamMember;
const updateTeamMember = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await teamMemberService.getTeamMemberById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Team Member not found' });
        }
        const updatedMember = await teamMemberService.updateTeamMember(id, req.body);
        (0, response_1.sendSuccess)(res, 200, 'Team Member updated successfully', updatedMember);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTeamMember = updateTeamMember;
const deleteTeamMember = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await teamMemberService.getTeamMemberById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Team Member not found' });
        }
        await teamMemberService.deleteTeamMember(id);
        (0, response_1.sendSuccess)(res, 200, 'Team Member deleted successfully', null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTeamMember = deleteTeamMember;
