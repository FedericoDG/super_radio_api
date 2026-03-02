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
}

export const programService = new ProgramService();
