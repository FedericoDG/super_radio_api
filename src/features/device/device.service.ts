import prisma from '../../config/database';
import admin from '../../config/firebase';
import { AppError } from '../../middleware/errorHandler';

export interface CreateDeviceDto {
  fcmToken: string;
}

export interface SendNotificationDto {
  title: string;
  body: string;
  image?: string;
  data?: Record<string, string>;
}

export class DeviceService {
  async createDevice(stationId: string, data: CreateDeviceDto) {
    const device = await prisma.device.findUnique({
      where: { fcmToken: data.fcmToken },
    });

    if (device) {
      throw new AppError('Device with this FCM token already exists', 400);
    }

    const newDevice = await prisma.device.create({
      data: {
        fcmToken: data.fcmToken,
        stationId,
      },
    });

    return newDevice;
  }

  async sendNotificationToAll(stationId: string, dto: SendNotificationDto) {
    const devices = await prisma.device.findMany({
      where: { stationId },
      select: { fcmToken: true },
    });

    console.log({ devices });

    if (devices.length === 0) {
      throw new AppError('No devices found for this station', 404);
    }

    const tokens = devices.map((d) => d.fcmToken);

    const notification: admin.messaging.Notification = {
      title: dto.title,
      body: dto.body,
    };

    if (dto.image) {
      notification.imageUrl = dto.image;
    }

    const message: admin.messaging.MulticastMessage = {
      tokens,
      notification,
      ...(dto.data && { data: dto.data }),
      android: {
        priority: 'high',
      },
    };

    const response = await admin.messaging().sendEachForMulticast(message);

    // Collect tokens that failed permanently so we can clean them up
    const tokensToRemove: string[] = [];
    response.responses.forEach((resp, idx) => {
      if (
        resp.error &&
        (resp.error.code === 'messaging/registration-token-not-registered' ||
          resp.error.code === 'messaging/invalid-registration-token')
      ) {
        tokensToRemove.push(tokens[idx]);
      }
    });

    // Remove invalid tokens from DB
    if (tokensToRemove.length > 0) {
      await prisma.device.deleteMany({
        where: { fcmToken: { in: tokensToRemove } },
      });
    }

    return {
      totalDevices: tokens.length,
      successCount: response.successCount,
      failureCount: response.failureCount,
      tokensRemoved: tokensToRemove.length,
    };
  }
}
export const deviceService = new DeviceService();
