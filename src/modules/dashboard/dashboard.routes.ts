import { Router } from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { dashboardStatsController } from './dashboard.controller.js';

const router = Router();

router.get('/stats', requireAdminAuth, asyncHandler(dashboardStatsController));

export default router;