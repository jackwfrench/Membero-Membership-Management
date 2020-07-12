import * as Definitions from '../helpers/definitions';
import Organisation from '../models/organisation.model';
import Membership from '../models/membership.model';
import Admin from '../models/admin.model';
import Types from 'mongoose';

export default class OrganisationService {
  /**
   * Create a new organisation
   * @param organisation
   */
  static async createOrganisation(organisation: Definitions.IOrganisation) {
    const newOrganisation = new Organisation({
      organisationName: organisation.name,
      description: organisation.description,
      subscriptionType: organisation.subscriptionType,
      masterAdmin: organisation.adminId,
      dateCreated: Date.now() / 1000,
    });
    return await newOrganisation.save();
  }

  /**
   * Create a new organisation type
   * @param organisationType
   */
  static async createMembership(membership: Definitions.IMembership) {
    const newMembership = new Membership({
      organisationId: membership.organisationId,
      membershipName: membership.membershipName,
      form: membership.form,
      onboardLink: false,
      dateCreated: Date.now() / 1000,
    });
    return await newMembership.save();
  }

  /**
   * Get all memberships
   * @param organisationId
   */
  static async getMemberships(organisationId: string) {
    return await Membership.find({ organisationId: organisationId }, { membershipName: 1, onboardLink: 1 }).exec();
  }

  /**
   * get membership form
   * @param membershipId
   */
  static async membershipForm(membershipId: string) {
    return await Membership.findById(membershipId).exec();
  }

  /**
   * alter onboard link value (either true or false)
   * @param membershipId
   * @param linkOpen
   */
  static async alterOnboardLink(membershipId: string, linkOpen: Boolean) {
    const updatedLink = await Membership.findByIdAndUpdate(membershipId, { $set: { onboardLink: linkOpen } });
    return updatedLink;
  }

  /**
   * Checks that admin is in organisation
   * @param organisationId
   * @param adminId
   */
  static async isAdmin(organisationId: string, adminId: string) {
    const admin = await Admin.findById(adminId).exec();
    if (admin?.organisations.includes(organisationId)) return true;
    return false;
  }
}
