import BannerSection from "@/components/module/Home/Banner";
import HeroSection from "@/components/module/Home/HeroSection";
import HowItWorks from "@/components/module/Home/HowItWorks";
import { MemorialFeatures } from "@/components/module/Home/MemorialFeatures";
import NoticesSection from "@/components/module/Home/NoticesSection";
import { WhyFamiliesSection } from "@/components/module/Home/why-families-section";

const page = () => {
  return (
    <div>
      <HeroSection />
      <BannerSection />
      <NoticesSection />
      <HowItWorks />
      <MemorialFeatures />
      <WhyFamiliesSection />
    </div>
  );
};

export default page;
