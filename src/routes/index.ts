import { Router } from 'express';
import adminRoutes from '../modules/admin/admin.routes.js';
import reportRoutes from '../modules/reports/report.routes.js';
import dashboardRoutes from '../modules/dashboard/dashboard.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    error: false,
    message: 'Amani backend is running',
  });
});

router.use('/admin', adminRoutes);
router.use('/reports', reportRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;