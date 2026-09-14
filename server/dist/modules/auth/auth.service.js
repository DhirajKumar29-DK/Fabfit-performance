"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginAdmin = async (email, password) => {
    const admin = await prisma_1.default.admin.findUnique({
        where: { email },
    });
    if (!admin) {
        throw new Error('Invalid email or password.');
    }
    const isPasswordValid = await bcryptjs_1.default.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password.');
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jsonwebtoken_1.default.sign({ adminId: admin.id, role: 'ADMIN' }, secret, { expiresIn: '15d' });
    return { token };
};
exports.loginAdmin = loginAdmin;
