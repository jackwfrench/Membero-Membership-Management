// club interface
export interface IOrganisation {
  name: string;
  description?: string;
  subscriptionType: string;
  adminId: string;
}

export interface IAdmin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IMembership {
  organisationId: string;
  membershipName: string;
  form: Array<Object>;
}

export interface IMember {
  organisationId: string;
  membershipId: string;
  form: Object;
}
