'use client';

import Hero from './Hero';
import DashboardPreview from './DashboardPreview';
import Features from './Features';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="pt-24">
      <Hero />
      <DashboardPreview />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}