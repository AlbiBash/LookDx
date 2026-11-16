# LookDx website

Next.js (App Router, TypeScript) storefront for LookDx HRM kits. Black and white with a deep orange accent (`#F46638`).

Pages: Home, Kits, Kit detail (`/kits/[slug]`), Basket / checkout (`/basket`).

```bash
npm install
npm run dev
```

- Kit data is SAMPLE content in `lib/kits.ts` (modelled on primerdesign.co.uk genotyping kits); replace with verified data.
- Guest basket lives in localStorage with a 30-day expiry (`lib/basket.ts`).
- `lib/orders.ts` is a stub: it validates an order against the catalogue in the browser and returns an order number. DynamoDB storage and SES emails are the next backend phase (needs a server route, e.g. on Amplify).
- Currently deployed as a static export to GitHub Pages (`.github/workflows/pages.yml`, base path `/LookDx`). Long-term hosting target: AWS Amplify.
