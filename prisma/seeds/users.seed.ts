import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { MARAGATA_USER_ID } from '../../src/constants/users';

export async function seedUsers(prisma: PrismaClient) {
  console.log('👥 Creando usuarios...');

  // Limpiar usuarios existentes - ahora se hace en cleanupDatabase
  // await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: MARAGATA_USER_ID,
        email: 'admin@superradio.com',
        password: hashedPassword,
      },
    }),
  ]);

  console.log(`✅ ${users.length} usuarios creados`);

  return users;
}
