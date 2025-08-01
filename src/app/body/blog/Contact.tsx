export default function Contact() {
  return (
    <main>
    <section className="lg:mx-auto lg:max-w-[1450px] flex flex-col space-y-10  py-24 sm:px-10 text-white font-inter" id="contact">
        <div className="px-4 sm:px-0 space-y-6">
             <h1 className="text-orange-700 font-extrabold font-inter">Our Location:</h1>

             <p className="uppercase text-[30px] lg:text-[50px] font-inter font-bold text-black">We have our <span className="text-[#d44503]">centers around</span> the world</p>

             <p className="text-black font-bold">In over <span className="text-[#d44503]">23+</span> countries, we have centers that would help you achieve your aim and goals. Finding a gym near you is easy. Explore our map and join our fitness community today</p>
      </div>

        <div className="h-[400px] lg:h-[800px] w-full bg-[url('/images/location.png')] bg-cover bg-center" />

    </section>
    </main>
  );
}