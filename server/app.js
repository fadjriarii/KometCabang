import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes.js';
import graduateRoutes from './routes/graduateRoutes.js';
import mbkmRoutes from './routes/mbkmRoutes.js';
import executiveRoutes from './routes/executiveRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'KOMET Academic Analytics Backend',
    timestamp: new Date().toISOString(),
  });
});

// Mount domain routes
app.use('/api/students', studentRoutes);
app.use('/api/graduates', graduateRoutes);
app.use('/api/mbkm', mbkmRoutes);
app.use('/api/executive-summary', executiveRoutes);

export default app;
