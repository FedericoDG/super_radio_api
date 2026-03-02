import prisma from '../../config/database';
import { AppError } from '../../middleware/errorHandler';

export interface UpdateStationDto {
  name?: string;
  slogan?: string;
  streamUrl?: string;
  websiteUrl?: string;
  logoUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  dayStartTime?: string;
}

export class StationService {
  /**
   * Obtiene la información completa de la estación única,
   * incluyendo la programación semanal ordenada por día.
   */
  async getStation(stationId: string) {
    const station = await prisma.station.findUnique({
      where: { id: stationId },
      include: {
        programs: {
          include: {
            schedules: true,
          },
        },
      },
    });

    if (!station) {
      throw new AppError('Station not found', 404);
    }

    // Construir la programación semanal
    const allSchedules = station.programs.flatMap((program) =>
      program.schedules.map((schedule) => ({
        ...schedule,
        program,
      }))
    );

    const dayMap = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo',
    ] as const;

    const weeklySchedule: Record<(typeof dayMap)[number], any[]> = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: [],
    };

    allSchedules.forEach((s) => {
      // Validar que dayOfWeek esté en el rango válido (0-6)
      if (s.dayOfWeek < 0 || s.dayOfWeek > 6) {
        console.warn(
          `⚠️  Schedule con dayOfWeek inválido: ${s.dayOfWeek} para programa ${s.program.name}`
        );
        return;
      }

      // Ajustar índice: 0 (domingo) -> 6, 1 (lunes) -> 0, 2 (martes) -> 1, etc.
      const dayIndex = (s.dayOfWeek + 6) % 7;
      const dayName = dayMap[dayIndex];
      weeklySchedule[dayName].push({
        programName: s.program.name,
        programDescription: s.program.description,
        start: s.startTime.toISOString().substring(11, 16),
        end: s.endTime.toISOString().substring(11, 16),
      });
    });

    // Convertir dayStartTime a minutos desde medianoche (ej: "06:00" = 360)
    const dayStartTime = station.dayStartTime || '00:00';
    const [startHour, startMinute] = dayStartTime.split(':').map(Number);
    const dayStartMinutes = startHour * 60 + startMinute;

    // Helper: Convierte "HH:MM" a minutos ajustados según el inicio del día
    const timeToAdjustedMinutes = (timeStr: string): number => {
      const [hour, minute] = timeStr.split(':').map(Number);
      let minutes = hour * 60 + minute;

      // Si la hora es antes del inicio del día, la consideramos del día siguiente
      if (minutes < dayStartMinutes) {
        minutes += 24 * 60; // Agregar 24 horas
      }

      return minutes;
    };

    // Ordenar cada día considerando que el día empieza a la hora configurada
    Object.keys(weeklySchedule).forEach((day) => {
      weeklySchedule[day as keyof typeof weeklySchedule].sort((a, b) => {
        const aMinutes = timeToAdjustedMinutes(a.start);
        const bMinutes = timeToAdjustedMinutes(b.start);
        return aMinutes - bMinutes;
      });
    });

    return {
      id: station.id,
      name: station.name,
      slogan: station.slogan,
      streamUrl: station.streamUrl,
      websiteUrl: station.websiteUrl,
      logoUrl: station.logoUrl,
      facebookUrl: station.facebookUrl,
      instagramUrl: station.instagramUrl,
      twitterUrl: station.twitterUrl,
      youtubeUrl: station.youtubeUrl,
      tiktokUrl: station.tiktokUrl,
      country: station.country,
      state: station.state,
      city: station.city,
      postalCode: station.postalCode,
      phone: station.phone,
      whatsapp: station.whatsapp,
      email: station.email,
      address: station.address,
      dayStartTime: station.dayStartTime,
      createdAt: station.createdAt,
      updatedAt: station.updatedAt,
      schedule: weeklySchedule,
    };
  }

  /**
   * Actualiza la información de la estación única.
   */
  async updateStation(stationId: string, data: UpdateStationDto) {
    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });

    if (!station) {
      throw new AppError('Station not found', 404);
    }

    const updatedStation = await prisma.station.update({
      where: { id: stationId },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.slogan !== undefined && { slogan: data.slogan }),
        ...(data.streamUrl !== undefined && { streamUrl: data.streamUrl }),
        ...(data.websiteUrl !== undefined && { websiteUrl: data.websiteUrl }),
        ...(data.logoUrl !== undefined && { logoUrl: data.logoUrl }),
        ...(data.facebookUrl !== undefined && { facebookUrl: data.facebookUrl }),
        ...(data.instagramUrl !== undefined && { instagramUrl: data.instagramUrl }),
        ...(data.twitterUrl !== undefined && { twitterUrl: data.twitterUrl }),
        ...(data.youtubeUrl !== undefined && { youtubeUrl: data.youtubeUrl }),
        ...(data.tiktokUrl !== undefined && { tiktokUrl: data.tiktokUrl }),
        ...(data.country !== undefined && { country: data.country }),
        ...(data.state !== undefined && { state: data.state }),
        ...(data.city !== undefined && { city: data.city }),
        ...(data.postalCode !== undefined && { postalCode: data.postalCode }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.whatsapp !== undefined && { whatsapp: data.whatsapp }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.address !== undefined && { address: data.address }),
        ...(data.dayStartTime !== undefined && { dayStartTime: data.dayStartTime }),
      },
    });

    return updatedStation;
  }
}

export const stationService = new StationService();
