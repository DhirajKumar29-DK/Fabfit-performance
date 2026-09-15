import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const prisma = globalThis.prismaGlobal ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasourceUrl: process.env.DATABASE_URL
});

// Always retain singleton instance on globalThis across both development AND production
// to prevent multiple PrismaClient / Tokio thread pool allocations in shared hosting environments
globalThis.prismaGlobal = prisma;

export default prisma;
