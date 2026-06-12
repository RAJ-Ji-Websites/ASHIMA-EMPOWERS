# Supabase + Vercel Setup for Ashima Empowers

## What caused the error?

If the form says:

```txt
Could not find the table 'public.orders' in the schema cache
```

it means the `orders` table has not been created inside your Supabase project yet, or Vercel is connected to a different Supabase project than the one you are checking.

The website code can send data to Supabase, but Supabase will reject it until the database table exists.

---

## 1. Create the orders table

Open your Supabase project:

```txt
Supabase Dashboard → SQL Editor → New query
```

Paste the full SQL from this file:

```txt
supabase/orders.sql
```

Then click **Run**.

After running it, go to:

```txt
Table Editor → orders
```

You should see the new `orders` table.

---

## 2. Add Vercel Environment Variables

In Vercel:

```txt
Project → Settings → Environment Variables
```

Add:

```env
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_ORDERS_TABLE=orders
ADMIN_PASSWORD=choose-a-strong-password
```

Important:

- Use `SUPABASE_SERVICE_ROLE_KEY` only in Vercel server environment variables.
- Do not put the service role key inside React/frontend code.
- After adding/changing environment variables, redeploy the Vercel project.

---

## 3. Stripe redirect

In Stripe Payment Link settings, set the success/after-payment redirect URL to:

```txt
https://yourdomain.com/thankyoupage
```

If Stripe supports session placeholders for your setup, use:

```txt
https://yourdomain.com/thankyoupage?session_id={CHECKOUT_SESSION_ID}
```

---

## 4. Admin panel

Visit:

```txt
/admin
```

Enter the `ADMIN_PASSWORD` you set in Vercel.

---

## 5. Flow

```txt
Landing Page CTA
→ Stripe Payment Page
→ Payment Success
→ /thankyoupage
→ Customer submits birth details
→ /api/orders saves to Supabase
→ /admin displays order
```

---

## Required columns

The app expects the `orders` table to include:

- id
- full_name
- whatsapp
- email
- birth_date
- birth_time
- birth_place
- gender
- stripe_session_id
- order_status
- created_at
- updated_at

## Order status updates

The admin panel can update `order_status` directly from `/admin`.

Supported statuses:

```txt
new
in_progress
delivered
```

When Ashima changes the dropdown in the admin panel, the app sends a secure `PATCH` request to `/api/orders`, and the Vercel API updates the row in Supabase.

If your table currently has a column named `status` instead of `order_status`, run the latest `supabase/orders.sql` again. It adds `order_status` and migrates old values safely.
