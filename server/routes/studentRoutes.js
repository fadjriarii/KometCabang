import { Router } from 'express';
import {
  getStudentsRepository,
  getStudentKpis,
  getStudentAnalytics,
} from '../controllers/studentController.js';

const router = Router();

router.get('/', getStudentsRepository);
router.get('/kpis', getStudentKpis);
router.get('/analytics', getStudentAnalytics);

export default router;
