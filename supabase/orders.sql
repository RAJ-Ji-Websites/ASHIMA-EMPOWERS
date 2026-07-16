-- Ashima Empowers — Orders table setup
-- Run this inside Supabase Dashboard → SQL Editor → New query → Run.
-- This table is required for /thankyoupage form submissions and /admin order dashboard.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  whatsapp text not null,
  email text not null,
  birth_date date not null,
  birth_time time not null,
  birth_place text not null,
  gender text not null check (gender in ('female', 'male', 'other', 'prefer-not-to-say')),
  stripe_session_id text default '',
  order_status text not null default 'new' check (order_status in ('new', 'in_progress', 'delivered')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_email_idx on public.orders (email);
create index if not exists orders_whatsapp_idx on public.orders (whatsapp);
create index if not exists orders_order_status_idx on public.orders (order_status);

-- If you created an older version of this table with a "status" column, run-safe migration:
alter table public.orders add column if not exists order_status text not null default 'new';
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'orders'
      and column_name = 'status'
  ) then
    update public.orders
    set order_status = status
    where order_status = 'new'
      and status is not null
      and status in ('new', 'in_progress', 'delivered');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

-- Recommended security model:
-- Keep RLS enabled. Use SUPABASE_SERVICE_ROLE_KEY in Vercel for /api/orders.
-- The service role bypasses RLS, while the browser never receives that key.
alter table public.orders enable row level security;

-- No public SELECT policy is created intentionally.
-- This prevents visitors from reading customer order details directly.

-- Optional fallback only if you are NOT using service role and want anonymous inserts.
-- The current Vercel API route should use SUPABASE_SERVICE_ROLE_KEY, so normally do not need this.
-- Uncomment ONLY if required:
-- create policy "Allow anonymous order inserts"
-- on public.orders
-- for insert
-- to anon
-- with check (true);
