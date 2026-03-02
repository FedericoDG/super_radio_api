import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/login', (req, res, next) => userController.login(req, res, next));
router.get('/profile', authenticate, (req, res, next) => userController.getProfile(req, res, next));
router.put('/password', authenticate, (req, res, next) =>
  userController.changePassword(req, res, next)
);

export default router;
