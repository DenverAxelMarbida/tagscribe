# TagScribe Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build production TagScribe landing page with 6 Tarsi-inspired sections, native Figma mockups, working CTAs/modals/pricing.

**Architecture:** Fresh Next.js 14 App Router static page composition; `app/page.tsx` composes 9 section components; `lib/constants.ts` single source of truth for copy/pricing; client components only where state/motion needed.

**Tech Stack:** Next.js 14 + TypeScript, Tailwind CSS, Framer Motion, lucide-react

**Spec:** `docs/superpowers/specs/2026-10-15-tagscribe-landing-design.md`

## Global Constraints
- Copy must match spec verbatim: H1 "Instant, Accurate Taglish Captions in Seconds.", footer "© 2026 TagScribe. All rights reserved.", email `support@tagscribe.ai`.
- Pricing exact: Free ₱0 / Creator Pro ₱299/mo or ₱3,588/yr / Agency ₱1,299/mo or ₱15,588/yr; GCash & Maya badge under CTAs.
- Dark theme bg #0A0A0B, violet-500→cyan-400 accent, no emojis, lucide-react icons only.
- Mobile-first responsive 375/768/1280; `npm run lint && npm run build` must pass.
- No backend, no real upload/transcription; modals are frontend demos.

## Review Focus
- Mobile 375px nav hamburger opens/closes, anchors scroll — expect no overflow-x.
- UploadModal drag-drop + Esc closes + focus returns — expect no dead click.
- Pricing toggle flips all 3 cards instantly — expect 3,588 / 15,588 annual values.
- Long Taglish strings ("Hello mga lods, gets niyo ba? Charot lang!") wrap in mockup — expect no layout break.
- prefers-reduced-motion disables Framer Motion transforms — expect static render.

---

### Task 1: Scaffold + Layout + Constants

**Files:**
- Create: `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/constants.ts`, `tailwind.config.ts`
- Test: `npm run build` (verification only)

**Interfaces:**
- Consumes: none
- Produces: `lib/constants.ts` exports `NAV_LINKS, METRICS, SHOWCASE_TABS, PRICING_TIERS, FAQS`; `app/layout.tsx` exports default RootLayout

- [ ] **Step 1: Scaffold Next.js app with Tailwind + deps**
  Run `npx create-next-app@latest . --typescript --tailwind --app --no-src --import-alias "@/*"` in empty dir (skip if files exist), then `npm i framer-motion lucide-react`. Expected: package.json contains next@14, framer-motion, lucide-react.
