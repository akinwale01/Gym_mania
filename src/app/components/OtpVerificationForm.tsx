'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function OtpVerificationForm({ email }: { email: string }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(180); // ⏳ Countdown
  const [resending, setResending] = useState(false);
  const router = useRouter();

  // Countdown effect for expiration
  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

useEffect(() => {
  if (!message) return;
  const timer = setTimeout(() => setMessage(''), 5000);
  return () => clearTimeout(timer);
}, [message]);

  // Resend OTP handler
  const handleResend = async () => {
    setResending(true);
    setMessage('');

    try {
      const res = await fetch('/api/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ New OTP sent to your email.');
        setSecondsLeft(180); // restart timer
        setOtp('');
      } else {
        setMessage(`❌ ${data.error || 'Failed to resend OTP'}`);
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setMessage('❌ Could not resend OTP.');
    }

    setResending(false);
  };

  const verifyOtp = async () => {
    if (otp.length !== 5) {
      setMessage('❌ OTP must be 5 digits.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem('userEmail', email);
        setMessage('✅ Email verified');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setMessage(`❌ ${data.error || 'Invalid OTP'}`);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setMessage('❌ Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-center">
        Enter OTP sent to <span className="text-blue-700">{email}</span>
      </h2>

      {/* ✅ OTP input */}
      <InputOTP
        maxLength={5}
        value={otp}
        onChange={(val) => setOtp(val)}
        disabled={loading}

      >
        <InputOTPGroup  className='flex mx-auto'>
          {Array.from({ length: 5 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}

        </InputOTPGroup>
      </InputOTP>

      {/* ✅ Verify button */}
      <button
        onClick={verifyOtp}
        disabled={loading || otp.length !== 5}
        className={`w-full text-white px-4 py-2 rounded transition ${
          loading || otp.length !== 5
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>

      {/* 🔁 Resend section */}
      <div className="text-sm text-center">
        {secondsLeft > 0 ? (
          <p className="text-gray-500">⏳ OTP expires in {secondsLeft}s</p>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-blue-600 hover:underline mt-2"
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </div>

      {message && (
        <p className="text-sm text-center font-medium mt-2">{message}</p>
      )}
    </div>
  );
}