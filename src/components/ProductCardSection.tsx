import { useEffect, useRef, useState, useCallback } from "react";
import { Shield, ChevronRight } from "lucide-react";
import { trackProductView, trackAddToCartClick, trackBuyButtonClick, trackColorSelect } from "@/lib/analytics";
import { colorOptions, type ColorOption } from "@/components/ColorSelectionSection";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";

interface ProductCardSectionProps {
  onBuyClick: () => void;
  onCartClick: () => void;
}

const sizes = ["S", "M", "L", "XL"] as const;

export function ProductCardSection({ onBuyClick, onCartClick }: ProductCardSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedColor, setSelectedColor] = useState("blue-stripe");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const isMobile = useIsMobile();

  const [emblaRef, emblaApi] = useEmblaCarousel({ active: isMobile });

  const selected = colorOptions.find((c) => c.id === selectedColor) || colorOptions[0];

  // Sync carousel slide → color state
  const onSelect = useCallback(() => {
    if (!emblaApi || !isMobile) return;
    const idx = emblaApi.selectedScrollSnap();
    const color = colorOptions[idx];
    if (color && color.id !== selectedColor) {
      trackColorSelect(color.name);
      setSelectedColor(color.id);
    }
  }, [emblaApi, isMobile, selectedColor]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Sync color state → carousel slide
  useEffect(() => {
    if (!emblaApi || !isMobile) return;
    const idx = colorOptions.findIndex((c) => c.id === selectedColor);
    if (idx >= 0 && emblaApi.selectedScrollSnap() !== idx) {
      emblaApi.scrollTo(idx);
    }
  }, [selectedColor, emblaApi, isMobile]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackProductView();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleBuy = () => {
    trackBuyButtonClick();
    onBuyClick();
  };

  const handleCart = () => {
    trackAddToCartClick();
    onCartClick();
  };

  const handleColorSelect = (color: ColorOption) => {
    trackColorSelect(color.name);
    setSelectedColor(color.id);
  };

  return (
    <section ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          {isMobile ? (
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {colorOptions.map((color) => (
                  <div key={color.id} className="min-w-0 shrink-0 grow-0 basis-full">
                    <img
                      src={color.image}
                      alt={`LD Boxer – ${color.name}`}
                      className="w-full aspect-square object-contain bg-background"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <img
              src={selected.image}
              alt={`LD Boxer – ${selected.name}`}
              className="w-full aspect-square object-contain bg-background"
            />
          )}
        </div>
        <div className="lg:pt-8">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">LD Boxer</p>
          <h2 className="font-display text-3xl font-semibold text-foreground mb-2">{selected.name}</h2>
          <p className="text-2xl font-display font-semibold text-foreground mb-6">€29,95</p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Premium herenboxer met discrete ingebouwde bescherming. Gemaakt van zacht Lyocell voor maximaal comfort.
          </p>

          {/* Color selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Kleur — {selected.name}</p>
            <div className="flex gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color.id
                      ? "border-foreground scale-110"
                      : "border-border hover:border-muted-foreground"
                  }`}
                  style={{ background: color.swatch }}
                  title={color.name}
                  aria-label={`Selecteer ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="mb-8">
            <p className="text-sm font-medium text-foreground mb-3">Maat</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
              <button
                  key={size}
                  data-size={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "Premium Lyocell materiaal",
              "Discrete Last Drop bescherming",
              "Ademend en geurwerend",
              "Wasbaar en herbruikbaar",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                <ChevronRight className="w-4 h-4 text-accent flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBuy}
              className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity flex-1"
            >
              Koop nu
            </button>
            <button
              onClick={handleCart}
              className="border border-primary text-primary px-8 py-4 text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors flex-1"
            >
              In winkelwagen
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
            <Shield className="w-3 h-3" /> 30 dagen comfortgarantie · Gratis verzending
          </p>
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            {[
              { icon: "✓", text: "Discreet geleverd via de brievenbus" },
              { icon: "✓", text: "Geen zichtbare afzender" },
              { icon: "✓", text: "Gratis verzending vanaf €40" },
            ].map((item) => (
              <p key={item.text} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-accent font-medium">{item.icon}</span>
                {item.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