- [ ] **Step 2: Write `lib/constants.ts` with exact spec values**
  Export NAV_LINKS (Features, How It Works, Pricing, FAQs + hrefs #features #how-it-works #pricing #faqs), METRICS (3 strings), SHOWCASE_TABS (3 titles/descs), PRICING_TIERS (free/creator/agency with monthly/annual numbers), FAQS (5 Q&A). Expected: file compiles, no TODO.
- [ ] **Step 3: Write `app/layout.tsx` + `globals.css`**
  RootLayout with metadata title "TagScribe — Instant Taglish Captions", Inter font, dark bg #0A0A0B. Expected: `npm run lint` passes.
- [ ] **Step 4: Verify scaffold builds**
  Run: `npm run build`
  Expected: PASS (`.next` output, no type errors).
- [ ] **Step 5: Commit**
  ```bash
  git add package.json app/ lib/ tailwind.config.ts
  git commit -m "feat: scaffold Next.js TagScribe landing base"
  ```

### Task 2: Nav + Hero + SocialProof

**Files:**
- Create: `components/Nav.tsx`, `components/Hero.tsx`, `components/HeroMockup.tsx`, `components/SocialProof.tsx`
- Modify: `app/page.tsx` (compose these)
- Test: manual + `npm run build`

**Interfaces:**
- Consumes: NAV_LINKS, METRICS from Task 1; props `onUpload: () => void, onVideo: () => void` for Hero
- Produces: `<Nav onLogin/onTrial>`, `<Hero />`, `<HeroMockup />`, `<SocialProof />`

- [ ] **Step 1: Implement `Nav.tsx` (sticky, blur, mobile menu)**
  Signature: `export default function Nav({onTrial}: {onTrial: () => void})`. Includes logo "TagScribe", 4 anchors, Log In ghost + Try Free primary with "GCash • Maya" micro-badge, hamburger <768px. Test: click hamburger toggles menu; anchors href match NAV_LINKS.
- [ ] **Step 2: Implement `HeroMockup.tsx` (browser frame + typing effect)**
  Signature: `export default function HeroMockup()`. Browser dots, URL bar tagscribe.ai, video area with Taglish subtitle "Hello mga lods, gets niyo ba? Charot lang!", waveform bars (CSS), confidence chips 98%/97%. Use framer-motion typing loop. Test: renders subtitle string verbatim, no overflow at 375px.
- [ ] **Step 3: Implement `Hero.tsx` + `SocialProof.tsx`**
  Hero: H1/Sub/CTAs exact copy; Primary onClick=onUpload, Secondary onClick=onVideo. SocialProof: 3 metrics from METRICS in bordered strip. Test: `npm run build` passes; H1 text matches spec.
- [ ] **Step 4: Wire into `app/page.tsx`, verify**
  Run: `npm run build`
  Expected: PASS, hero renders above fold.
- [ ] **Step 5: Commit**
  ```bash
  git add components/Nav.tsx components/Hero.tsx components/HeroMockup.tsx components/SocialProof.tsx app/page.tsx
  git commit -m "feat: add nav hero social-proof"
  ```

### Task 3: Showcase Tabs + How It Works

**Files:**
- Create: `components/Showcase.tsx`, `components/HowItWorks.tsx`
- Modify: `app/page.tsx`
- Test: `npm run build` + tab interaction

**Interfaces:**
- Consumes: SHOWCASE_TABS from lib/constants
- Produces: `<Showcase />` (internal activeTab state), `<HowItWorks />`

- [ ] **Step 1: Implement `Showcase.tsx` with 3 mockups**
  Signature: `export default function Showcase()`. Tabs: Smart Taglish Detection (slang chips lods/gets/charot/jowa/keri + before/after), Timeline Alignment & Font Presets (waveform + 3 font cards TikTok/Reels/Bold), One-Click Export (1080p/SRT/VTT/burn-in + watermark toggle). AnimatePresence crossfade. Test: clicking each tab swaps content; all slang strings present.
- [ ] **Step 2: Implement `HowItWorks.tsx` (3 steps)**
  Steps: Upload → AI Taglish transcribe + align → Style + Export with lucide icons Upload/Captions/Download. Test: renders 3 steps.
- [ ] **Step 3: Verify**
  Run: `npm run build`
  Expected: PASS.
- [ ] **Step 4: Commit**
  ```bash
  git add components/Showcase.tsx components/HowItWorks.tsx app/page.tsx
  git commit -m "feat: add showcase tabs and how-it-works"
  ```

### Task 4: Pricing + FAQ + Footer + Modals

**Files:**
- Create: `components/Pricing.tsx`, `components/FAQ.tsx`, `components/Footer.tsx`, `components/UploadModal.tsx`, `components/VideoModal.tsx`
- Modify: `app/page.tsx` (add state for modals/billing lives in Pricing internally; page holds modal state)
- Test: `npm run build` + interaction checks

**Interfaces:**
- Consumes: PRICING_TIERS, FAQS; UploadModal props `{open, onClose}`, VideoModal `{open, onClose}`
- Produces: `<Pricing />`, `<FAQ />`, `<Footer />`, modals

- [ ] **Step 1: Implement `Pricing.tsx` with Monthly/Annual toggle**
  Toggle state `billing: monthly|annual`; cards show ₱0 / ₱299↔₱3,588 / ₱1,299↔₱15,588; Creator Pro highlighted "Most Popular"; GCash & Maya badge under each CTA. Test: toggle flips Creator to ₱3,588 and Agency to ₱15,588.
- [ ] **Step 2: Implement `FAQ.tsx` + `Footer.tsx`**
  FAQ accordion (aria-expanded, 5 items); Footer with support@tagscribe.ai mailto, Terms/Privacy/Discord links, "© 2026 TagScribe. All rights reserved.". Test: FAQ expands; footer copy verbatim.
- [ ] **Step 3: Implement `UploadModal.tsx` + `VideoModal.tsx`**
  UploadModal: drag-drop zone + file input + simulated progress → success "10 free mins" note; Esc/overlay closes. VideoModal: 16:9 placeholder, 00:45 badge, play button. Test: open/close via Esc, no console error.
- [ ] **Step 4: Wire modals in `app/page.tsx`, verify**
  Run: `npm run build`
  Expected: PASS; all CTAs open correct modal.
- [ ] **Step 5: Commit**
  ```bash
  git add components/Pricing.tsx components/FAQ.tsx components/Footer.tsx components/UploadModal.tsx components/VideoModal.tsx app/page.tsx
  git commit -m "feat: add pricing faq footer modals"
  ```

### Task 5: Polish + Responsive + Final Build

**Files:**
- Modify: `app/globals.css`, all components (motion, a11y polish)
- Test: `npm run lint && npm run build`

**Interfaces:**
- Consumes: all prior components
- Produces: production-ready page

- [ ] **Step 1: Add scroll reveals + reduced-motion + smooth scroll**
  Add framer-motion whileInView fade/slide to sections, `prefers-reduced-motion` guard, `scroll-behavior: smooth`, focus-visible styles. Test: keyboard tab visible; no motion errors.
- [ ] **Step 2: Responsive sweep 375/768/1280**
  Verify no overflow-x, hamburger <768, pricing stacks → 3-col, showcase tabs scroll. Fix with Tailwind `md:`/`lg:` classes. Test: Chrome device toolbar check.
- [ ] **Step 3: Placeholder scan + final build**
  Run: `rg -i "lorem|TODO|TBD|placeholder" --glob '!*.pdf' .` Expected: no hits in app/components/lib. Then `npm run lint && npm run build` Expected: PASS.
- [ ] **Step 4: Commit**
  ```bash
  git add -A
  git commit -m "feat: polish responsive motion and final build"
  ```
