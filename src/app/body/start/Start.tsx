import JoinBtn from "@/app/components/JoinBtn";
import Image from "next/image";
export default function Start(){
return (
    <main>
        <section className="flex flex-col gap-8 lg:mx-auto lg:max-w-[1450px] mt-20">
            <div className="text-[44px] md:text-[70px] text-center sm:text-left font-black sm:px-0 uppercase">
                <h1 className="text-slate-600">Stay Fit,<br/> <span className="text-orange-800">Stay Strong,</span><br /><span className="text-green-800">Stay Healthy!</span></h1>
            </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {[
    '/images/ball-work.png',
    '/images/cross-fit.png',
    '/images/rope-fit.png',
    '/images/muscle.png',
  ].map((src, i) => (
    <div key={i} className="w-full h-auto">
      <Image
        src={src}
        alt={`fitness-img-${i}`}
        width={600}
        height={400}
        className="w-full h-full max-h-[1200px] object-cover md:rounded"
      />
    </div>
  ))}
</div>

            <div className="flex flex-col justify-center items-center mt-20">

                <JoinBtn/>

            </div>

        </section>
    </main>
    );
}