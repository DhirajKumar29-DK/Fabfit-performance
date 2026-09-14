"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting Admin account setup...');
    const email = process.env.ADMIN_EMAIL || 'fabfitgym04@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'FabFit@2026';
    console.log(`Setting up Admin account for: ${email}...`);
    const salt = await bcryptjs_1.default.genSalt(10);
    const passwordHash = await bcryptjs_1.default.hash(password, salt);
    const admin = await prisma.admin.upsert({
        where: { email },
        update: {
            passwordHash,
        },
        create: {
            email,
            passwordHash,
        },
    });
    console.log('\n=========================================');
    console.log('✅ Admin account seeded successfully!');
    console.log(`📧 Email:    ${admin.email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('=========================================\n');
}
main()
    .catch((e) => {
    console.error('❌ An error occurred during Admin setup:');
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    console.log('Database disconnected cleanly.');
});
