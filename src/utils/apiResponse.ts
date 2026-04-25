import { Response } from 'express';

export function successResponse(
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = null
) {
  return res.status(statusCode).json({
    error: false,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string,
  details: unknown = null
) {
  return res.status(statusCode).json({
    error: true,
    message,
    details,
  });
}