'use client';

import { useSearchParams } from 'next/navigation';
import OtpVerificationForm from '@/app/components/OtpVerificationForm';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <main className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Email Verification</h1>
      {email ? (
        <OtpVerificationForm email={email} />
      ) : (
        <p className="text-red-500">Email is missing from URL.</p>
      )}
    </main>
  );
}