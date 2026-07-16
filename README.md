# Ashima Empowers — Personalized Life Blueprint

Premium React + Vite landing page with Stripe checkout redirect, post-payment Thank You form, Supabase order storage, and password-protected admin panel.

## Pages

- `/` — Main luxury landing page
- `/thankyoupage` — Post-payment thank you + customer detail form
- `/admin` — Password-protected order dashboard
- `/api/orders` — Vercel Serverless Function for Supabase insert/read/update

## Final Customer Flow

```txt
Landing Page CTA
→ Stripe Payment Page
→ Stripe Success Redirect
→ /thankyoupage
→ Customer fills birth details
→ /api/orders saves to Supabase
→ /admin shows order for Ashima
```

## Required Vercel Environment Variables

Add these in **Vercel → Project → Settings → Environment Variables**:

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ORDERS_TABLE=orders
SUPABASE_STATUS_COLUMN=order_status
ADMIN_PASSWORD=choose-a-strong-password
VITE_STRIPE_PAYMENT_LINK=https://buy.stripe.com/your-payment-link
```

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is server-only and is used only by `/api/orders`.
- Do not expose the service role key in frontend code.
- `VITE_STRIPE_PAYMENT_LINK` is public because users must be redirected to it.
- After changing environment variables in Vercel, redeploy.

## Supabase Setup

1. Create a Supabase project.
2. Open **SQL Editor → New query**.
3. Paste and run the SQL from:

```txt
supabase/orders.sql
```

4. Confirm the `orders` table exists in **Table Editor**.

Expected columns:

- `id`
- `full_name`
- `whatsapp`
- `email`
- `birth_date`
- `birth_time`
- `birth_place`
- `gender`
- `stripe_session_id`
- `order_status`
- `created_at`
- `updated_at`

## Stripe Setup

In your Stripe Payment Link settings, set the success redirect URL to:

```txt
https://yourdomain.com/thankyoupage
```

If your Stripe setup supports checkout session placeholders, use:

```txt
https://yourdomain.com/thankyoupage?session_id={CHECKOUT_SESSION_ID}
```

The thank you page will save `session_id` if present.

## Admin Panel

Visit:

```txt
/admin
```

Login with the `ADMIN_PASSWORD` set in Vercel.

Admin features:

- View all submitted paid-customer details
- Search orders
- Filter by status
- Update status: `New`, `In Progress`, `Delivered`
- Export CSV
- Refresh orders

## Local Development

Create a local `.env.local` file using `.env.example` as reference.

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

## GitHub/Vercel Deployment Checklist

Before pushing:

- Confirm `.env.local` is not committed.
- Push project to GitHub.
- Import repo into Vercel.
- Add all required environment variables.
- Run Supabase SQL.
- Configure Stripe success redirect.
- Deploy.
- Test `/`, `/thankyoupage`, `/admin`, and `/api/orders`.

## Important Security Notes

- `/admin` is protected by a simple password checked by the Vercel API route.
- `/thankyoupage` is hidden from robots and should be used as Stripe success page.
- For maximum payment verification later, add Stripe Checkout Session verification with a Stripe secret key.
