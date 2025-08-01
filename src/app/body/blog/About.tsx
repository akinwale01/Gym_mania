import VideoOverlay from "@/app/components/VideoOverlay"
export default function About(){
return(
    <main>
        <section className="lg:mx-auto lg:max-w-[1450px] flex flex-col space-y-10 bg-[#000000ee] py-24 sm:px-10 text-white font-inter">
            <div className="px-4 sm:px-0 space-y-6">
                <h4 className="text-orange-700 font-extrabold font-inter">
                    About Us
                </h4>

                <p className="uppercase text-[30px] lg:text-[50px] font-inter font-bold text-white">Your <span className="text-[#d44503]">fitness</span> journey starts here</p>

                <div className="max-w-[800px]">
                <p className="font-inconsolata font-bold">At GYM_MANIA, we are dedicated to helping you unlock your full fitness potential. Staying fit and healthy, keeps the doctors away. With highly graded and top-tier equipments, expert trainers and a welcoming community, we provide the perfect environment to push your limits and achieve your goals.</p>
                </div>


            </div>

            <div>
                <VideoOverlay/>
            </div>

        </section>

    </main>
)
}