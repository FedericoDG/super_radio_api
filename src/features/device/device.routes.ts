import { Router } from 'express';
import { deviceController } from './device.controller';

const router = Router();

router.post('/:stationId', (req, res, next) => deviceController.createDevice(req, res, next));

// TODO: Proteger esta ruta con auth middleware
router.post('/:stationId/notify', (req, res, next) =>
  deviceController.sendNotification(req, res, next)
);

export default router;
