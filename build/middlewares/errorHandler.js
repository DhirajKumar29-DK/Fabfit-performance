"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    console.error('Error Details:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    // We only send the stack trace if we are not in production for security reasons
    const errorDetails = process.env.NODE_ENV !== 'production' ? err.stack : null;
    return (0, response_1.sendError)(res, statusCode, message, errorDetails);
};
exports.errorHandler = errorHandler;
