import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/auth';
import { deviceService, SendNotificationDto } from './device.service';
import { AppError } from '../../middleware/errorHandler';

export class DeviceController {
  /**
   * POST /api/devices/:stationId
   * Crea un nuevo dispositivo para la estación.
   */
  async createDevice(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const createData = req.body;
      const device = await deviceService.createDevice(stationId, createData);

      res.status(200).json({
        status: 'success',
        data: { device },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/devices/:stationId/notify
   * Envía una notificación push a TODOS los dispositivos de la estación.
   *
   * Body:
   *  - title  (string, obligatorio)
   *  - body   (string, obligatorio)
   *  - image  (string, opcional)
   *  - data   (Record<string,string>, opcional)
   */
  async sendNotification(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stationId = req.params.stationId as string;
      const { title, body, image, data } = req.body;

      if (!title || !body) {
        throw new AppError('title and body are required', 400);
      }

      const dto: SendNotificationDto = { title, body, image, data };
      const result = await deviceService.sendNotificationToAll(stationId, dto);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const deviceController = new DeviceController();
