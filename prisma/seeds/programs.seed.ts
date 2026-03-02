import { PrismaClient } from '@prisma/client';
import { MARAGATA_ID } from '../../src/constants/stations';

export async function seedPrograms(prisma: PrismaClient) {
  console.log('🎵 Creando programas ...');

  // Limpiar schedules y programas - ahora se hace en cleanupDatabase
  // await prisma.schedule.deleteMany({});
  // await prisma.program.deleteMany({});

  const programs = await Promise.all([
    prisma.program.create({
      data: {
        //
        id: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        name: 'Arriba Gente',
        description: 'Pop y rock motivante',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: 'b1c8e5a2-9c3f-4d2a-9f1e-08d73848bd4c',
        name: 'Tempranísimo',
        description: 'Informativo',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        name: 'Solo lo mejor',
        description: 'Selección musical',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: '963ba5ee-2e76-49f0-8714-04c1b318612d',
        name: 'Completísimo',
        description: 'Compacto del mediodía',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: 'e84ff159-1e55-4267-8798-8e28300cddd4',
        name: 'Uruguayenses',
        description: 'Primera edición',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: 'aa111111-1111-1111-1111-111111111111',
        name: 'Eternos hits',
        description: 'Música retro',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: 'bb222222-2222-2222-2222-222222222222',
        name: 'Maragata romántica',
        description: 'Selección de música romántica',
        stationId: MARAGATA_ID,
      },
    }),
    prisma.program.create({
      data: {
        id: 'cc333333-3333-3333-3333-333333333333',
        name: 'Uruguayenses',
        description: 'Edición nocturna',
        stationId: MARAGATA_ID,
      },
    }),
  ]);

  console.log(`✅ ${programs.length} programas creados`);

  return programs;
}
