# LookDx website

Next.js (App Router, TypeScript) storefront for LookDx HRM kits. Black and white with a deep orange accent (`#F46638`).

Pages: Home, Kits, Kit detail (`/kits/[slug]`), Basket / checkout (`/basket`).

```bash
npm install
npm run dev
```

- Kit data is SAMPLE content in `lib/kits.ts` (modelled on primerdesign.co.uk genotyping kits); replace with verified data.
- Guest basket lives in localStorage with a 30-day expiry (`lib/basket.ts`).
- `app/api/orders/route.ts` is a stub: it validates against the server catalogue and returns an order number. DynamoDB storage and SES emails are the next backend phase.
- Hosting target: AWS Amplify.
