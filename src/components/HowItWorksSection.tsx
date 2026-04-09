const steps = [
  { step: "01", title: "Draag", desc: "De boxer ziet eruit en voelt als normaal ondergoed." },
  { step: "02", title: "Bescherm", desc: "Een discrete binnenlaag absorbeert kleine lekkages." },
  { step: "03", title: "Was", desc: "Gewoon in de wasmachine en opnieuw gebruiken." },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Hoe het werkt
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-16">
          Simpel. Discreet. Comfortabel.
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <span className="text-5xl font-display font-bold text-border">{s.step}</span>
              <h3 className="font-display text-xl font-semibold text-foreground mt-4 mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
