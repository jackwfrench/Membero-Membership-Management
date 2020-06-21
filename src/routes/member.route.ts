import express, { Router } from 'express';

// import middleware
import validateToken from '../middleware/authenticate.middleware';

// import controllers
import * as MemberController from '../controllers/member.controller';

// import validator middleware
import * as MemberValidator from '../validators/member.validate';

let router: Router = express.Router();

/**
 * @api {post} /member Create a new member
 * @apiName CreateMember
 * @apiGroup Member
 *
 * @apiParam {String} organisationId Id of the club
 * @apiParam {String} membershipId Membership Id
 * @apiParam {Object} form The form object with the details of the member
 */
router.post('/', MemberValidator.createMember, MemberController.createMember);

/**
 * @api {get} /member/:id Get a member
 * @apiName GetMember
 * @apiGroup Member
 *
 * @apiParam {String} :id
 */
router.get('/:id', validateToken, MemberValidator.getMember, MemberController.getMember);

export default router;
