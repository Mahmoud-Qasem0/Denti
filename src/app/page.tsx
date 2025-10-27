import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWork from "@/components/landing/HowItWork";
import PricingSection from "@/components/landing/PricingSection";
import WhatToAsk from "@/components/landing/WhatToAsk";


export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <HowItWork />
    <WhatToAsk />
    <PricingSection />
    <CTA />
    <Footer />
    </>
  );
}
