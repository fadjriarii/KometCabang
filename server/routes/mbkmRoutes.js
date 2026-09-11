import { Router } from 'express';
import {
  getMbkmRepository,
  getMbkmKpis,
  getMbkmAnalytics,
} from '../controllers/mbkmController.js';

const router = Router();

router.get('/', getMbkmRepository);
router.get('/kpis', getMbkmKpis);
router.get('/analytics', getMbkmAnalytics);

export default router;
