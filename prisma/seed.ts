import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/users.seed';
import { seedStation } from './seeds/station.seed';
import { seedPrograms } from './seeds/programs.seed';
import { seedSchedules } from './seeds/schedules.seed';

const prisma = new PrismaClient();

async function cleanupDatabase(prisma: PrismaClient) {
  console.log('🧹 Limpiando base de datos...');

  // Delete in reverse dependency order
  await prisma.schedule.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.station.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✅ Base de datos limpiada');
}

async function main() {
  console.log('🌱 Iniciando seeding...');

  // Clean up existing data first
  await cleanupDatabase(prisma);

  await seedUsers(prisma);
  await seedStation(prisma);
  await seedPrograms(prisma);
  await seedSchedules(prisma);

  console.log('🎉 Seeding completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
