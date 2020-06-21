import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../helpers/error';
import { validationResult } from 'express-validator';
require('dotenv').config();

// import services
import AdminService from '../services/admin.service';
import MemberService from '../services/member.service';
import OrganisationService from '../services/organisation.service';

/**
 * Creates a new admin
 * @param req
 * @param res
 * @param next
 */
export let createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // create new admin
    await AdminService.createAdmin(req.body);

    // send response
    return res.send({ message: 'admin created', status: 'success' });
  } catch (error) {
    next(error);
  }
};

/**
 * Authenticates an admin
 * @param req
 * @param res
 * @param next
 */
export let adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');
    // deconstruct validated fields
    const { email, password } = req.body;

    // login admin and recieve token
    const token = await AdminService.adminLogin(email, password);

    // set jwt cookie and send response
    res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 43200000 });
    res.send({ status: 'success', message: 'authentication successful' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all admin organisations
 */
export let getOrganisations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // no validation necessary (no params)

    // get organisations
    const organisations = await AdminService.getOrganisations(req.user.id);
    console.log(organisations);
    // send response
    return res.send({ status: 'success', organisations: organisations });
  } catch (error) {
    next(error);
  }
};
