'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function SignUpBtn() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);


    setTimeout(() => {
      router.push('/body/signup');
    }, 2000);
  };

  return (
    <button onClick={handleClick}
      disabled={loading} className="bg-red-900 text-white p-2 rounded hover:bg-[#121520] font-semibold cursor-pointer lg:text-[12px] text-[12px] text-center lg:w-20 lg:h-10 w-full h-[50px] lg:transition-all lg:duration-300 hover:scale-110 lg:tracking-wide">

      {loading ? 'Sign up' : 'Sign up'}
    </button>
  );
}
