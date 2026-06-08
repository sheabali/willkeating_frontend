import BannerSection from "@/components/module/Home/Banner";
import FAQ from "@/components/module/Home/FAQ/FAQ";
import HeroSection from "@/components/module/Home/HeroSection";
import HowItWorks from "@/components/module/Home/HowItWorks";
import { MemorialFeatures } from "@/components/module/Home/MemorialFeatures";
import NoticesSection from "@/components/module/Home/NoticesSection";
import Proof from "@/components/module/Home/Proof";
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
      <Proof />
      <FAQ />
    </div>
  );
};

export default page;
