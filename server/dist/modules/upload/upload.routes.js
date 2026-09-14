"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../../public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const IMAGE_LIMIT = 50 * 1024 * 1024; // 50 MB
const VIDEO_LIMIT = 500 * 1024 * 1024; // 500 MB
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: VIDEO_LIMIT }, // use max limit; per-type check in fileFilter
    fileFilter: (req, file, cb) => {
        const isImage = file.mimetype.startsWith('image/');
        const isVideo = file.mimetype.startsWith('video/');
        if (!isImage && !isVideo) {
            return cb(new Error('Only image and video files are allowed.'));
        }
        // Attach type so route can enforce per-type size limit
        req._uploadedFileType = isImage ? 'image' : 'video';
        cb(null, true);
    },
});
router.post('/', auth_middleware_1.authenticateAdmin, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // Per-type size enforcement
    const fileType = req._uploadedFileType;
    if (fileType === 'image' && req.file.size > IMAGE_LIMIT) {
        return res.status(400).json({ success: false, message: 'Image size must not exceed 50 MB.' });
    }
    const url = `/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, url });
});
exports.default = router;
