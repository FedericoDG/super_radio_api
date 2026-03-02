import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { programController } from './program.controller';

const router = Router({ mergeParams: true });

// Rutas públicas para obtener el programa en vivo
router.get('/live/minimal', (req, res, next) =>
  programController.getLiveProgramMinimal(req, res, next)
);
router.get('/live', (req, res, next) => programController.getLiveProgram(req, res, next));

// Todas las demás rutas están protegidas
router.use(authenticate);

router.post('/', (req, res, next) => programController.createProgram(req, res, next));
router.get('/', (req, res, next) => programController.getAllPrograms(req, res, next));
router.get('/:id', (req, res, next) => programController.getProgramById(req, res, next));
router.put('/:id', (req, res, next) => programController.updateProgram(req, res, next));
router.delete('/:id', (req, res, next) => programController.deleteProgram(req, res, next));

export default router;
