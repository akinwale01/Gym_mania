import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import {User} from '@/lib/models/User';
import PendingUser from '@/lib/models/PendingUser';
import Otp from '@/lib/models/Otp';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    await connectToDB();

    const record = await Otp.findOne({ email });
    if (!record || record.code !== otp) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return NextResponse.json({ error: 'No pending signup found' }, { status: 404 });
    }

    await User.create({
      firstName: pendingUser.firstName,
      lastName: pendingUser.lastName,
      email: pendingUser.email,
      phone: pendingUser.phone,
      password: pendingUser.password,
      isVerified: true,
    });

    await PendingUser.deleteOne({ email });
    await Otp.deleteOne({ email });

    return NextResponse.json({ message: 'Account verified and created successfully' });
  } catch (err) {
    console.error('[VERIFY_OTP_ERROR]', err);
    return NextResponse.json({ error: 'OTP verification failed' }, { status: 500 });
  }
}