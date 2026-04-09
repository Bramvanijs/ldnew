import crossSection from "@/assets/technology-cross-section.jpg";

export function TechnologySection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src={crossSection}
            alt="LD Last Drop beschermingstechnologie - dwarsdoorsnede van de boxer met drie lagen"
            className="w-full aspect-square object-cover"
          />
        </div>
        <div className="lg:pl-8">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Last Drop Technologie
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Het is geen magie. Maar het scheelt niet veel.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Een discreet dubbel-laags beschermingssysteem absorbeert de laatste druppels, terwijl de buitenstof
            droog en comfortabel blijft.
          </p>
          <div className="space-y-6">
            {["Buitenlaag", "Lekbeschermingslaag", "Absorberende laag"].map((label) => (
              <div key={label} className="flex gap-4 items-center">
                <div className="w-1 h-8 bg-accent rounded-full flex-shrink-0" />
                <h4 className="text-sm font-semibold text-foreground">{label}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
