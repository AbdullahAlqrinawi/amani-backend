import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { errorResponse } from '../utils/apiResponse.js';

export function notFoundMiddleware(req: Request, res: Response) {
  return errorResponse(res, 404, `Route not found: ${req.originalUrl}`);
}

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);

  if (error instanceof ZodError) {
    return errorResponse(res, 400, 'Validation error', error.flatten());
  }

  if (error instanceof Error) {
    return errorResponse(res, 500, error.message);
  }

  return errorResponse(res, 500, 'Internal server error');
}