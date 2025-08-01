'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const router = useRouter();

  // ✅ Load email safely in browser after component mounts
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleDelete = async () => {
    if (!userEmail) {
      setFeedback('❌ No user email found.');
      return;
    }

    try {
      const res = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (res.ok) {
        setFeedback('✅ Account deleted successfully. Come back soon!');

        // Clear storage and redirect after short delay
        localStorage.removeItem('userEmail');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        const data = await res.json();
        setFeedback(`❌ ${data.error || 'Failed to delete account'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setFeedback('❌ Something went wrong.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-gray-700 mb-6">
          You have successfully signed up or logged in.
        </p>

        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete My Account
        </button>

        {showConfirm && (
          <div className="mt-6 bg-red-50 border border-red-400 text-red-700 p-4 rounded">
            <p className="mb-4 font-semibold">Are you sure you want to delete your account?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        )}

        {feedback && (
          <div className={`mt-4 text-lg font-medium ${feedback.includes('✅') ? 'text-green-800' : 'text-red-600'}`}>
            {feedback}
          </div>
        )}
      </div>
    </main>
  );
}