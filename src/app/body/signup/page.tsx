'use client'
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

export default function Signup() {
  const [formData, setFormData] = useState({ firstName: '', lastName:'', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData({ ...formData, phone: value || '' });

    if (!value || !isValidPhoneNumber(value)) {
      setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }));
    } else {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    if (inputRef.current) {
      const cursorPos = inputRef.current.selectionStart ?? password.length;
      setShowPassword((prev) => !prev);

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(cursorPos, cursorPos);
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.phone || !formData.firstName || !formData.lastName || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/verify?email=${formData.email}`);
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      alert('Something went wrong');
      console.error(error);
    }
  };

  return (
    <main>
      <section>
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* IMAGE BACKGROUND SECTION */}
          <div className="relative w-full md:w-[60%] h-screen md:h-auto">
            <div className="absolute inset-0 bg-[url('/images/boxing.png')] bg-cover bg-center brightness-30 md:brightness-40" />

            {/* MOBILE FORM */}
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

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

                  <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />
                  <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />

                  <div>
                    <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <PhoneInput international defaultCountry="GB" value={formData.phone} onChange={handlePhoneChange} className="w-full p-3 border border-gray-300 rounded" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div className="relative w-full">
                    <input ref={inputRef} type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 pr-10 border border-gray-300 rounded" />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700" tabIndex={-1}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-red-700 transition">Create Account</button>
                  <Link href="/body/login" className="text-blue-600 hover:text-red-700 transition flex items-center justify-center text-[14px]">Already have an account? Login!</Link>
                </form>
              </div>
            </div>
          </div>

          {/* DESKTOP FORM */}
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

              <form className="space-y-4" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-gray-800 text-center">Register</h2>

                <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />
                <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />

                <div>
                  <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <PhoneInput international defaultCountry="GB" value={formData.phone} onChange={handlePhoneChange} className="w-full p-3 border border-gray-300 rounded" />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="relative w-full">
                  <input ref={inputRef} type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 pr-10 border border-gray-300 rounded" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center px-1 text-gray-500 hover:text-gray-700" tabIndex={-1}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-red-700 transition">Create Account</button>

                <div onClick={() => router.push('/body/login')} className="text-blue-600 hover:text-red-700 transition flex items-center justify-center text-[14px] cursor-pointer">
                  Already have an account? Login!
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}