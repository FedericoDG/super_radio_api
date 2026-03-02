import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { scheduleController } from './schedulecontroller';

const router = Router({ mergeParams: true });

// Ruta pública - vista semanal
router.get('/weekly', (req, res, next) => scheduleController.getWeeklySchedule(req, res, next));

// Rutas protegidas - CRUD completo
router.post('/', authenticate, (req, res, next) =>
  scheduleController.createSchedule(req, res, next)
);
router.get('/', authenticate, (req, res, next) =>
  scheduleController.getAllSchedules(req, res, next)
);
router.get('/:id', authenticate, (req, res, next) =>
  scheduleController.getScheduleById(req, res, next)
);
router.put('/:id', authenticate, (req, res, next) =>
  scheduleController.updateSchedule(req, res, next)
);
router.delete('/', authenticate, (req, res, next) =>
  scheduleController.deleteAllSchedules(req, res, next)
);
router.delete('/:id', authenticate, (req, res, next) =>
  scheduleController.deleteSchedule(req, res, next)
);

export default router;
