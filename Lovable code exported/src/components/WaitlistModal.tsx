import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { trackCheckoutModalOpen, trackEmailSignup, trackWaitlistJoined } from "@/lib/analytics";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      trackCheckoutModalOpen();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      trackEmailSignup();
      await fetch("https://tally.so/r/BzZbl7", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email: email.trim() }),
      });
      setSubmitted(true);
      trackWaitlistJoined();
    }
  };

  const handleClose = (val: boolean) => {
    onOpenChange(val);
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-semibold text-foreground">
                Bedankt voor je interesse.
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed mt-2">
                LD is momenteel in productontwikkeling. Laat je e-mailadres achter en krijg als eerste
                toegang tot de lancering en early access pricing.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="email"
                required
                placeholder="Je e-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-input bg-background text-foreground px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
              >
                Schrijf me in voor de wachtlijst
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
              Je staat op de lijst! 🎉
            </h3>
            <p className="text-sm text-muted-foreground">
              We houden je op de hoogte zodra LD beschikbaar is.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
