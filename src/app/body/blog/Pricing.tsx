 "use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Pricing(){

 const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);


    setTimeout(() => {
      router.push('/body/signup');
    }, 2000);
  };


    return(
        <main>
            <section className="lg:mx-auto lg:max-w-[1450px] flex flex-col space-y-10 bg-[#000000ee] py-24 sm:px-10 text-white font-inter">
                <div className="px-4 sm:px-0 space-y-6">
                    <h1 className="text-orange-700 font-extrabold font-inter">Subscription</h1>
                    <h3 className="uppercase text-[30px] lg:text-[50px] font-inter font-bold text-white">flexible <span className="text-[#d44503]">plans </span> for every goal</h3>
                    <p className="text-center font-black uppercase text-[15px] lg:text-[20px]">Select a plan:</p>
                </div>


            <section>
  <div className="w-full py-12 lg:max-w-5xl mx-auto">
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:isolate"
    >
      {/* Individual Plan */}
      <div className="relative bg-blue-900 shadow-lg md:rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:z-10">
        <h3 className="text-xl font-semibold mb-4 text-black font-bitcount-grid-double uppercase">
          Individual
        </h3>
        <ul className="space-y-2 text-black mb-6 text-left">
          <li>✔️ Full gym access</li>
          <li>✔️ Free fitness assessment</li>
          <li>✔️ 1 personal training session/month</li>
          <li>✔️ Access to group classes</li>
        </ul>
    <button
      onClick={handleClick}
      disabled={loading}
className="
  mt-auto w-48 px-6 py-2 rounded transition-all duration-300
  bg-black text-white 
  hover:scale-105 hover:text-black 
  relative overflow-hidden z-10 group cursor-pointer
">
  <span className="
    absolute inset-0 z-0 transition-all duration-300
    group-hover:bg-gradient-to-r group-hover:from-[#FFA500] group-hover:via-[#FF8C00] group-hover:to-[#FFD700]
    group-hover:shadow-[0_4px_10px_rgba(255,165,0,0.6),0_0_15px_rgba(255,140,0,0.8)]
    rounded
  "></span>
  <span className="relative z-10 font-bold">Select</span>
</button>
      </div>

      {/* Duo Plan */}
      <div className="relative bg-green-900 shadow-lg md:rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:z-10">
        <h3 className="text-xl font-semibold mb-4 text-black font-bitcount-grid-double uppercase">
          Duo
        </h3>
        <ul className="space-y-2 text-black font-inter mb-6 text-left">
          <li>✔️ All Individual plan benefits</li>
          <li>✔️ 2 memberships (bring a friend)</li>
          <li>✔️ 2 personal training sessions/month</li>
          <li>✔️ Priority access to group classes</li>
          <li>✔️ 1 guest pass per month</li>
        </ul>

     <button 
        onClick={handleClick}
      disabled={loading}
     className="
  mt-auto w-48 px-6 py-2 rounded transition-all duration-300 
  bg-black text-white 
  hover:scale-105 hover:text-black 
  relative overflow-hidden z-10 group cursor-pointer
">
  <span className="
    absolute inset-0 z-0 transition-all duration-300
    group-hover:bg-gradient-to-r group-hover:from-[#FFA500] group-hover:via-[#FF8C00] group-hover:to-[#FFD700]
    group-hover:shadow-[0_4px_10px_rgba(255,165,0,0.6),0_0_15px_rgba(255,140,0,0.8)]
    rounded
  "></span>
  <span className="relative z-10 font-bold">Select</span>
</button>
      </div>

      {/* Family Plan */}
      <div className="relative bg-red-800 shadow-lg md:rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:z-10">
        <h3 className="text-xl font-semibold mb-4 text-black font-bitcount-grid-double uppercase">
          Family
        </h3>
        <ul className="space-y-2 text-black font-inter mb-6 text-left">
          <li>✔️ Up to 6 family members</li>
          <li>✔️ Unlimited group classes</li>
          <li>✔️ Free kids fitness sessions</li>
          <li>✔️ Weekly wellness workshops</li>
          <li>✔️ Family nutrition planning</li>
          <li>✔️ Discounts on merchandise</li>
        </ul>

<button 
      onClick={handleClick}
      disabled={loading}
className="
  mt-auto w-48 px-6 py-2 rounded transition-all duration-300 
  bg-black text-white 
  hover:scale-105 hover:text-black 
  relative overflow-hidden z-10 group
">
  <span className="
    absolute inset-0 z-0 transition-all duration-300
    group-hover:bg-gradient-to-r group-hover:from-[#FFA500] group-hover:via-[#FF8C00] group-hover:to-[#FFD700]
    group-hover:shadow-[0_4px_10px_rgba(255,165,0,0.6),0_0_15px_rgba(255,140,0,0.8)]
    rounded cursor-pointer
  "></span>
  <span className="relative z-10 font-bold">Select</span>
</button>
      </div>
    </div>
  </div>
</section>
        </section>
        </main>
    )
}