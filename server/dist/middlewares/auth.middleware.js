"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.cookies.admin_token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token missing.',
            });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({
                success: false,
                message: 'Internal server error.',
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded.adminId || decoded.role !== 'ADMIN') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token payload.',
            });
        }
        req.admin = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token expired or invalid.',
        });
    }
};
exports.authenticateAdmin = authenticateAdmin;
