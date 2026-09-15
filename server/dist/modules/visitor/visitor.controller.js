"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const response_1 = require("../../utils/response");
// In-memory set to track unique visitor IPs
const trackedIPs = new Set();
class VisitorController {
    static async getDashboardStats(req, res, next) {
        try {
            const [totalAssessments, newAssessments, acceptedClients, statsRecord] = await Promise.all([
                prisma_1.default.assessment.count(),
                prisma_1.default.assessment.count({ where: { status: 'NEW' } }),
                prisma_1.default.assessment.count({ where: { status: 'ACCEPTED' } }),
                prisma_1.default.systemStat.findUnique({ where: { id: 'global_stats' } })
            ]);
            const totalVisitors = statsRecord?.totalVisitors || 0;
            return (0, response_1.sendSuccess)(res, 200, 'Stats retrieved', {
                totalAssessments,
                newAssessments,
                acceptedClients,
                totalVisitors
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async trackVisitor(req, res, next) {
        try {
            // Extract client IP address accurately from proxy or direct request
            const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || req.ip || 'unknown';
            // Only increment if IP has not been tracked yet in current session
            if (!trackedIPs.has(clientIp)) {
                trackedIPs.add(clientIp);
                await prisma_1.default.systemStat.upsert({
                    where: { id: 'global_stats' },
                    update: { totalVisitors: { increment: 1 } },
                    create: { id: 'global_stats', totalVisitors: 1 }
                });
            }
            return (0, response_1.sendSuccess)(res, 200, 'Visitor tracked');
        }
        catch (error) {
            next(error);
        }
    }
    static async resetVisitors(req, res, next) {
        try {
            await prisma_1.default.systemStat.upsert({
                where: { id: 'global_stats' },
                update: { totalVisitors: 0 },
                create: { id: 'global_stats', totalVisitors: 0 }
            });
            trackedIPs.clear();
            return (0, response_1.sendSuccess)(res, 200, 'Visitor count reset to 0');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VisitorController = VisitorController;
