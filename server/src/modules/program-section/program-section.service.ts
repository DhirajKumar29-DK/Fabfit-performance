import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ProgramSectionService {
  static async getAllSections() {
    return prisma.programSection.findMany({
      where: { deletedAt: null }
    });
  }

  static async getSectionById(id: string) {
    return prisma.programSection.findFirst({
      where: { id, deletedAt: null }
    });
  }

  static async createSection(data: Prisma.ProgramSectionCreateInput) {
    return prisma.programSection.create({
      data
    });
  }

  static async updateSection(id: string, data: Prisma.ProgramSectionUpdateInput) {
    return prisma.programSection.update({
      where: { id },
      data
    });
  }

  static async deleteSection(id: string) {
    return prisma.programSection.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'INACTIVE' }
    });
  }
}
