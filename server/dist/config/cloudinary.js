"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'oqhdekyw',
    api_key: process.env.CLOUDINARY_API_KEY || '421746458968346',
    api_secret: process.env.CLOUDINARY_API_SECRET || '9G4ooxiyafgZtRbyeZlEq1p9VHQ',
    secure: true,
});
exports.default = cloudinary_1.v2;
