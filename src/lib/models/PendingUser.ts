import mongoose, { Schema, Document } from 'mongoose';

export interface IPendingUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
}

const PendingUserSchema = new Schema<IPendingUser>(
  {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    phone:     { type: String, required: true },
    password:  { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 mins
  },
  { timestamps: true }
);

export default mongoose.models.PendingUser ||
  mongoose.model<IPendingUser>('PendingUser', PendingUserSchema);