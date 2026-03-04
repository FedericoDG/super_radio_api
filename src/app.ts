import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './features/user/user.routes';
import programRoutes from './features/program/program.routes';
import scheduleRoutes from './features/schedule/schedule.routes';
import stationRoutes from './features/station/station.routes';
import deviceRoutes from './features/device/device.routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  const dbUrl = process.env.DATABASE_URL;
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    debug: {
      hasDbUrl: !!dbUrl,
      dbUrlPreview: dbUrl ? dbUrl.substring(0, 30) + '...' : 'NOT SET',
      nodeEnv: process.env.NODE_ENV,
    },
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stations/:stationId/programs', programRoutes);
app.use('/api/stations/:stationId/schedules', scheduleRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/devices', deviceRoutes);

// Error handling
app.use(errorHandler);

export default app;
