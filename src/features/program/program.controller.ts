import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { programService } from './program.service';
import { AppError } from '../../middleware/errorHandler';

export class ProgramController {
  async createProgram(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const { name, description } = req.body;

      if (!name || name.trim() === '') {
        throw new AppError('Program name is required', 400);
      }

      const program = await programService.createProgram({
        stationId,
        name: name.trim(),
        description: description?.trim(),
      });

      res.status(201).json({
        status: 'success',
        data: { program },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPrograms(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const programs = await programService.getAllPrograms(stationId);

      res.status(200).json({
        status: 'success',
        results: programs.length,
        data: { programs },
      });
    } catch (error) {
      next(error);
    }
  }

  async getProgramById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const id = req.params.id as string;
      const program = await programService.getProgramById(stationId, id);

      res.status(200).json({
        status: 'success',
        data: { program },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProgram(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const id = req.params.id as string;
      const { name, description } = req.body;

      if (name !== undefined && name.trim() === '') {
        throw new AppError('Program name cannot be empty', 400);
      }

      const program = await programService.updateProgram(stationId, id, {
        ...(name && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() }),
      });

      res.status(200).json({
        status: 'success',
        data: { program },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProgram(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const id = req.params.id as string;
      const result = await programService.deleteProgram(stationId, id);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLiveProgram(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const dateParam = req.query.date as string | undefined;
      const date = dateParam ? new Date(dateParam) : undefined;

      // Validar que la fecha sea válida si se proporciona
      if (dateParam && isNaN(date!.getTime())) {
        throw new AppError(
          'Invalid date format. Use ISO 8601 format (e.g., 2026-02-14T21:35:00)',
          400
        );
      }

      const program = await programService.getLiveProgram(stationId, date);

      if (!program) {
        return res.status(200).json({
          status: 'success',
          data: { program: null },
          message: 'No program is currently live',
        });
      }

      res.status(200).json({
        status: 'success',
        data: { program },
      });
    } catch (error) {
      next(error);
    }
  }

  async getLiveProgramMinimal(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const dateParam = req.query.date as string | undefined;
      const date = dateParam ? new Date(dateParam) : undefined;

      if (dateParam && isNaN(date!.getTime())) {
        throw new AppError(
          'Invalid date format. Use ISO 8601 format (e.g., 2026-02-14T21:35:00)',
          400
        );
      }

      const program = await programService.getLiveProgramMinimal(stationId, date);

      if (!program) {
        return res.status(200).json({
          program: null,
        });
      }

      res.status(200).json(program);
    } catch (error) {
      next(error);
    }
  }
}

export const programController = new ProgramController();
