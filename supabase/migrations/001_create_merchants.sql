-- Create merchants table
create table public.merchants (
  id uuid primary key references auth.users(id) on delete cascade,
  business_name text not null,
  contact_name text not null,
  contact_email text not null,
  phone text,
  website text,
  storefront_slug text unique,
  qr_code_url text,
  onboarding_status text not null default 'pending'
    check (onboarding_status in ('pending', 'active', 'suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger merchants_updated_at
  before update on public.merchants
  for each row
  execute function public.update_updated_at();

-- Auto-create merchant row when a new user signs up
-- Reads business_name and full_name from auth.users.raw_user_meta_data
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.merchants (id, business_name, contact_name, contact_email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'business_name', ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Enable Row Level Security
alter table public.merchants enable row level security;

-- Merchants can read their own row
create policy "Users can view own merchant profile"
  on public.merchants for select
  using (auth.uid() = id);

-- Merchants can update their own row
create policy "Users can update own merchant profile"
  on public.merchants for update
  using (auth.uid() = id);
