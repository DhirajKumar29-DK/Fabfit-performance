"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables if needed
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting Admin account setup...');
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
        console.error('❌ ERROR: Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables.');
        console.log('To run this script locally:');
        console.log('  ADMIN_EMAIL="admin@example.com" ADMIN_PASSWORD="securepassword" npx tsx src/scripts/seedAdmin.ts');
        process.exit(1);
    }
    // Check if an admin with this email already exists
    const existingAdmin = await prisma.admin.findUnique({
        where: { email },
    });
    if (existingAdmin) {
        console.log(`⚠️  An admin account with email "${email}" already exists.`);
        console.log('Skipping creation to prevent overwriting existing credentials.');
        return;
    }
    console.log(`Creating Admin account for: ${email}...`);
    // Hash the password
    const salt = await bcryptjs_1.default.genSalt(10);
    const passwordHash = await bcryptjs_1.default.hash(password, salt);
    // Create the record
    await prisma.admin.create({
        data: {
            email,
            passwordHash,
        },
    });
    console.log('✅ Admin account created successfully!');
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
