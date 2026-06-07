const BannerSection = () => {
  return (
    <div className="bg-[#795316]">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-3 gap-4 text-white">
          <div className="col-span-2">
            <div className="flex justify-between items-center gap-4 mb-8">
              <div className="border-s-2 ps-6">
                <h2 className="text-3xl font-bold mb-4">10,000+</h2>
                <p className="text-lg">Lives Remembered</p>
              </div>
              <div className="border-s-2 ps-6">
                <h2 className="text-3xl font-bold mb-4">50,000+</h2>
                <p className="text-lg">Memories Shared</p>
              </div>
              <div className="border-s-2 ps-6">
                <h2 className="text-3xl font-bold mb-4">1,000+</h2>
                <p className="text-lg">Families Supported</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">2</div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
