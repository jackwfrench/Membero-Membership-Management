import { Response } from 'express';

interface IErrorHandler {
  statusCode: number;
  message: string;
}

class ErrorHandler extends Error implements IErrorHandler {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Handles thrown errors from middleware
 * @param err
 * @param res
 */
const handleError = (err: ErrorHandler, res: Response) => {
  let statusCode: number;
  let message = err.message;
  statusCode = err.statusCode ? err.statusCode : (statusCode = 500);
  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
