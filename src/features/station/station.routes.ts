import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { stationController } from './station.controller';

const router = Router();

// GET público (sin autenticación) para obtener la información de la estación
router.get('/:stationId', (req, res, next) => stationController.getStation(req, res, next));

// PUT protegido para actualizar la información de la estación
router.put('/:stationId', authenticate, (req, res, next) =>
  stationController.updateStation(req, res, next)
);

export default router;
