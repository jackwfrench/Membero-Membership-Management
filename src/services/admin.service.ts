import { ErrorHandler } from '../helpers/error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

// import interfaces
import { IAdmin } from '../helpers/definitions';

// import models
import Admin from '../models/admin.model';
import Organisation from '../models/organisation.model';

export default class AdminService {
  /**
   * Find admin by email
   * @param email
   */
  static async getAdminByEmail(email: string) {
    return await Admin.findOne({ email: email });
  }
  /**
   * Create a new admin
   * @param admin
   * @returns new admin
   */
  static async createAdmin(admin: IAdmin) {
    // deconstruct sanatized request body
    const { firstName, lastName, email, password } = admin;

    // check for existing email
    const checkEmail = await this.getAdminByEmail(email);
    if (checkEmail) throw new ErrorHandler(409, 'email already exists');

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new admin document
    const newAdmin = new Admin({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      organisations: [],
      dateCreated: Date.now() / 1000,
    });

    // save admin document
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  }

  /**
   * Admin login
   * @param email
   * @param password
   * @returns jwt token
   */
  static async adminLogin(email: string, password: string) {
    // check for admin
    const adminExists = await this.getAdminByEmail(email);
    if (!adminExists) throw new ErrorHandler(401, 'Invalid email or password');

    // verify password
    const passwordCheck = bcrypt.compare(password, adminExists.password);
    if (!passwordCheck) throw new ErrorHandler(401, 'Invalid email or password');

    // create payload
    const payload = {
      id: adminExists._id,
      expires: Date.now() + 86400000,
    };

    // create a new token
    const token = jwt.sign(JSON.stringify(payload), <string>process.env.JWTSECRET);
    return token;
  }

  /**
   * Get a list of all orgnaisations associated with this admin
   * @param adminId
   */
  static async getOrganisations(adminId: string) {
    // get the organisation ids of the admin
    const admin = await Admin.findById(adminId, { organisations: 1 });

    // extract organisation Ids
    if (admin?.organisations) {
      const organisationIds: Array<string> = admin.organisations;
      console.log(organisationIds);
      // get each organisation info
      const organisations = await Promise.all(organisationIds.map(async (id) => Organisation.findById(id, { organisationName: 1 })));
      return organisations;
    } else return [];
  }
  /**
   * Add a organisation to an admin
   * @param adminId
   * @param organisationId
   */
  static async addOrganisation(adminId: string, organisationId: string) {
    await Admin.findOneAndUpdate({ _id: adminId }, { $push: { organisations: organisationId } });
  }
}
