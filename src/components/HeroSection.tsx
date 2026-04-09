import { Shield } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";

interface HeroSectionProps {
  onBuyClick: () => void;
}

export function HeroSection({ onBuyClick }: HeroSectionProps) {
  return (
    <section className="pt-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[85vh]">
        <div className="flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-0 order-2 lg:order-1">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">LD — Last Drop</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-foreground mb-6">
            Geen stress meer over de laatste druppel.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Premium boxershorts met discrete ingebouwde bescherming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={onBuyClick}
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              Koop nu — €29,95
            </button>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Shield className="w-4 h-4" />
            30 dagen comfortgarantie
          </p>
        </div>
        <div className="bg-secondary order-1 lg:order-2">
          <img
            src={heroImage}
            alt="LD Boxer Blue Stripe - Premium herenondergoed"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
