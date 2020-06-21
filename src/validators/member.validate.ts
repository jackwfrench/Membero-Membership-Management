import { check } from 'express-validator';

/**
 * Validate createMember request
 */
export const createMember = [check('organisationId').isString(), check('membershipId').isString(), check('form')];

export const getMember = [check('id').isString()];
