interface FooterProps {
  onWaitlistClick: () => void;
}

export function Footer({ onWaitlistClick }: FooterProps) {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <span className="font-display text-2xl font-bold text-foreground">LD</span>
            <p className="text-sm text-muted-foreground mt-3">Last Drop — Premium herenondergoed met discrete bescherming.</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Over LD</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Ons verhaal</li>
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Materialen</li>
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Duurzaamheid</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Klantenservice</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Contact</li>
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Verzending</li>
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Retourneren</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Juridisch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Privacy</li>
              <li onClick={onWaitlistClick} className="hover:text-foreground cursor-pointer transition-colors">Voorwaarden</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
          © 2026 LD — Last Drop. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
