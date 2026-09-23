# طقم الفنان الصغير — Landing Page

Arabic (Moroccan Darija) RTL landing page for a kids art pack: a 208-piece colouring
case, a "الفنان الصغير" certificate printed with the child's name, a wooden frame and
a colouring booklet. 299 DH, or 549 DH for two (sibling offer). Cash on delivery,
free shipping across Morocco.

The previous car emergency tool page lives in git history (before this commit).

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

The source creatives live in `source-images/kids/` (not committed; unzip
`PACK ENFANTS.zip` there). They have Arabic text baked in, so
`scripts/prepare-images.mjs` crops each asset out of them by pixel rectangle and
writes WebP (plus a 480px variant for `srcset`) to `public/images/` and `public/og.jpg`:

```bash
npm run images
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

- One sheet serves both products. Orders for this pack get `KID-` codes, car orders
  keep `CET-`. The child's name goes to column `O` (`سمية الطفل`), and is also
  appended to the offer text as a safety net.

- The phone number and order code are stored as text, so leading zeros survive.
- The same phone and price posted twice within three minutes returns the first
  order code instead of writing a duplicate row. This relies on the hidden `ts`
  column (N), which stores raw epoch milliseconds. Do not delete it: the visible
  date column is returned by Sheets converted to the script timezone, which made
  every row look hours old and defeated the check.
- Columns `الحالة` and `ملاحظة` are yours to fill in by hand. The script never
  overwrites them.
- If the POST fails, the customer is not shown a false success. They get a
  WhatsApp button prefilled with their full order instead, so the sale is not
  lost.

## Deploy

Deployed on Vercel. Pushes to `main` trigger a production deployment.
