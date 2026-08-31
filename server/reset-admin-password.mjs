import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient();

const NEW_PASSWORD = 'FabFitAdmin@2024';

const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(NEW_PASSWORD, salt);

const result = await prisma.admin.updateMany({
  where: { email: 'admin@fabfit.com' },
  data: { passwordHash },
});

if (result.count > 0) {
  console.log('✅ Admin password reset successfully!');
  console.log('   Email:    admin@fabfit.com');
  console.log('   Password: FabFitAdmin@2024');
} else {
  console.log('❌ No admin found with that email.');
}

await prisma.$disconnect();
