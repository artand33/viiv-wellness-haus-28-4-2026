import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import Founders from "@/components/Founders";
import WhyVIIV from "@/components/WhyVIIV";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import InstagramFeed from "@/components/InstagramFeed";
import VIPSignup from "@/components/VIPSignup";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesGrid />
      <HowItWorks />
      <Founders />
      <WhyVIIV />
      <Testimonials />
      <FAQ />
      <InstagramFeed />
      <VIPSignup />
    </>
  );
}
