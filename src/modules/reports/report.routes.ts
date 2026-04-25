import { Router } from 'express';
import { requireAdminAuth } from '../../middlewares/auth.middleware.js';
import { validateBody } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import {
  addMessageController,
  createReportController,
  getMessagesController,
  getReportController,
  listReportsController,
  updatePriorityController,
  updateStatusController,
} from './report.controller.js';
import {
  createMessageSchema,
  createReportSchema,
  updatePrioritySchema,
  updateStatusSchema,
} from './report.validation.js';

const router = Router();

router.post(
  '/',
  validateBody(createReportSchema),
  asyncHandler(createReportController)
);

router.get(
  '/',
  requireAdminAuth,
  asyncHandler(listReportsController)
);

router.get(
  '/:caseCode',
  requireAdminAuth,
  asyncHandler(getReportController)
);

router.get(
  '/:caseCode/messages',
  asyncHandler(getMessagesController)
);

router.post(
  '/:caseCode/messages',
  validateBody(createMessageSchema),
  asyncHandler(addMessageController)
);

router.patch(
  '/:caseCode/status',
  requireAdminAuth,
  validateBody(updateStatusSchema),
  asyncHandler(updateStatusController)
);

router.patch(
  '/:caseCode/priority',
  requireAdminAuth,
  validateBody(updatePrioritySchema),
  asyncHandler(updatePriorityController)
);

export default router;