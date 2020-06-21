import mongoose from 'mongoose';

interface IOrganisation extends mongoose.Document {
  organisationName: string;
  description: string;
  subscriptionType: string;
  masterAdmin: string;
  dateCreated: number;
}

export const ClubSchema = new mongoose.Schema({
  organisationName: { type: String, required: true },
  description: { type: String },
  subscriptionType: { type: String, required: true },
  masterAdmin: { type: String, required: true },
  dateCreated: { type: Number, required: true },
});

const Club = mongoose.model<IOrganisation>('Organisation', ClubSchema);
export default Club;
