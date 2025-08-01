'use client';
import { useState, useRef } from "react";
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LogIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const togglePasswordVisibility = () => {
    if (inputRef.current) {
      const cursorPos = inputRef.current.selectionStart ?? formData.password.length;
      setShowPassword((prev) => !prev);

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(cursorPos, cursorPos);
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Save email to localStorage for dashboard access
      localStorage.setItem('userEmail', formData.email);

      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      alert(data.error || 'Login failed');
    }
  } catch {
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <main>
      <section>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* IMAGE BACKGROUND SECTION */}
          <div className="relative w-full md:w-[70%] h-screen md:h-auto">
            <div className="absolute inset-0 bg-[url('/images/group.png')] bg-cover bg-center brightness-30 md:brightness-40" />

            {/* FORM on IMAGE - MOBILE VIEW */}
            <div className="relative z-10 flex justify-center items-center h-full w-full md:hidden p-6">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-md">
                <div className="pt-10 pb-8 flex justify-center items-center">
                  <Link href="/">
                    <div className='space-y-2'>
                      <div className='bg-[url(/logo/logo-4.jpg)] h-15 w-15 bg-cover bg-center rounded-full ml-5' />
                      <p className="font-black font-bitcount-grid-double text-[20px] logo-text">GYM_MANIA</p>
                    </div>
                  </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back !</h2>

                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <input
                      ref={inputRef}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 pr-10 border border-gray-300 rounded"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-red-700 transition"
                  >
                    Log In
                  </button>

                  <p className="text-center">
                    <Link href="#" className="text-gray-600 hover:text-red-700">
                      Forgot Password?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* FORM SECTION - DESKTOP ONLY */}
          <div className="hidden md:flex w-full md:w-[40%] justify-center items-center p-12">
            <div className="w-full max-w-md">
              <div className="pt-10 pb-8 flex justify-center items-center">
                <Link href="/">
                  <div className='space-y-2'>
                    <div className='bg-[url(/logo/logo-4.jpg)] h-15 w-15 bg-cover bg-center rounded-full ml-5' />
                    <p className="font-black font-bitcount-grid-double text-[20px] logo-text">GYM_MANIA</p>
                  </div>
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Welcome Back !</h2>

                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 pr-10 border border-gray-300 rounded"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded hover:bg-red-700 transition"
                >
                  Log In
                </button>

                <p className="text-center">
                  <Link href="#" className="text-gray-600 hover:text-red-700">
                    Forgot Password?
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}