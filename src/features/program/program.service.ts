import prisma from '../../config/database';
import { AppError } from '../../middleware/errorHandler';

export interface CreateProgramDto {
  stationId: string;
  name: string;
  description?: string;
}

export interface UpdateProgramDto {
  name?: string;
  description?: string;
}

export class ProgramService {
  private async verifyStation(stationId: string) {
    const station = await prisma.station.findUnique({ where: { id: stationId } });
    if (!station) {
      throw new AppError('Station not found', 404);
    }
    return station;
  }

  async createProgram(data: CreateProgramDto) {
    await this.verifyStation(data.stationId);

    const program = await prisma.program.create({
      data: {
        name: data.name,
        description: data.description,
        stationId: data.stationId,
      },
    });

    return program;
  }

  async getAllPrograms(stationId: string) {
    await this.verifyStation(stationId);

    const programs = await prisma.program.findMany({
      where: { stationId },
      include: {
        schedules: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return programs;
  }

  async getProgramById(stationId: string, id: string) {
    await this.verifyStation(stationId);

    const program = await prisma.program.findUnique({
      where: { id },
      include: {
        schedules: {
          orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
        },
      },
    });

    if (!program || program.stationId !== stationId) {
      throw new AppError('Program not found', 404);
    }

    return program;
  }

  async updateProgram(stationId: string, id: string, data: UpdateProgramDto) {
    await this.verifyStation(stationId);

    const program = await prisma.program.findUnique({ where: { id } });

    if (!program || program.stationId !== stationId) {
      throw new AppError('Program not found', 404);
    }

    const updatedProgram = await prisma.program.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
      },
      include: {
        schedules: true,
      },
    });

    return updatedProgram;
  }

  async deleteProgram(stationId: string, id: string) {
    await this.verifyStation(stationId);

    const program = await prisma.program.findUnique({
      where: { id },
      include: { schedules: true },
    });

    if (!program || program.stationId !== stationId) {
      throw new AppError('Program not found', 404);
    }

    // Verificar si tiene schedules asociados
    if (program.schedules.length > 0) {
      throw new AppError(
        'Cannot delete program with associated schedules. Delete schedules first.',
        400
      );
    }

    await prisma.program.delete({ where: { id } });

    return { message: 'Program deleted successfully' };
  }

  async getLiveProgram(stationId: string, date?: Date) {
    await this.verifyStation(stationId);

    const currentDate = date || new Date();
    const day = currentDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const timeString = currentDate.toTimeString().slice(0, 8); // HH:MM:SS

    // Obtener schedules de programas de esta station
    const schedules = await prisma.schedule.findMany({
      where: {
        program: { stationId },
      },
      include: {
        program: true,
      },
    });

    // Buscar el schedule actual
    const current = schedules.find((schedule) => {
      const start = schedule.startTime.toISOString().slice(11, 19); // HH:MM:SS
      const end = schedule.endTime.toISOString().slice(11, 19); // HH:MM:SS

      // Verificar si coincide el día de la semana
      if (schedule.dayOfWeek !== day) return false;

      // Caso normal: el programa no cruza medianoche (ej: 09:00 - 12:00)
      if (start < end) {
        return timeString >= start && timeString < end;
      }

      // Caso especial: el programa cruza medianoche (ej: 23:00 - 03:00)
      return timeString >= start || timeString < end;
    });

    if (!current) {
      return null;
    }

    return {
      id: current.program.id,
      name: current.program.name,
      description: current.program.description,
      scheduleInfo: {
        dayOfWeek: current.dayOfWeek,
        startTime: current.startTime.toISOString().substring(11, 16),
        endTime: current.endTime.toISOString().substring(11, 16),
      },
    };
  }

  async getLiveProgramMinimal(stationId: string, date?: Date) {
    await this.verifyStation(stationId);

    const currentDate = date || new Date();
    const day = currentDate.getDay();
    const timeString = currentDate.toTimeString().slice(0, 8);

    const schedules = await prisma.schedule.findMany({
      where: {
        program: { stationId },
      },
      include: {
        program: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    const current = schedules.find((schedule) => {
      const start = schedule.startTime.toISOString().slice(11, 19);
      const end = schedule.endTime.toISOString().slice(11, 19);

      if (schedule.dayOfWeek !== day) return false;

      if (start < end) {
        return timeString >= start && timeString < end;
      }

      return timeString >= start || timeString < end;
    });

    if (!current) {
      return null;
    }

    return {
      name: current.program.name,
      description: current.program.description,
    };
  }
}

export const programService = new ProgramService();
