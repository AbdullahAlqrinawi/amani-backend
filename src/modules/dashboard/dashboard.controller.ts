import { Request, Response } from 'express';
import { successResponse } from '../../utils/apiResponse.js';
import { getDashboardStats } from './dashboard.service.js';

export async function dashboardStatsController(req: Request, res: Response) {
  const stats = await getDashboardStats();

  return successResponse(res, 200, 'Dashboard stats fetched successfully', {
    stats,
  });
}