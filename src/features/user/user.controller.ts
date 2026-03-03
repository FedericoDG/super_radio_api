import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { AuthRequest } from '../../middleware/auth';

export class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email y contraseña son requeridos',
        });
      }

      const result = await userService.login({ email, password });

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'No autorizado',
        });
      }

      const user = await userService.getUserById(req.user.id);

      res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'No autorizado',
        });
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Contraseña actual y nueva contraseña son requeridas',
        });
      }

      if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'La contraseña actual y la nueva contraseña deben ser cadenas de texto',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          status: 'error',
          message: 'La nueva contraseña debe tener al menos 6 caracteres',
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'La nueva contraseña debe ser diferente de la contraseña actual',
        });
      }

      const result = await userService.changePassword({
        userId: req.user.id,
        currentPassword,
        newPassword,
      });

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
