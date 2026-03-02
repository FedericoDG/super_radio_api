import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { stationService } from './station.service';

export class StationController {
  /**
   * GET /api/station/:stationId
   * Obtiene la información completa de la estación única con la programación semanal.
   */
  async getStation(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const station = await stationService.getStation(stationId);

      res.status(200).json({
        status: 'success',
        data: { station },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/station/:stationId
   * Actualiza la información de la estación única.
   */
  async updateStation(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const updateData = req.body;
      const station = await stationService.updateStation(stationId, updateData);

      res.status(200).json({
        status: 'success',
        data: { station },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const stationController = new StationController();
