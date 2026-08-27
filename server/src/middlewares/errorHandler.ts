import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error Details:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // We only send the stack trace if we are not in production for security reasons
  const errorDetails = process.env.NODE_ENV !== 'production' ? err.stack : null;

  return sendError(res, statusCode, message, errorDetails);
};
