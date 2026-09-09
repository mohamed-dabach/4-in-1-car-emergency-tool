# جهاز الطوارئ 4 فـ1 — Landing Page

Arabic (Moroccan Darija) RTL landing page for a 4-in-1 car emergency tool:
1000A jump starter, 150 PSI air compressor, USB power bank and LED emergency light.
Cash on delivery, free shipping across Morocco.

## Stack

Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · motion · lucide-react

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # tsc --noEmit
npm run build      # production build to dist/
npm run preview    # preview the production build
```

## Content

All copy, specs, reviews and FAQ live in `src/data/product.ts`. Edit that single
file to change prices, wording or add real customer reviews.

## Images

Raw product photos live in `source-images/` (not committed). Regenerate the
optimized WebP assets in `public/images/` with:

```bash
npm run images -- source-images
```

## Order submission

`src/components/OrderForm.tsx` currently simulates the submission and logs the
order payload to the console. The `TODO` in `handleSubmit` marks where to POST
the order to a real backend (Google Sheet webhook, store API or WhatsApp link).

## Deploy

Deployed on Vercel. Pushes to `main` trigger a production deployment.
