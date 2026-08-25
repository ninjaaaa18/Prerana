import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: Record<string, string[]>;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const isServerError = statusCode >= 500;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    code: err.code || (isServerError ? 'INTERNAL_ERROR' : 'REQUEST_ERROR'),
    message: isServerError ? 'Internal Server Error' : err.message,
    ...(err.details ? { details: err.details } : {}),
  });
};
