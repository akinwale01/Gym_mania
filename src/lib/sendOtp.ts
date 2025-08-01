import { transporter } from './emailTransporter';

export async function sendOtp(email: string, otp: string) {
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
  });
}