-- Create products table
-- Tracks sync products created via Printful, linked to merchants
create table public.products (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  printful_sync_id bigint,
  printful_variant_ids jsonb default '[]'::jsonb,
  title text not null,
  description text,
  retail_price numeric not null default 0,
  base_cost numeric not null default 0,
  status text not null default 'draft'
    check (status in ('draft', 'live', 'in_review', 'archived')),
  mockup_urls jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at on row change (reuse existing function)
create trigger products_updated_at
  before update on public.products
  for each row
  execute function public.update_updated_at();

-- Enable Row Level Security
alter table public.products enable row level security;

-- Merchants can view their own products
create policy "Merchants can view own products"
  on public.products for select
  using (auth.uid() = merchant_id);

-- Merchants can insert their own products
create policy "Merchants can insert own products"
  on public.products for insert
  with check (auth.uid() = merchant_id);

-- Merchants can update their own products
create policy "Merchants can update own products"
  on public.products for update
  using (auth.uid() = merchant_id);

-- Merchants can delete their own products
create policy "Merchants can delete own products"
  on public.products for delete
  using (auth.uid() = merchant_id);

-- Index for fast lookups by merchant
create index idx_products_merchant_id on public.products(merchant_id);
