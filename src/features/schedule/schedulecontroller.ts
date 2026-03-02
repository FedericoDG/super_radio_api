import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { scheduleService } from './schedule.service';
import { AppError } from '../../middleware/errorHandler';

export class ScheduleController {
  async createSchedule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const { programId, dayOfWeek, startTime, endTime } = req.body;

      if (!programId || dayOfWeek === undefined || !startTime || !endTime) {
        throw new AppError('programId, dayOfWeek, startTime, and endTime are required', 400);
      }

      const schedule = await scheduleService.createSchedule({
        stationId,
        programId,
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
      });

      res.status(201).json({
        status: 'success',
        data: { schedule },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllSchedules(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const schedules = await scheduleService.getAllSchedules(stationId);

      res.status(200).json({
        status: 'success',
        results: schedules.length,
        data: { schedules },
      });
    } catch (error) {
      next(error);
    }
  }

  async getScheduleById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const id = req.params.id as string;
      const schedule = await scheduleService.getScheduleById(stationId, id);

      res.status(200).json({
        status: 'success',
        data: { schedule },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSchedule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const id = req.params.id as string;
      const { programId, dayOfWeek, startTime, endTime } = req.body;

      const schedule = await scheduleService.updateSchedule(stationId, id, {
        ...(programId && { programId }),
        ...(dayOfWeek !== undefined && { dayOfWeek: Number(dayOfWeek) }),
        ...(startTime && { startTime }),
        ...(endTime && { endTime }),
      });

      res.status(200).json({
        status: 'success',
        data: { schedule },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllSchedules(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const result = await scheduleService.deleteAllSchedules(stationId);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSchedule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const id = req.params.id as string;
      const result = await scheduleService.deleteSchedule(stationId, id);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Ruta pública - vista semanal
  async getWeeklySchedule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const schedule = await scheduleService.getWeeklySchedule(stationId);

      res.status(200).json({
        status: 'success',
        data: { schedule },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const scheduleController = new ScheduleController();
