import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String, // make sure to hash before saving
  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);