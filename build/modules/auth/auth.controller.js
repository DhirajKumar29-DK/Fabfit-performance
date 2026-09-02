"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const auth_service_1 = require("./auth.service");
const response_1 = require("../../utils/response");
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token } = await (0, auth_service_1.loginAdmin)(email, password);
        // Set httpOnly cookie
        res.cookie('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        });
        (0, response_1.sendSuccess)(res, 200, 'Login successful', { authenticated: true });
    }
    catch (error) {
        if (error.message === 'Invalid email or password.') {
            (0, response_1.sendError)(res, 401, error.message);
        }
        else {
            next(error);
        }
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.clearCookie('admin_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        (0, response_1.sendSuccess)(res, 200, 'Logout successful', { authenticated: false });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
