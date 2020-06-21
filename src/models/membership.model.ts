import mongoose from 'mongoose';

interface IMembership extends mongoose.Document {
  organisationId: string;
  membershipName: string;
  form: Object;
  onboardLink: boolean;
  dateCreated: string;
}

const membershipSchema = new mongoose.Schema({
  organisationId: { type: String, required: true },
  membershipName: { type: String, required: true },
  form: { type: Object, required: true },
  onboardLink: { type: Boolean, required: true },
  dateCreated: { type: String, required: true },
});

const ClubType = mongoose.model<IMembership>('Membership', membershipSchema);
export default ClubType;
