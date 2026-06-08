const BannerSection = () => {
  const stats = [
    {
      value: "10,000+",
      label: "Lives Remembered",
    },
    {
      value: "50,000+",
      label: "Memories Shared",
    },
    {
      value: "1,000+",
      label: "Families Supported",
    },
  ];

  return (
    <section className="bg-[#795316]">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3 lg:items-center">
          {/* Stats */}
          <div className="lg:col-span-2">
            <div className="grid gap-8 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={index} className="border-l-2 border-[#DFB97C] pl-6">
                  <h2 className="text-4xl font-bold leading-none text-white sm:text-5xl lg:text-6xl">
                    {stat.value}
                  </h2>
                  <p className="mt-3 text-base text-[#F5F5F5] sm:text-lg">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-1">
            <p className="mb-6 text-base leading-relaxed text-[#F5F5F5] sm:text-lg lg:text-xl">
              A growing space where families share notices, preserve memories,
              and support each other through remembrance.
            </p>

            <button className="group inline-flex items-center gap-2 text-lg font-semibold text-[#DFB97C] transition-all hover:gap-3">
              Explore Memorials
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
