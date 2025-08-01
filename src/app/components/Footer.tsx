export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 lg:px-10">
      <section className="w-full px-5 lg:px-10">

        <div className="grid grid-cols-3 gap-6 text-center ">

            <div className="flex flex-col">
                <div className="space-y-2">
                    <div className="bg-[url(/logo/logo-4.jpg)] h-15 w-15 bg-cover bg-center rounded-full ml-5" />
                    <p className="font-black font-bitcount-grid-double text-[20px] logo-text text-left">GYM_MANIA</p>
                </div>

            </div>

                        <div className="mt-4 gap-6 flex flex-col items-center lg:ml-[-150px]">
                <h1 className="font-black text-center">Quick Links</h1>
                <ul className="flex flex-col space-y-2 lg:flex lg:flex-row lg:space-x-4 lg:justify-center">
                    <li><a href="#blog" className="text-sm lg:text-2xl text-center">Blog</a></li>
                    <li><a href="#services" className="text-sm lg:text-2xl text-center">Services</a></li>
                    <li><a href="#pricing" className="text-sm lg:text-2xl text-center">Pricing</a></li>
                    <li><a href="#contact" className="text-sm lg:text-2xl text-center">Contact</a></li>
                </ul>
            </div>

            <div className="mt-4 gap-6 flex flex-col ">
                <h2 className="font-black text-center">Follow Us</h2>
                <div className="flex flex-row gap-2">
                    <div className="bg-[url(/icons/facebook.png)] h-5 w-5 lg:w-10 lg:h-10 bg-cover bg-center rounded-full mx-auto" />
                    <div className="bg-[url(/icons/twitter.png)] h-5 w-5 lg:w-10 lg:h-10 bg-cover bg-center rounded-full mx-auto" />
                    <div className="bg-[url(/icons/instagram.png)] h-5 w-5 lg:w-10 lg:h-10 bg-cover bg-center rounded-full mx-auto" />
                    <div className="bg-[url(/icons/tiktok.png)] h-5 w-5 lg:w-10 lg:h-10 bg-cover bg-center rounded-full mx-auto" />
                </div>
            </div>

        </div>
      </section>
    </footer>
  );
}