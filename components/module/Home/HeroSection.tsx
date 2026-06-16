import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="px-6 py-20 sm:px-8 lg:py-14">
        <div className="mx-auto max-w-[800] text-center">
          <h1 className="font-(family-name:--font-lora) text-4xl font-normal leading-tight tracking-tight text-[#052858] sm:text-5xl lg:text-[64px]">
            <span className="text-balance">
              A Meaningful Place to Remember and Celebrate Life
            </span>
          </h1>

          <p className="font-(family-name:--DM Sans) mt-8 text-[20px] leading-relaxed text-[#5B5C57] sm:text-[20px]">
            Share obituary notices, funeral arrangements, and create lasting
            memorial pages where family and friends can honor, remember, and
            celebrate a loved one&apos;s life together.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button className="bg-primary text-[20px] py-6 px-6 text-white hover:bg-primary/90">
              Create a Death Notice
            </Button>
            <Button className="border-2 text-[20px] border-primary bg-[#F8FAFC] py-6 px-6 text-primary hover:bg-[#f4faff] ">
              Browse Memorials
            </Button>
          </div>
        </div>

        {/* Polaroid Images Section */}
        <div className="relative mt-12 flex h-[350px] items-center justify-center sm:mt-12 sm:h-96">
          {/* Left Image */}
          <div className="absolute left-2 top-16 z-20 -rotate-6 transform sm:left-175 sm:top-20">
            <Image
              src="/images/memorial-1.png"
              alt="Family memory"
              width={230}
              height={263}
              className="h-[180px] w-40 sm:h-[263px] sm:w-[230px] object-contain"
            />
          </div>

          {/* Center Image */}
          <div className="relative z-10">
            <Image
              src="/images/memorial-2.png"
              alt="Portrait memory"
              width={281}
              height={322}
              className="h-50 w-[150px] sm:h-[322px] sm:w-[281px] object-cover"
            />
          </div>

          {/* Right Image */}
          <div className="absolute right-2 top-14 z-20 -rotate-8 transform  sm:right-165 sm:top-10">
            <Image
              src="/images/memorial-3.png"
              alt="Family memory"
              width={280}
              height={270}
              className="h-[140px] w-[140px] sm:h-[270px] sm:w-[280px] object-cover"
            />
          </div>

          {/* Graphic Element */}
          <div className="absolute right-4 top-12 z-20 sm:right-173 sm:top-8">
            <Image
              src="/images/Graphic_Elements.png"
              alt="Graphic Element"
              width={110}
              height={110}
              className="h-10 w-[70px] sm:h-[60px] sm:w-[110px] object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
