import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database';
import { config } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';

export interface RegisterDTO {
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ChangePasswordDTO {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export class UserService {
  async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { station: true },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      stationId: user.station?.id,
      token,
    };
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async changePassword(data: ChangePasswordDTO) {
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isCurrentPasswordValid = await bcrypt.compare(data.currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      throw new AppError('Current password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);

    await prisma.user.update({
      where: { id: data.userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password updated successfully. Please login again.',
    };
  }

  private generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, config.jwtSecret, {
      expiresIn: '7d',
    });
  }
}

export const userService = new UserService();
