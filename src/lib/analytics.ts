// Analytics tracking utility for GA4 + Meta Pixel + GTM
// Events fire once per user action to avoid duplicates

interface EventParams {
  product_name?: string;
  price?: number;
  brand?: string;
  selected_color?: string;
  [key: string]: string | number | boolean | undefined;
}

const DEFAULT_PARAMS: EventParams = {
  product_name: "LD Boxer – Blue Stripe",
  price: 29.95,
  brand: "LD",
};

function pushToDataLayer(eventName: string, params: EventParams = {}) {
  const fullParams = { ...DEFAULT_PARAMS, ...params };

  // Google Analytics 4 / Google Tag Manager
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: eventName,
      ...fullParams,
    });
  }

  // Meta Pixel
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", eventName, fullParams);
  }

  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, fullParams);
  }
}

export function trackPageView() {
  pushToDataLayer("page_view");
}

export function trackProductView() {
  pushToDataLayer("product_view");
}

export function trackColorSelect(selectedColor: string) {
  pushToDataLayer("color_select", {
    selected_color: selectedColor,
    product_name: `LD Boxer – ${selectedColor}`,
  });
}

export function trackAddToCartClick() {
  pushToDataLayer("add_to_cart_click");
}

export function trackBuyButtonClick() {
  pushToDataLayer("buy_button_click");
}

export function trackCheckoutModalOpen() {
  pushToDataLayer("checkout_modal_open");
}

export function trackEmailSignup() {
  pushToDataLayer("email_signup");
}

export function trackWaitlistJoined() {
  pushToDataLayer("waitlist_joined");
}
