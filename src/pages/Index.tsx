import { useEffect } from "react";
import { trackPageView, trackBuyButtonClick, trackAddToCartClick, trackEmailSignup, trackWaitlistJoined } from "@/lib/analytics";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { TechnologySection } from "@/components/TechnologySection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProductCardSection } from "@/components/ProductCardSection";
import { LifestyleBanner } from "@/components/LifestyleBanner";
import { Footer } from "@/components/Footer";

declare global {
  interface Window {
    Tally?: { openPopup: (id: string, opts?: Record<string, unknown>) => void };
  }
}

const openTally = () => {
  window.Tally?.openPopup('BzZbl7', { width: 480 });
};

const Index = () => {
  useEffect(() => {
    trackPageView();

    const handleMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data === 'string' && e.data.includes('Tally.FormSubmitted')) {
        trackEmailSignup();
        trackWaitlistJoined();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleBuyClick = () => {
    trackBuyButtonClick();
    openTally();
  };

  const handleCartClick = () => {
    trackAddToCartClick();
    openTally();
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">LDjur</span>
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
      <ProductCardSection onBuyClick={handleBuyClick} onCartClick={handleCartClick} />
      <TechnologySection />
      <TestimonialsSection />
      <HowItWorksSection />
      <LifestyleBanner onBuyClick={handleBuyClick} />
      <Footer onWaitlistClick={handleBuyClick} />
    </div>
  );
};

export default Index;
