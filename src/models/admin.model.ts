import mongoose from 'mongoose';

interface IAdmin extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organisations: Array<string>;
  dateCreated: number;
}

export const AdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  organisations: { type: Array<String>(), required: true },
  dateCreated: { type: Number, required: true },
});

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
export default Admin;
