'use client';
import AutoScrollCards from "@/app/components/AutoScrollCArd";
export default function Service(){
return(
    <main>
        <section className="lg:mx-auto lg:max-w-[1450px] flex flex-col space-y-10  py-24 sm:px-10 text-white font-inter">
            <div className="px-4 sm:px-0 space-y-6">
                <h4 className="text-orange-700 font-extrabold font-inter">
                    Services
                </h4>

                <p className="uppercase text-[30px] lg:text-[50px] font-inter font-bold text-black">Training <span className="text-[#d44503]">Programs</span> We offer:</p>

                <div className="max-w-[800px]">
                <p className="font-inconsolata font-bold  text-black">We offer personalized fitness services of different forms to help you reach your goals. From one-on-one training to high-energy classes and recovery sessions, we provide everything you need to succeed in your fitness journey</p>
                </div>


            </div>

            <div>
                <div className="w-full bg-[url('https://cdn.dribbble.com/userupload/44193211/file/original-114d5fae9f0be0424867bae874ee5a1d.gif')] bg-cover bg-center bg-no-repeat aspect-[4/3] sm:aspect-[16/12] lg:aspect-[21/15]"/>
            </div>

            <div>
                <AutoScrollCards/>
            </div>

        </section>

    </main>
)
}