import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendSuccess } from '../../utils/response';

const prisma = new PrismaClient();

export class VisitorController {
  static async getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
      const [totalAssessments, newAssessments, acceptedClients, statsRecord] = await Promise.all([
        prisma.assessment.count(),
        prisma.assessment.count({ where: { status: 'NEW' } }),
        prisma.assessment.count({ where: { status: 'ACCEPTED' } }),
        prisma.systemStat.findUnique({ where: { id: 'global_stats' } })
      ]);

      const totalVisitors = statsRecord?.totalVisitors || 0;

      return sendSuccess(res, 200, 'Stats retrieved', {
        totalAssessments,
        newAssessments,
        acceptedClients,
        totalVisitors
      });
    } catch (error) {
      next(error);
    }
  }

  static async trackVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.systemStat.upsert({
        where: { id: 'global_stats' },
        update: { totalVisitors: { increment: 1 } },
        create: { id: 'global_stats', totalVisitors: 1 }
      });
      return sendSuccess(res, 200, 'Visitor tracked');
    } catch (error) {
      next(error);
    }
  }
}
