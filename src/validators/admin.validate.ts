import { check } from 'express-validator';

export const validateCreateAdmin = [
  check('firstName').isString(),
  check('lastName').isString(),
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 50 }),
];

export const validateAdminLogin = [
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 50 }),
];
