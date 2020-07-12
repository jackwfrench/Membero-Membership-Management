import mongoose from 'mongoose';

interface IOrganisation extends mongoose.Document {
  organisationName: string;
  description: string;
  subscriptionType: string;
  masterAdmin: string;
  dateCreated: number;
}

export const OrganisationSchema = new mongoose.Schema({
  organisationName: { type: String, required: true },
  description: { type: String },
  subscriptionType: { type: String, required: true },
  masterAdmin: { type: String, required: true },
  dateCreated: { type: Number, required: true },
});

const Organisation = mongoose.model<IOrganisation>('Organisation', OrganisationSchema);
export default Organisation;
