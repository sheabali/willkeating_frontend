import Image from "next/image";

const NoticesSection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-24 mt-20">
      {/* Decorative background blob */}
      <Image
        src="/images/Ellipse 2.png"
        alt=""
        width={860}
        height={480}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-20 h-[420px] w-[780px] -translate-x-1/2 -translate-y-1/2 object-contain sm:h-[580px] sm:w-[860px]"
      />

      {/* Decorative outline ellipse */}
      <Image
        src="/images/Ellipse_1.png"
        alt=""
        width={820}
        height={460}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[920px] -translate-x-1/2 -translate-y-[55%] object-contain"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Arched photo frame */}
        <div className="relative mb-9">
          <div className="overflow-hidden rounded-t-[140px] rounded-b-md border-10 border-white bg-white shadow-md">
            <Image
              src="/images/Rectangle 10.png"
              alt="A cherished memory"
              width={260}
              height={300}
              className="h-[180px] w-[120px] object-cover sm:w-40"
            />
          </div>
          {/* Frame base / plinth */}
          <div className="absolute -bottom-3 left-1/2 h-3 w-[calc(100%+24px)] -translate-x-1/2 rounded-full bg-white shadow-sm" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-semibold leading-tight text-[#1B2A4A] sm:text-4xl">
          Recently Published Death Notices
          <br />
          and <span className="text-[#7D81DD]">Memorial Announcements</span>
        </h2>

        {/* Subtext */}
        <p className="mt-5 max-w-md text-sm text-gray-500 sm:text-base">
          Browse recently published death notices and funeral arrangements
          shared by families.
        </p>

        {/* CTA Link */}
        <a
          href="/notices"
          className="mt-6 text-base font-semibold text-[#6366F1] underline underline-offset-4 transition-colors hover:text-[#4F52C7]"
        >
          View All Notices
        </a>
      </div>
    </section>
  );
};

export default NoticesSection;
