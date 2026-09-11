import { Router } from 'express';
import { getExecutiveSummary, getMetricModalDetails } from '../controllers/executiveController.js';

const router = Router();

router.get('/', getExecutiveSummary);
router.get('/summary', getExecutiveSummary);
router.get('/modal/:metricKey', getMetricModalDetails);

export default router;
