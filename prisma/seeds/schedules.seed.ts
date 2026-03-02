import { PrismaClient } from '@prisma/client';

// Helper para convertir hora HH:MM a DateTime ISO-8601
const toDateTime = (time: string): Date => {
  return new Date(`1970-01-01T${time}:00Z`);
};

export async function seedSchedules(prisma: PrismaClient) {
  console.log('🎵 Creando programaciones ...');

  // await prisma.schedule.deleteMany({}); // ahora se hace en cleanupDatabase

  const schedules = await Promise.all([
    // ================= LUNES =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 1,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'b1c8e5a2-9c3f-4d2a-9f1e-08d73848bd4c',
        dayOfWeek: 1,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('09:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 1,
        startTime: toDateTime('09:00'),
        endTime: toDateTime('12:30'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '963ba5ee-2e76-49f0-8714-04c1b318612d',
        dayOfWeek: 1,
        startTime: toDateTime('12:30'),
        endTime: toDateTime('13:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 1,
        startTime: toDateTime('13:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'e84ff159-1e55-4267-8798-8e28300cddd4',
        dayOfWeek: 1,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 1,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 1,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 1,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),

    // ================= MARTES =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 2,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'b1c8e5a2-9c3f-4d2a-9f1e-08d73848bd4c',
        dayOfWeek: 2,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('09:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 2,
        startTime: toDateTime('09:00'),
        endTime: toDateTime('12:30'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '963ba5ee-2e76-49f0-8714-04c1b318612d',
        dayOfWeek: 2,
        startTime: toDateTime('12:30'),
        endTime: toDateTime('13:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 2,
        startTime: toDateTime('13:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'e84ff159-1e55-4267-8798-8e28300cddd4',
        dayOfWeek: 2,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 2,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 2,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 2,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),

    // ================= MIÉRCOLES =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 3,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'b1c8e5a2-9c3f-4d2a-9f1e-08d73848bd4c',
        dayOfWeek: 3,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('09:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 3,
        startTime: toDateTime('09:00'),
        endTime: toDateTime('12:30'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '963ba5ee-2e76-49f0-8714-04c1b318612d',
        dayOfWeek: 3,
        startTime: toDateTime('12:30'),
        endTime: toDateTime('13:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 3,
        startTime: toDateTime('13:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'e84ff159-1e55-4267-8798-8e28300cddd4',
        dayOfWeek: 3,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 3,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 3,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 3,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),

    // ================= JUEVES =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 4,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'b1c8e5a2-9c3f-4d2a-9f1e-08d73848bd4c',
        dayOfWeek: 4,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('09:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 4,
        startTime: toDateTime('09:00'),
        endTime: toDateTime('12:30'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '963ba5ee-2e76-49f0-8714-04c1b318612d',
        dayOfWeek: 4,
        startTime: toDateTime('12:30'),
        endTime: toDateTime('13:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 4,
        startTime: toDateTime('13:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'e84ff159-1e55-4267-8798-8e28300cddd4',
        dayOfWeek: 4,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 4,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 4,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 4,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),

    // ================= VIERNES =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 5,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'b1c8e5a2-9c3f-4d2a-9f1e-08d73848bd4c',
        dayOfWeek: 5,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('09:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 5,
        startTime: toDateTime('09:00'),
        endTime: toDateTime('12:30'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '963ba5ee-2e76-49f0-8714-04c1b318612d',
        dayOfWeek: 5,
        startTime: toDateTime('12:30'),
        endTime: toDateTime('13:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 5,
        startTime: toDateTime('13:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'e84ff159-1e55-4267-8798-8e28300cddd4',
        dayOfWeek: 5,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 5,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 5,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 5,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),

    // ================= SÁBADO =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 6,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 6,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 6,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 6,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 6,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 6,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),

    // ================= DOMINGO =================
    prisma.schedule.create({
      data: {
        programId: '9806f5c4-dee6-447e-bc75-08d73848bd4b',
        dayOfWeek: 0,
        startTime: toDateTime('06:00'),
        endTime: toDateTime('08:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: '41e5674f-d913-4552-bc7a-76a363d2ca9c',
        dayOfWeek: 0,
        startTime: toDateTime('08:00'),
        endTime: toDateTime('20:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 0,
        startTime: toDateTime('20:00'),
        endTime: toDateTime('21:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'aa111111-1111-1111-1111-111111111111',
        dayOfWeek: 0,
        startTime: toDateTime('21:00'),
        endTime: toDateTime('23:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'bb222222-2222-2222-2222-222222222222',
        dayOfWeek: 0,
        startTime: toDateTime('23:00'),
        endTime: toDateTime('03:00'),
      },
    }),
    prisma.schedule.create({
      data: {
        programId: 'cc333333-3333-3333-3333-333333333333',
        dayOfWeek: 0,
        startTime: toDateTime('03:00'),
        endTime: toDateTime('06:00'),
      },
    }),
  ]);

  console.log(`✅ ${schedules.length} programaciones creadas`);
  return schedules;
}
