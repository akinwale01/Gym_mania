import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import PendingUser from '@/lib/models/pendingUser';
import Otp from '@/lib/models/Otp';
import { sendOtp } from '@/lib/sendOtp';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectToDB();

    const user = await PendingUser.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'No pending user found' }, { status: 404 });
    }

    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    await Otp.findOneAndUpdate(
      { email },
      { code: otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendOtp(email, otp);

    return NextResponse.json({ message: 'OTP resent successfully' });
  } catch (err) {
    console.error('[RESEND_OTP]', err);
    return NextResponse.json({ error: 'Failed to resend OTP' }, { status: 500 });
  }
}