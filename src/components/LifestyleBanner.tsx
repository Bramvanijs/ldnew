import lifestyleImage from "@/assets/lifestyle.jpg";

interface LifestyleBannerProps {
  onBuyClick: () => void;
}

export function LifestyleBanner({ onBuyClick }: LifestyleBannerProps) {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <img
        src={lifestyleImage}
        alt="LD lifestyle"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary-foreground mb-6">
            Bescherming tot de laatste druppel.
          </h2>
          <button
            onClick={onBuyClick}
            className="bg-primary-foreground text-primary px-8 py-4 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Bestel nu
          </button>
        </div>
      </div>
    </section>
  );
}
