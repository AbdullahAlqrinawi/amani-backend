import { Request, Response } from 'express';
import { successResponse } from '../../utils/apiResponse.js';
import { loginAdmin } from './admin.service.js';

export async function loginController(req: Request, res: Response) {
  const result = await loginAdmin(req.body);

  return successResponse(res, 200, 'Login successful', result);
}

export async function meController(req: Request, res: Response) {
  return successResponse(res, 200, 'Admin profile', {
    admin: req.admin,
  });
}