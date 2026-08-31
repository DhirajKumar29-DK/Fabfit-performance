"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransformation = exports.updateTransformation = exports.getTransformationBySlug = exports.getTransformationById = exports.getTransformations = exports.createTransformation = void 0;
const transformationService = __importStar(require("./transformation.service"));
const createTransformation = async (req, res) => {
    try {
        const transformation = await transformationService.createTransformation(req.body);
        res.status(201).json({ success: true, data: transformation });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ success: false, message: 'Slug already exists' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createTransformation = createTransformation;
const getTransformations = async (req, res) => {
    try {
        const isPublic = req.query.public === 'true';
        const transformations = await transformationService.getTransformations(!isPublic);
        res.status(200).json({ success: true, data: transformations });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTransformations = getTransformations;
const getTransformationById = async (req, res) => {
    try {
        const isPublic = req.query.public === 'true';
        const transformation = await transformationService.getTransformationById(req.params.id, !isPublic);
        if (!transformation) {
            return res.status(404).json({ success: false, message: 'Transformation not found' });
        }
        res.status(200).json({ success: true, data: transformation });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTransformationById = getTransformationById;
const getTransformationBySlug = async (req, res) => {
    try {
        const isPublic = req.query.public === 'true';
        const transformation = await transformationService.getTransformationBySlug(req.params.slug, !isPublic);
        if (!transformation) {
            return res.status(404).json({ success: false, message: 'Transformation not found' });
        }
        res.status(200).json({ success: true, data: transformation });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTransformationBySlug = getTransformationBySlug;
const updateTransformation = async (req, res) => {
    try {
        const transformation = await transformationService.updateTransformation(req.params.id, req.body);
        res.status(200).json({ success: true, data: transformation });
    }
    catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Transformation not found' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateTransformation = updateTransformation;
const deleteTransformation = async (req, res) => {
    try {
        await transformationService.softDeleteTransformation(req.params.id);
        res.status(200).json({ success: true, message: 'Transformation deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteTransformation = deleteTransformation;
