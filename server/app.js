import express from 'express';
import cors from 'cors';
import path from 'path';
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

// Static file serving and SPA fallback for production
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*all', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      next();
    }
  });
});

export default app;
