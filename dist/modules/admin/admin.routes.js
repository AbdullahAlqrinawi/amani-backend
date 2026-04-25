import { Router } from 'express';
import { validateBody } from '../../middlewares/validate.middleware.js';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { adminLoginSchema } from './admin.validation.js';
import { loginController, meController } from './admin.controller.js';
const router = Router();
router.post('/login', validateBody(adminLoginSchema), asyncHandler(loginController));
router.get('/me', requireAdminAuth, asyncHandler(meController));
export default router;
//# sourceMappingURL=admin.routes.js.map