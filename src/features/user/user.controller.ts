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
          message: 'Email and password are required',
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
          message: 'Unauthorized',
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
          message: 'Unauthorized',
        });
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Current password and new password are required',
        });
      }

      if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
        return res.status(400).json({
          status: 'error',
          message: 'Current password and new password must be strings',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          status: 'error',
          message: 'New password must be at least 6 characters long',
        });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'New password must be different from current password',
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
