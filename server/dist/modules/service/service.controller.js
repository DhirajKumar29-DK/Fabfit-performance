"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.createService = exports.getServiceByIdOrSlug = exports.getServices = void 0;
const service_service_1 = require("./service.service");
const response_1 = require("../../utils/response");
const serviceService = new service_service_1.ServiceModuleService();
const getServices = async (req, res, next) => {
    try {
        const isPublic = req.query.public === 'true';
        if (isPublic) {
            const activeServices = await serviceService.getActiveServices();
            return (0, response_1.sendSuccess)(res, 200, 'Active Services retrieved successfully', activeServices);
        }
        const services = await serviceService.getAllServices();
        (0, response_1.sendSuccess)(res, 200, 'Services retrieved successfully', services);
    }
    catch (error) {
        next(error);
    }
};
exports.getServices = getServices;
const getServiceByIdOrSlug = async (req, res, next) => {
    try {
        const idOrSlug = req.params.id;
        let service;
        // First try by ID, if not found or invalid UUID format, try by slug
        service = await serviceService.getServiceById(idOrSlug);
        if (!service) {
            service = await serviceService.getServiceBySlug(idOrSlug);
        }
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        (0, response_1.sendSuccess)(res, 200, 'Service retrieved successfully', service);
    }
    catch (error) {
        next(error);
    }
};
exports.getServiceByIdOrSlug = getServiceByIdOrSlug;
const createService = async (req, res, next) => {
    try {
        const newService = await serviceService.createService(req.body);
        (0, response_1.sendSuccess)(res, 201, 'Service created successfully', newService);
    }
    catch (error) {
        next(error);
    }
};
exports.createService = createService;
const updateService = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await serviceService.getServiceById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        const updatedService = await serviceService.updateService(id, req.body);
        (0, response_1.sendSuccess)(res, 200, 'Service updated successfully', updatedService);
    }
    catch (error) {
        next(error);
    }
};
exports.updateService = updateService;
const deleteService = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existing = await serviceService.getServiceById(id);
        if (!existing) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        await serviceService.deleteService(id);
        (0, response_1.sendSuccess)(res, 200, 'Service deleted successfully', null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteService = deleteService;
