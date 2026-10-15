export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const METRICS = [
  {
    value: "70%",
    label: "Faster Subtitle Workflow",
  },
  {
    value: "Taglish-tuned",
    label: "Fine-Tuned on Tagalog-English Code-Switching",
  },
  {
    value: "GCash & Maya",
    label: "Native GCash & Maya Checkout",
  },
] as const;

export const SHOWCASE_TABS = [
  {
    id: "detection",
    title: "Smart Taglish Detection",
    description:
      "Detects slang like 'lods', 'gets', and 'charot' and corrects code-switched captions automatically.",
  },
  {
    id: "timeline",
    title: "Timeline Alignment & Font Presets",
    description:
      "Word-level timeline alignment with TikTok & Reels styled font presets.",
  },
  {
    id: "export",
    title: "One-Click Export & Rendering",
    description:
      "Export SRT, VTT, or burned-in video with watermark removal in one click.",
  },
] as const;

export type BillingCycle = "monthly" | "annual";

export const PRICING_TIERS = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    annual: 0,
    cta: "Start for Free",
    features: ["Watermarked exports", "10 mins/mo"],
  },
  {
    id: "creator",
    name: "Creator Pro",
    monthly: 299,
    annual: 3588,
    popular: true,
    cta: "Go Creator Pro",
    features: [
      "Unlimited exports",
      "Local font presets",
      "High-speed rendering",
    ],
  },
  {
    id: "agency",
    name: "Agency Team",
    monthly: 1299,
    annual: 15588,
    cta: "Scale with Agency",
    features: [
      "Multi-seat access",
      "Priority render queue",
      "Custom brand templates",
    ],
  },
] as const;

export const FAQS = [
  {
    q: "How accurate is Taglish transcription?",
    a: "TagScribe is fine-tuned on Tagalog-English code-switching, including slang like 'lods', 'gets', and 'charot', so it handles mixed-language speech far better than generic captioning tools.",
  },
  {
    q: "Is the free plan really free?",
    a: "Yes. The Free tier includes 10 minutes per month with watermarked exports. No credit card required — upgrade only when you need unlimited exports.",
  },
  {
    q: "How do GCash and Maya payments work?",
    a: "Checkout accepts GCash and Maya natively alongside cards. Pay monthly at ₱299 / ₱1,299 or annually at ₱3,588 / ₱15,588.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans can be cancelled anytime and annual plans come with a 7-day money-back window. Your exports remain yours.",
  },
  {
    q: "Which languages are supported?",
    a: "Tagalog-English code-switching (Taglish) first, plus straight Tagalog and English. More Philippine languages are on the roadmap.",
  },
] as const;

export const CONTACT_EMAIL = "support@tagscribe.ai";
export const FOOTER_NOTE = "© 2026 TagScribe. All rights reserved.";
