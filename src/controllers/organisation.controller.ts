import { Request, Response, NextFunction } from 'express';

// import services
import OrganisationService from '../services/organisation.service';
import AdminService from '../services/admin.service';
import MemberService from '../services/member.service';

// import validators
import { validationResult } from 'express-validator';

// import helpers
import { ErrorHandler } from '../helpers/error';

/**
 * Create a new organisation
 * @param req
 * @param res
 * @param next
 */
export let createOrganisation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // add admin id to req.body
    req.body.adminId = req.user.id;

    // create a new organisation
    const savedOrganisation = await OrganisationService.createOrganisation(req.body);

    // add organisationId to admin
    await AdminService.addOrganisation(req.user.id, savedOrganisation._id.toString());

    // send response
    return res.send({
      message: 'organisation created',
      status: 'success',
      details: { organisationId: savedOrganisation._id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new Membership
 * @param req
 * @param res
 * @param next
 */
export let createMembership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // create new type
    const membership = await OrganisationService.createMembership(req.body);

    // send response
    return res.send(membership);
  } catch (error) {
    next(error);
  }
};

/**
 * Gets organisation memberships
 * @param req
 * @param res
 * @param next
 */
export let getMemberships = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // check that admin is apart of organisation
    const isOrganisationAdmin = await OrganisationService.isAdmin(req.params.organisationId, req.user.id);
    if (!isOrganisationAdmin) throw new ErrorHandler(401, 'Not a member of this organisation');

    // get memberships from organisation services
    const memberships = await OrganisationService.getMemberships(req.params.organisationId);

    // respond with memberships
    return res.send({ status: 'success', memberships: memberships });
  } catch (error) {
    next(error);
  }
};

/**
 * Get membership form
 * @param req
 * @param res
 * @param next
 */
export let getMembershipForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    const membershipForm = await OrganisationService.membershipForm(req.params.membershipId);

    // if onboarding link
    if (membershipForm?.onboardLink) {
      return res.send(membershipForm);
    }

    // if not onboard link
    return res.status(404).send({ success: false, message: 'onboard link does not exist' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get table view of organisation members
 * @param req
 * @param res
 * @param next
 */
export let getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // check that admin is in organisation
    const isOrganisationAdmin = await OrganisationService.isAdmin(req.params.organisationId, req.user.id);
    if (!isOrganisationAdmin) throw new ErrorHandler(401, 'Not a member of this organisation');

    // get member details
    const members = await MemberService.getMembers(req.params.organisationId);
    console.log(req.params.organisationId);
    // respond with details
    return res.send({ status: 'success', members: members });
  } catch (error) {
    next(error);
  }
};

/**
 * Update onboard link status
 */
export let onboardLinkStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) throw new ErrorHandler(400, 'Invalid request body');

    // deconstruct req body
    const { membershipId, linkOpen } = req.body;

    // validate admin belongs to organisation
    const membership: any = await OrganisationService.membershipForm(membershipId);
    const isAdmin = await OrganisationService.isAdmin(membership.organisationId, req.user.id);
    if (!isAdmin) throw new ErrorHandler(401, 'not an admin of this membership');

    // update onboard link status (true or false)
    const linkUpdate = await OrganisationService.alterOnboardLink(membershipId, linkOpen);

    // send update response
    return res.send({ status: 'success', linkStatus: linkUpdate?.onboardLink });
  } catch (error) {
    next(error);
  }
};
