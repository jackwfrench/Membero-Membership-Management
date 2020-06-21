import { Request, Response, NextFunction } from 'express';
import { ErrorHandler, handleError } from '../helpers/error';

const errorMiddleware = function (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  handleError(err, res);
};

export default errorMiddleware;
