import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
    return;
  }

  const details = result.array().reduce<Record<string, string[]>>((errors, error) => {
    const field = 'path' in error ? error.path : 'request';
    errors[field] = [...(errors[field] ?? []), error.msg];
    return errors;
  }, {});

  res.status(400).json({
    status: 'error',
    code: 'VALIDATION_ERROR',
    message: 'Please check the submitted fields',
    details,
  });
};
