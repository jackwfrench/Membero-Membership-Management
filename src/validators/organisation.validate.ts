import { check } from 'express-validator';

/**
 * Validates createOrganisation request
 */
export const validateCreateOrganisation = [check('name').isString(), check('description').optional().isString(), check('subscriptionType').isString()];

/**
 * Validates createMembership request
 */
export const validateCreateMembership = [
  check('organisationId').isString(),
  check('membershipName').isString(),
  check('form').custom(async (form) => {
    const validForm = await validateForm(form);
    if (!validForm) Promise.reject('Invalid form type');
  }),
];

/**
 * Validate a new membership form
 */
const formfields = ['email', 'text'];

async function validateForm(form: Array<any>) {
  for (let field of form) {
    if (!formfields.includes(field.fieldType) || field.fieldName.length === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Validate getMembers request
 */

export const validateGetMembers = [check('organisationId').isString()];

/**
 * Validate a getMemberships request
 */
export const validateGetMemberships = [check('organisationId').isString()];

/**
 * Validate membership form request
 */
export const validateGetMembershipForm = [check('membershipId').isString()];

/**
 * Validate open onboard link request
 */
export const validateOnboardLink = [check('membershipId').isString(), check('linkOpen').isBoolean()];
