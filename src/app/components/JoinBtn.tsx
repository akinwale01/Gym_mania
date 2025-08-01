'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function JoinBtn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);


    setTimeout(() => {
      router.push('/body/signup');
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-[#121520] text-white px-8 py-4 rounded-full hover:bg-[#36381c] hover:shadow-lg font-semibold cursor-pointer text-[20px] text-center w-80 h-20 font-bitcount-grid-double disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? 'Please wait...' : 'Begin Journey...'}
    </button>
  );
}