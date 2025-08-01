import { connectToDB } from './mongoose';
import { User } from './models/User';
import bcrypt from 'bcryptjs';

interface SaveUserWithOTPParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  otp: string;
}

export async function saveUserWithOTP({ firstName, lastName, email, phone, password, otp }: SaveUserWithOTPParams) {
  await connectToDB();

  const hashedPassword = await bcrypt.hash(password, 10);

  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    otp,
    otpExpires,
    isVerified: false,
  });
}