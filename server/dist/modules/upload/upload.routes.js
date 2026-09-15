"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
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
router.post('/', auth_middleware_1.authenticateAdmin, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        // Per-type size enforcement
        const fileType = req._uploadedFileType;
        if (fileType === 'image' && req.file.size > IMAGE_LIMIT) {
            return res.status(400).json({ success: false, message: 'Image size must not exceed 50 MB.' });
        }
        // Upload to Cloudinary using upload_stream
        const uploadToCloudinary = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({
                    folder: 'fabfit',
                    resource_type: fileType === 'video' ? 'video' : 'auto',
                }, (error, result) => {
                    if (error || !result) {
                        return reject(error || new Error('Upload to Cloudinary failed'));
                    }
                    resolve(result);
                });
                stream.end(req.file.buffer);
            });
        };
        const result = await uploadToCloudinary();
        return res.status(200).json({ success: true, url: result.secure_url });
    }
    catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({
            success: false,
            message: error?.message || 'Error uploading file to Cloudinary'
        });
    }
});
exports.default = router;
