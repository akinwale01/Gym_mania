import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';
import PendingUser from '@/lib/models/pendingUser';
import Otp from '@/lib/models/Otp';
import { sendOtp } from '@/lib/sendOtp';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, password } = await req.json();
    await connectToDB();

    const existingPending = await PendingUser.findOne({ email });
    if (existingPending) {
      return NextResponse.json({ error: 'OTP already sent. Please verify.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await PendingUser.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    await Otp.findOneAndUpdate(
      { email },
      { code: otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendOtp(email, otp);

    return NextResponse.json({ message: 'OTP sent to email. Please verify.' });
  } catch (err) {
    console.error('[SIGNUP_ERROR]', err);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}