import express, { Router } from 'express';

// import middleware
import validateToken from '../middleware/authenticate.middleware';

// import controllers
import * as OrganisationController from '../controllers/organisation.controller';

// import validator middleware
import * as OrganisationValidator from '../validators/organisation.validate';

let router: Router = express.Router();

/**
 * @api {post} /organisation Create an organisation
 * @apiName CreateOrganisation
 * @apiGroup Organisation
 *
 * @apiParam {String} name Name of the organisation
 * @apiParam {String} subscriptionType Type of club
 * @apiParam {String} [description] Description of the organisation
 * @apiPermission admin
 */
router.post('/', validateToken, OrganisationValidator.validateCreateOrganisation, OrganisationController.createOrganisation);

/**
 * @api {post} /organisation/membership Create a new membership
 * @apiName CreateMembership
 * @apiGroup Organisation
 *
 * @apiParam {string} organisationId The Id number of the oranisation
 * @apiParam {string} membershipName The name of the membership type
 * @apiParam {Array} form An array of objects with all the fields of the signup form
 * @apiPermission admin
 */
router.post('/membership', validateToken, OrganisationValidator.validateCreateMembership, OrganisationController.createMembership);

/**
 * @api {get} /organisation/members Get all members
 * @apiName GetMembers
 * @apiGroup Organisation
 *
 * @apiPermission admin
 */
router.get('/members/:organisationId', validateToken, OrganisationValidator.validateGetMembers, OrganisationController.getMembers);

/**
 * @api {get} organisation/memberships/:organisationId Get memberships
 * @apiName Get Memberships
 * @apiGroup Organisation
 * @apiParam organisationId
 * @apiPermission admin
 */
router.get('/memberships/:organisationId', validateToken, OrganisationValidator.validateGetMemberships, OrganisationController.getMemberships);

/**
 * @api {get} organisation/membership/:membershipId Get a membership form
 * @apiName Get Membership Form
 * @apiGroup Organisation
 * @apiParam membershipId
 */
router.get('/membership/:membershipId', OrganisationValidator.validateGetMembershipForm, OrganisationController.getMembershipForm);

/**
 * @api {post} organisation/onboardlink Toggle a membership onboard link
 * @apiName Open onboard link
 * @apiGroup Organisation
 * @apiParam membershipId
 * @apiParam linkOpen
 *
 * @apiSuccessExample {json} Success-Response:
 *   200 OK
 *   {
 *     "firstname": "John",
 *     "lastname": "Doe"
 *   }
 */
router.post('/onboardlink', validateToken, OrganisationValidator.validateOnboardLink, OrganisationController.onboardLinkStatus);

export default router;
