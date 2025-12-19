"use client";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import WorkflowSection from "../components/WorkflowSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <StatsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
