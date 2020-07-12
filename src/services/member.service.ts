import { ErrorHandler } from '../helpers/error';
import { stringArraysEqual } from '../helpers/functions';
require('dotenv').config();

// import interfaces
import { IMember } from '../helpers/definitions';

// import models
import Member from '../models/member.model';
import Membership from '../models/membership.model';

export default class MemberService {
  /**
   * Create a new member
   * @param member
   */
  static async createMember(member: IMember) {
    console.log('got here');
    console.log(member.form);
    // validate form submission details
    const validForm = await this.validateForm(member.form, member.membershipId);
    if (!validForm) throw new ErrorHandler(400, 'Invalid form fields');
    // deconstruct validate request body
    const { membershipId, organisationId, form } = member;

    // add new member
    const newMember = new Member({
      organisationId: organisationId,
      membershipId: membershipId,
      formValues: form,
      dateCreated: Date.now() / 1000,
    });
    // return saved member
    return await newMember.save();
  }

  /**
   * Validates a membership form with the membership
   * @param form
   * @param membershipTypeId
   */
  static async validateForm(form: Object, membershipId: string) {
    const membership: any = await Membership.findById(membershipId);
    if (
      membership &&
      stringArraysEqual(
        Object.keys(form),
        membership.form.map((field: any) => field.fieldName)
      )
    )
      return true;
    return false;
  }

  /**
   * Get all members basic details in specified organisation
   * @param organisationId
   */
  static async getMembers(organisationId: string) {
    console.log(organisationId);
    const members = await Member.find({ organisationId: organisationId }).select('formValues.Name formValues.Email dateCreated');
    return members;
  }

  /**
   * Get member details
   * @param memberId
   */
  static async getMember(memberId: string) {
    return await Member.findById(memberId);
  }
}
