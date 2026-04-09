import { Star, Droplets, Leaf, RefreshCw } from "lucide-react";

const benefits = [
  { icon: Star, title: "Modern design", desc: "Ziet eruit als normaal premium ondergoed." },
  { icon: Droplets, title: "Last Drop bescherming", desc: "Absorbeert kleine lekkages discreet." },
  { icon: Leaf, title: "Premium Lyocell", desc: "Zacht, ademend en comfortabel." },
  { icon: RefreshCw, title: "Wasbaar", desc: "Herbruikbaar en duurzaam." },
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-16">
          Waarom LD
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center border border-border rounded-full">
                <b.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
