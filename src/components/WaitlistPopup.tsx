import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { colorOptions } from "@/components/ColorSelectionSection";
import { trackEmailSignup, trackWaitlistJoined } from "@/lib/analytics";

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
  colorId: string;
  size: string;
}

const maatLabels: Record<string, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
  XXL: "Extra Extra Large",
};

export function WaitlistPopup({ isOpen, onClose, colorId, size }: WaitlistPopupProps) {
  const [intent, setIntent] = useState<"ja" | "misschien" | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const color = colorOptions.find((c) => c.id === colorId) ?? colorOptions[0];

  // Reset state when popup opens
  useEffect(() => {
    if (isOpen) {
      setIntent(null);
      setEmail("");
      setSubmitted(false);
      setError("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Vul een geldig e-mailadres in.");
      emailRef.current?.focus();
      return;
    }
    setError("");

    // Submit to Tally via hidden fields mechanism.
    fetch("https://formspree.io/f/mwvalpev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        color: color.name,
        size,
        intent: intent ?? "niet aangegeven",
      }),
    }).catch(() => {});

    trackEmailSignup();
    trackWaitlistJoined();
    setSubmitted(true);
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          border: "0.5px solid #d4d8e2",
          borderRadius: "3px",
          width: "100%",
          maxWidth: "440px",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Wachtlijst inschrijving"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Sluit popup"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px",
          }}
        >
          <X size={14} />
        </button>

        {/* Left panel — navy */}
        <div
          style={{
            background: "hsl(220, 60%, 20%)",
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
              Jouw keuze
            </div>
          </div>

          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
            Nog even geduld. We zijn er bijna.
          </div>

          {/* Color */}
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.12)", paddingTop: "10px" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
              Kleur
            </div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: "7px" }}>
              <span
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: "0.5px solid rgba(255,255,255,0.25)",
                  flexShrink: 0,
                  background: color.swatch,
                }}
              />
              {color.name}
            </div>
          </div>

          {/* Size */}
          <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.12)", paddingTop: "10px" }}>
            <div style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
              Maat
            </div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: "7px" }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "0.5px solid rgba(255,255,255,0.2)",
                  borderRadius: "2px",
                  width: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {size}
              </span>
              {maatLabels[size] ?? size}
            </div>
          </div>

          {/* Quoted question */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "0.5px solid rgba(255,255,255,0.15)",
              borderRadius: "2px",
              padding: "10px 12px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            "Had je deze boxer daadwerkelijk gekocht?"
          </div>
        </div>

        {/* Right panel — white */}
        <div
          style={{
            padding: "1.5rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            background: "#fff",
          }}
        >
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: "0.5rem" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 600, color: "hsl(220, 20%, 12%)", lineHeight: 1.3 }}>
                Bedankt!
              </div>
              <p style={{ fontSize: "11.5px", color: "hsl(220, 10%, 45%)", lineHeight: 1.6 }}>
                We sturen je een kortingscode zodra LD live is.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 600, color: "hsl(220, 20%, 12%)", lineHeight: 1.3 }}>
                  Laat je interesse weten.
                </div>
                <div style={{ fontSize: "11.5px", color: "hsl(220, 10%, 45%)", lineHeight: 1.6, marginTop: "4px" }}>
                  LD is nog in ontwikkeling. Laat je e-mail achter en ontvang een korting bij launch.
                </div>
              </div>

              {/* Intent question */}
              <div>
                <p style={{ fontSize: "11px", color: "hsl(220,10%,50%)", marginBottom: "7px", lineHeight: 1.5 }}>
                  Had je hem gekocht als hij beschikbaar was?
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => setIntent("ja")}
                    style={{
                      background: intent === "ja" ? "hsl(220, 60%, 20%)" : "transparent",
                      color: intent === "ja" ? "#fff" : "hsl(220, 10%, 45%)",
                      border: intent === "ja" ? "none" : "0.5px solid #d4d8e2",
                      borderRadius: "2px",
                      padding: "9px 8px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s",
                    }}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent("misschien")}
                    style={{
                      background: intent === "misschien" ? "hsl(220, 60%, 20%)" : "transparent",
                      color: intent === "misschien" ? "#fff" : "hsl(220, 10%, 45%)",
                      border: intent === "misschien" ? "none" : "0.5px solid #d4d8e2",
                      borderRadius: "2px",
                      padding: "9px 8px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s",
                    }}
                  >
                    Misschien
                  </button>
                </div>
              </div>

              <hr style={{ border: "none", borderTop: "0.5px solid #e8eaf0" }} />

              {/* Email */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(220, 10%, 55%)", marginBottom: "5px" }}>
                  E-mailadres
                </div>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="jouw@email.nl"
                  required
                  style={{
                    width: "100%",
                    border: error ? "0.5px solid hsl(0,60%,50%)" : "0.5px solid #ccc",
                    borderRadius: "2px",
                    padding: "9px 11px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    marginBottom: error ? "4px" : "7px",
                    background: "#fff",
                    color: "hsl(220, 20%, 10%)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {error && (
                  <p style={{ fontSize: "10px", color: "hsl(0,60%,50%)", marginBottom: "7px" }}>{error}</p>
                )}
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "hsl(220, 60%, 20%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "2px",
                    padding: "10px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                >
                  Schrijf me in →
                </button>
              </div>

              <p style={{ fontSize: "10px", color: "hsl(220, 10%, 60%)", textAlign: "center", marginTop: "-4px" }}>
                Discreet · Geen spam · Early access korting
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
