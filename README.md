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

## Orders → Google Sheet

Orders submitted on the page are POSTed to a Google Apps Script web app that
appends one row per order to a spreadsheet.

### One-time setup

1. Create a new Google Sheet, then **Extensions → Apps Script**.
2. Delete everything in `Code.gs` and paste all of
   [`scripts/orders-apps-script.gs`](scripts/orders-apps-script.gs).
3. Run the **`setupSheet`** function once from the editor. It creates the
   `الطلبات` tab, the header row, the right-to-left layout, the status
   dropdown and its colours. Approve the authorization prompt on first run.
4. **Deploy → New deployment → Web app**, with *Execute as: Me* and
   *Who has access: Anyone*. Copy the `/exec` URL.
5. **Project Settings → Script Properties**, add `ORDERS_SECRET` with a
   password of your choice, then append `?key=<that password>` to the URL.
6. In Vercel, **Settings → Environment Variables**, add
   `VITE_ORDERS_WEBHOOK` with the full URL, for Production and Preview, then
   redeploy.

Open the `/exec` URL in a browser to check the wiring: it answers
`{"ok":true,...}` with the current order count.

### When you edit the script

Redeploy with **Deploy → Manage deployments → ✏️ → Version: New version**.
Choosing *New deployment* instead mints a different URL and silently stops
orders from arriving.

### Behaviour worth knowing

- The phone number and order code are stored as text, so leading zeros survive.
- The same phone and price posted twice within three minutes returns the first
  order code instead of writing a duplicate row.
- Columns `الحالة` and `ملاحظة` are yours to fill in by hand. The script never
  overwrites them.
- If the POST fails, the customer is not shown a false success. They get a
  WhatsApp button prefilled with their full order instead, so the sale is not
  lost.

## Deploy

Deployed on Vercel. Pushes to `main` trigger a production deployment.
