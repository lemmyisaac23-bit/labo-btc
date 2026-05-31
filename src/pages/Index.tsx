import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LandingChatWidget } from "@/components/LandingChatWidget";
import { LandingHeroBanner } from "@/components/home/LandingHeroBanner";
import { VpsLocationsBar } from "@/components/home/VpsLocationsBar";
import { CloudMiningSection } from "@/components/home/CloudMiningSection";
import { HowToStartSection } from "@/components/home/HowToStartSection";
import { MiningInfoSection } from "@/components/home/MiningInfoSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <LandingHeroBanner />
      <VpsLocationsBar />
      <CloudMiningSection />
      <HowToStartSection />
      <MiningInfoSection />
      <ReviewsSection />
      <Footer />
      <LandingChatWidget />
    </div>
  );
};

export default Index;
