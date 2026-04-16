import { useEffect, useState } from "react";
import { trackPageView, trackBuyButtonClick, trackAddToCartClick } from "@/lib/analytics";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { TechnologySection } from "@/components/TechnologySection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProductCardSection } from "@/components/ProductCardSection";
import { LifestyleBanner } from "@/components/LifestyleBanner";
import { Footer } from "@/components/Footer";
import { WaitlistPopup } from "@/components/WaitlistPopup";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState("blue-stripe");
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    trackPageView();
  }, []);

  const handleBuyClick = () => {
    trackBuyButtonClick();
    setPopupOpen(true);
  };

  const handleCartClick = () => {
    trackAddToCartClick();
    setPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">LD</span>
          <button
            onClick={handleBuyClick}
            className="bg-primary text-primary-foreground px-5 py-2 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Koop nu
          </button>
        </div>
      </nav>

      <HeroSection onBuyClick={handleBuyClick} />
      <BenefitsSection />
      <ProductCardSection
        onBuyClick={handleBuyClick}
        onCartClick={handleCartClick}
        onSelectionChange={(colorId, size) => {
          setSelectedColorId(colorId);
          setSelectedSize(size);
        }}
      />
      <TechnologySection />
      <TestimonialsSection />
      <HowItWorksSection />
      <LifestyleBanner onBuyClick={handleBuyClick} />
      <Footer onWaitlistClick={handleBuyClick} />

      <WaitlistPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        colorId={selectedColorId}
        size={selectedSize}
      />
    </div>
  );
};

export default Index;
