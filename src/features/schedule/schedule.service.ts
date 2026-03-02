import prisma from '../../config/database';
import { AppError } from '../../middleware/errorHandler';

export interface CreateScheduleDto {
  stationId: string;
  programId: string;
  dayOfWeek: number;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface UpdateScheduleDto {
  programId?: string;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
}

// Helper para convertir hora HH:MM a DateTime ISO-8601
const toDateTime = (time: string): Date => {
  return new Date(`1970-01-01T${time}:00Z`);
};

export class ScheduleService {
  private async verifyStation(stationId: string) {
    const station = await prisma.station.findUnique({ where: { id: stationId } });
    if (!station) {
      throw new AppError('Station not found', 404);
    }
    return station;
  }

  async createSchedule(data: CreateScheduleDto) {
    await this.verifyStation(data.stationId);

    // Validar que el programa existe y pertenece a la station
    const program = await prisma.program.findUnique({
      where: { id: data.programId },
    });

    if (!program || program.stationId !== data.stationId) {
      throw new AppError('Program not found in this station', 404);
    }

    // Validar día de la semana
    if (data.dayOfWeek < 0 || data.dayOfWeek > 6) {
      throw new AppError('Day of week must be between 0 (Sunday) and 6 (Saturday)', 400);
    }

    // Validar formato de hora
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endTime)) {
      throw new AppError('Time must be in HH:MM format', 400);
    }

    const schedule = await prisma.schedule.create({
      data: {
        programId: data.programId,
        dayOfWeek: data.dayOfWeek,
        startTime: toDateTime(data.startTime),
        endTime: toDateTime(data.endTime),
      },
      include: {
        program: true,
      },
    });

    return schedule;
  }

  async getAllSchedules(stationId: string) {
    await this.verifyStation(stationId);

    const schedules = await prisma.schedule.findMany({
      where: {
        program: { stationId },
      },
      include: {
        program: true,
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return schedules.map((s) => ({
      id: s.id,
      programId: s.programId,
      programName: s.program.name,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime.toISOString().substring(11, 16),
      endTime: s.endTime.toISOString().substring(11, 16),
    }));
  }

  async getScheduleById(stationId: string, id: string) {
    await this.verifyStation(stationId);

    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: {
        program: true,
      },
    });

    if (!schedule || schedule.program.stationId !== stationId) {
      throw new AppError('Schedule not found', 404);
    }

    return {
      id: schedule.id,
      programId: schedule.programId,
      programName: schedule.program.name,
      dayOfWeek: schedule.dayOfWeek,
      startTime: schedule.startTime.toISOString().substring(11, 16),
      endTime: schedule.endTime.toISOString().substring(11, 16),
    };
  }

  async updateSchedule(stationId: string, id: string, data: UpdateScheduleDto) {
    await this.verifyStation(stationId);

    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: { program: true },
    });

    if (!schedule || schedule.program.stationId !== stationId) {
      throw new AppError('Schedule not found', 404);
    }

    // Validar programa si se proporciona — debe pertenecer a la misma station
    if (data.programId) {
      const program = await prisma.program.findUnique({
        where: { id: data.programId },
      });

      if (!program || program.stationId !== stationId) {
        throw new AppError('Program not found in this station', 404);
      }
    }

    // Validar día de la semana si se proporciona
    if (data.dayOfWeek !== undefined && (data.dayOfWeek < 0 || data.dayOfWeek > 6)) {
      throw new AppError('Day of week must be between 0 (Sunday) and 6 (Saturday)', 400);
    }

    // Validar formato de hora si se proporciona
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (data.startTime && !timeRegex.test(data.startTime)) {
      throw new AppError('Start time must be in HH:MM format', 400);
    }
    if (data.endTime && !timeRegex.test(data.endTime)) {
      throw new AppError('End time must be in HH:MM format', 400);
    }

    const updatedSchedule = await prisma.schedule.update({
      where: { id },
      data: {
        ...(data.programId && { programId: data.programId }),
        ...(data.dayOfWeek !== undefined && { dayOfWeek: data.dayOfWeek }),
        ...(data.startTime && { startTime: toDateTime(data.startTime) }),
        ...(data.endTime && { endTime: toDateTime(data.endTime) }),
      },
      include: {
        program: true,
      },
    });

    return updatedSchedule;
  }

  async deleteAllSchedules(stationId: string) {
    await this.verifyStation(stationId);

    const { count } = await prisma.schedule.deleteMany({
      where: {
        program: { stationId },
      },
    });

    return { message: `${count} schedule(s) deleted successfully`, count };
  }

  async deleteSchedule(stationId: string, id: string) {
    await this.verifyStation(stationId);

    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: { program: true },
    });

    if (!schedule || schedule.program.stationId !== stationId) {
      throw new AppError('Schedule not found', 404);
    }

    await prisma.schedule.delete({ where: { id } });

    return { message: 'Schedule deleted successfully' };
  }

  async getWeeklySchedule(stationId: string) {
    await this.verifyStation(stationId);

    const schedules = await prisma.schedule.findMany({
      where: {
        program: { stationId },
      },
      include: {
        program: true,
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    const dayMap = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ] as const;

    const week: Record<(typeof dayMap)[number], any[]> = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: [],
    };

    schedules.forEach((s) => {
      // Ajustar índice: 0 (domingo) -> 6, 1 (lunes) -> 0, 2 (martes) -> 1, etc.
      const dayIndex = (s.dayOfWeek + 6) % 7;
      const dayName = dayMap[dayIndex];

      week[dayName].push({
        programName: s.program.name,
        programDescription: s.program.description,
        start: s.startTime.toISOString().substring(11, 16),
        end: s.endTime.toISOString().substring(11, 16),
      });
    });

    return week;
  }
}

export const scheduleService = new ScheduleService();
