import Start from "./body/start/Start";
import About from "./body/blog/About";
import Service from "./body/blog/Services";
import Navbar from "./components/Navbar";
import Pricing from "./body/blog/Pricing";
import Contact from "./body/blog/Contact";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main>

      <div className="pb-10">

      <section>
        <header>
          <Navbar />
        </header>

      <div className="flex flex-col  relative w-full">

        <div className="bg-[url('/images/fitness.png')] bg-cover bg-center w-full  h-[800px] bg-no-repeat sm:min-h-[1200px] lg:w-full lg:min-h-[1400px] 2xl:min-h-[2000px] brightness-30"/>

        <div className="flex flex-col space-y-4 uppercase absolute left-0 top-1/2 right-0 transform -translate-y-1/2">

          <p className="text-white text-5xl font-bitcount-grid-double text-center lg:text-7xl fade-in-out">Your Fitness Paradise</p>
        </div>
      </div>

      </section>

      <section className="sm:px-10">
        <Start/>
      </section>

      <section className="mt-20" id="blog">
        <About/>
      </section>

      <section className="mt-20" id="services">
        <Service/>
      </section>

      <section className="mt-20" id="pricing">
        <Pricing/>
      </section>

      <section className="mt-20" id="contact">
        <Contact/>
      </section>

      </div>

      <footer>
        <Footer />
      </footer>
    </main>
  );
}
