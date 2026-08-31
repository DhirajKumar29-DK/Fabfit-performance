import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admins = await prisma.admin.findMany({
  select: { id: true, email: true, createdAt: true }
});

if (admins.length === 0) {
  console.log('❌ NO ADMIN FOUND IN DATABASE. You need to seed one.');
} else {
  console.log(`✅ Found ${admins.length} admin(s):`);
  admins.forEach(a => console.log(`  - Email: ${a.email} | Created: ${a.createdAt}`));
}

await prisma.$disconnect();
