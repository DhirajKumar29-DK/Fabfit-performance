"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = globalThis.prismaGlobal ?? new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasourceUrl: process.env.DATABASE_URL
});
if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
exports.default = prisma;
