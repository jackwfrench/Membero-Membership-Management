import express, { Router } from 'express';
import validateToken from '../middleware/authenticate.middleware';

// import controllers
import * as AdminController from '../controllers/admin.controller';

// import validator middleware
import * as AdminValidator from '../validators/admin.validate';

let router: Router = express.Router();

/**
 * @api {post} /admin Create a new Admin
 * @apiName CreateAdmin
 * @apiGroup Admin
 *
 * @apiParam {String} firstName First name of the admin
 * @apiParam {String} lastName Lastname of the admin
 * @apiParam {Email} email Email address of the admin
 * @apiParam {String} password Password the account - (minimum of 8 characters)
 *
 */
router.post('/', AdminValidator.validateCreateAdmin, AdminController.createAdmin);

/**
 * @api {post} /admin/login Login as admin
 * @apiName AdminLogin
 * @apiGroup Admin
 *
 * @apiParam {Email} email
 * @apiParam {String} password
 */
router.post('/login', AdminValidator.validateAdminLogin, AdminController.adminLogin);

/**
 * @api {get} /admin/organisations Get organisations
 * @apiName GetOrganisations
 * @apiGroup Admin
 */
router.get('/organisations', validateToken, AdminController.getOrganisations);

export default router;
