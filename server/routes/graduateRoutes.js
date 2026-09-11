import { Router } from 'express';
import {
  getGraduatesRepository,
  getGraduateKpis,
  getGraduateAnalytics,
} from '../controllers/graduateController.js';

const router = Router();

router.get('/', getGraduatesRepository);
router.get('/kpis', getGraduateKpis);
router.get('/analytics', getGraduateAnalytics);

export default router;
