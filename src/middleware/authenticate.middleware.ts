import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../helpers/error';
require('dotenv').config();

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // extract token from request
    let token = req.cookies.jwt;
    if (token) {
      // decode token
      const secret: string = <string>process.env.JWTSECRET;
      const decoded: any = jwt.verify(token, secret);
      // if valid token
      if (decoded) {
        req.user = { id: <string>decoded.id };
        next();
      } else {
        throw new ErrorHandler(401, 'Invalid token');
      }
    } else {
      throw new ErrorHandler(401, 'Invalid token');
    }
  } catch (error) {
    next(error);
  }
};
