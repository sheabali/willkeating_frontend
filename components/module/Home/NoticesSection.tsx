import Image from "next/image";

const NoticesSection = () => {
  return (
    <div>
      {" "}
      <section className="px-6 py-20 sm:px-8 lg:py-14">
        {/* Polaroid Images Section */}
        <div className="relative mt-12 flex h-[350px] items-center justify-center sm:mt-12 sm:h-96">
          {/* Center Image */}
          <div className="relative ">
            <Image
              src="/images/Ellipse_1.png"
              alt="Portrait memory"
              width={281}
              height={322}
              className="h-50 w-[150px] sm:h-[322px] sm:w-[281px] object-cover"
            />
          </div>

          {/* Right Image */}
          <div className="absolute right-2 top-14 -rotate-8 transform  sm:right-135 sm:top-10">
            <Image
              src="/images/Ellipse 2.png"
              alt="Family memory"
              width={280}
              height={270}
              className="h-[140px] w-[140px] sm:h-[270px] sm:w-[280px] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticesSection;
