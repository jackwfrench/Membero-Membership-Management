import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../helpers/error';
import { validationResult } from 'express-validator';

// import services
import MemberService from '../services/member.service';
/**
 * Creates a new member
 * @param req
 * @param res
 * @param next
 */
export let createMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // add new member
    const member = await MemberService.createMember(req.body);

    // send response
    res.send({ status: 'success', member: member });
  } catch (error) {
    next(error);
  }
};

export let getMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // get member details
    const member = await MemberService.getMember(req.params.id);

    // send response
    return res.send({ status: 'success', member: member });
  } catch (error) {
    next(error);
  }
};
