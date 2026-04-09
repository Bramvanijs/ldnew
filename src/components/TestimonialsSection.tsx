import { Star } from "lucide-react";

const testimonials = [
  { name: "Jan, 46", text: "Na het plassen had ik vaak nog een paar druppels. Sinds ik deze boxers draag hoef ik daar niet meer over na te denken." },
  { name: "Peter, 52", text: "Premium kwaliteit en je merkt niets van de bescherming. Precies wat ik zocht." },
  { name: "Marco, 61", text: "Comfortabel, discreet en het ziet er gewoon goed uit. Aanrader." },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-16">
          Wat klanten zeggen
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-border p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed italic">"{t.text}"</p>
              <p className="text-sm font-medium text-muted-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
