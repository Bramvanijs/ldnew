import { trackColorSelect } from "@/lib/analytics";
import boxerBlueStripe from "@/assets/boxer-blue-stripe.jpg";
import boxerRedStripe from "@/assets/boxer-red-stripe.jpg";
import boxerGreenStripe from "@/assets/boxer-green-stripe.jpg";
import boxerLightBlue from "@/assets/boxer-light-blue.jpg";
import boxerBlack from "@/assets/boxer-black.jpg";

export interface ColorOption {
  id: string;
  name: string;
  image: string;
  swatch: string; // tailwind bg class via inline style
}

export const colorOptions: ColorOption[] = [
  { id: "blue-stripe", name: "Blue Stripe", image: boxerBlueStripe, swatch: "repeating-linear-gradient(90deg, hsl(220 60% 45%) 0px, hsl(220 60% 45%) 3px, white 3px, white 6px)" },
  { id: "red-stripe", name: "Red Stripe", image: boxerRedStripe, swatch: "repeating-linear-gradient(90deg, hsl(348 50% 35%) 0px, hsl(348 50% 35%) 3px, white 3px, white 6px)" },
  { id: "green-stripe", name: "Green Stripe", image: boxerGreenStripe, swatch: "repeating-linear-gradient(90deg, hsl(160 40% 25%) 0px, hsl(160 40% 25%) 3px, white 3px, white 6px)" },
  { id: "light-blue", name: "Light Blue Plain", image: boxerLightBlue, swatch: "hsl(205 50% 65%)" },
  { id: "black", name: "Black Plain", image: boxerBlack, swatch: "hsl(0 0% 10%)" },
];

interface ColorSelectionSectionProps {
  selectedColor: string;
  onColorSelect: (colorId: string) => void;
}

export function ColorSelectionSection({ selectedColor, onColorSelect }: ColorSelectionSectionProps) {
  const selected = colorOptions.find((c) => c.id === selectedColor) || colorOptions[0];

  const handleSelect = (colorId: string) => {
    const color = colorOptions.find((c) => c.id === colorId);
    if (color) {
      trackColorSelect(color.name);
      onColorSelect(colorId);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Collectie
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-16">
          Kies je kleur
        </h2>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={selected.image}
              alt={`LD Boxer – ${selected.name}`}
              className="w-full aspect-square object-cover bg-secondary"
            />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
              LD Boxer — {selected.name}
            </h3>
            <p className="text-xl font-display font-semibold text-foreground mb-8">€29,95</p>
            <div className="flex gap-4 mb-4">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleSelect(color.id)}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
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
            <p className="text-sm text-muted-foreground">{selected.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
