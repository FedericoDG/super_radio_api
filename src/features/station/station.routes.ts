import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { stationController } from './station.controller';

const router = Router();

router.get('/:stationId', (req, res, next) => stationController.getStation(req, res, next));

router.put('/:stationId', authenticate, (req, res, next) =>
  stationController.updateStation(req, res, next)
);

export default router;
