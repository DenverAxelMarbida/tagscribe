# TagScribe Production Landing Page — Design Spec
Date: 2026-10-15 | Approach: Fresh Next.js build (Approved) | Reference: tarsi.cloud layout inspiration

## 1. Intent & Success Criteria
- **Outcome:** Production landing page converting Filipino student creators, freelance editors, agencies to free trial → paid.
- **UVP:** First AI captioning fine-tuned for Taglish code-switching + slang, 70% faster workflow, GCash/Maya native checkout.
- **Success:** All 6 sections live, responsive (375/768/1280+), all CTAs/modals/toggles functional, `npm run build` passes, zero placeholder text.

## 2. Architecture
- Next.js 14 App Router + TypeScript, Tailwind CSS, Framer Motion, lucide-react.
- Structure:
  - `app/layout.tsx` (metadata, fonts, SEO) / `app/page.tsx` (composition) / `app/globals.css`
  - `components/Nav.tsx`, `Hero.tsx`, `HeroMockup.tsx`, `SocialProof.tsx`, `Showcase.tsx`, `HowItWorks.tsx`, `Pricing.tsx`, `FAQ.tsx`, `Footer.tsx`, `UploadModal.tsx`, `VideoModal.tsx`
  - `lib/constants.ts` (nav links, metrics, showcase tabs, pricing tiers, faqs)
- No backend/DB. Modals are frontend-only demos. Static-export compatible.

## 3. Page Structure (exact copy)
- **Nav (sticky):** Logo "TagScribe" | Links: Features, How It Works, Pricing, FAQs | Log In (ghost) + Try Free - No Credit Card (primary, GCash/Maya mini-badges).
- **Hero:** H1 "Instant, Accurate Taglish Captions in Seconds." Sub: "Stop wasting hours fixing code-switching subtitles manually. The first AI captioning tool built specifically for Filipino creators, student editors, and video agencies." CTAs: Start Captioning for Free (→ UploadModal), Watch 45s Pitch Video (→ VideoModal). Visual: browser-frame mockup with live-typing Taglish subtitles ("Hello mga lods, gets niyo ba? Charot lang!"), waveform bars, confidence chips.
- **Social Proof bar:** 70% Faster Subtitle Workflow | Fine-Tuned on Tagalog-English Code-Switching | Native GCash & Maya Checkout.
- **Showcase (tabs):** 1) Smart Taglish Detection — slang chips (lods/gets/charot/jowa/keri), before/after correction. 2) Timeline Alignment & Font Presets — waveform + TikTok/Reels font cards. 3) One-Click Export & Rendering — export settings (1080p, SRT/VTT/burn-in), watermark-removal toggle.
- **How It Works:** 3 steps — Upload, AI Taglish transcribe + align, Style + Export.
- **Pricing:** Toggle Monthly/Annual. Free ₱0 (watermarked, 10 mins/mo) | Creator Pro ₱299/mo or ₱3,588/yr (popular, unlimited exports, local font presets, high-speed render) | Agency Team ₱1,299/mo or ₱15,588/yr (multi-seat, priority queue, brand templates). GCash & Maya badge under CTAs.
- **FAQ accordion:** Taglish accuracy, watermark, GCash/Maya, cancel, language support.
- **Footer:** support@tagscribe.ai | Terms, Privacy, Discord Community | © 2026 TagScribe. All rights reserved.

## 4. Design System & Motion
- Dark SaaS: bg #0A0A0B / zinc-950, cards white/5 border white/10, accent violet-500→cyan-400 gradient, text zinc-100/zinc-400.
- Fonts: Inter (UI) + TikTok-style preset previews (bold sans/serif/rounded) rendered via system stacks.
- Framer Motion: fade/slide on inView, tab crossfade (AnimatePresence), modal spring, pricing toggle layout animation. Respect prefers-reduced-motion.
- Icons: lucide-react only. Mobile-first responsive, sticky nav with blur, hamburger on mobile.

## 5. Interactivity & Edge Cases
- State: `billing: monthly|annual`, `activeTab: 0|1|2`, `uploadOpen`, `videoOpen`, `mobileMenu`, `faqOpen`.
- UploadModal: drag-drop zone, file picker, simulated progress → success state with "10 free mins" note. No real upload.
- VideoModal: 16:9 placeholder with play + 00:45 timestamp; swappable to real embed later via constant.
- Pricing math displayed explicitly; annual = 12× monthly (3,588 / 15,588). All buttons wired; Log In → modal or /login placeholder route with coming-soon toast (no dead click).
- Accessibility: focus trap in modals, esc to close, aria-expanded on accordion/tabs.

## 6. Testing & Verification
- `npm run lint && npm run build` must pass.
- Manual matrix: 375px, 768px, 1280px; Chrome + mobile Safari viewport.
- Checklist: nav anchors scroll, both CTAs open correct modal, 3 tabs swap, toggle updates all prices, FAQ expands, footer links present, no lorem/TODO.

## 7. Out of Scope (YAGNI)
- No auth, no payments processing, no real transcription API, no CMS, no i18n. GCash/Maya = badges only.
