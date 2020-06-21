import mongoose from 'mongoose';

interface IMember extends mongoose.Document {
  organisationId: string;
  membershipTypeId: string;
  dateAdded: string;
  formValues: Object;
}

const MemberSchema = new mongoose.Schema({
  organisationId: { type: String, required: true },
  membershipId: { type: String, required: true },
  dateCreated: { type: String, required: true },
  formValues: { type: Object, required: true },
});

const Member = mongoose.model<IMember>('Member', MemberSchema);
export default Member;
