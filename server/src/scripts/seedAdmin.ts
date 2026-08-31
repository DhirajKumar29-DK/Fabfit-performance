import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables if needed
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const prisma = new PrismaClient();

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
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

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
