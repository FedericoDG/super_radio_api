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
}

export const programController = new ProgramController();
