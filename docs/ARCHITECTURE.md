# DripCloud Architecture

Living document covering system architecture, data flow, and business logic.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│            React SPA (Vite, hosted on Vercel)           │
│                                                         │
│  Marketing Site    Auth Pages     Merchant Dashboard    │
│  /                 /login         /dashboard             │
│                    /signup        /dashboard/products     │
│                                   /dashboard/design      │
└─────────────┬───────────────────────────┬───────────────┘
              │                           │
              │ Supabase JS Client        │ Supabase JS Client
              │ (auth, DB queries)        │ (invoke edge functions)
              │                           │
┌─────────────▼───────────────────────────▼───────────────┐
│                      Supabase                           │
│                                                         │
│  Auth          Postgres DB         Edge Functions        │
│  ─ signup      ─ merchants         ─ printful-catalog   │
│  ─ login       ─ products          ─ printful-products  │
│  ─ magic link  ─ (future tables)   ─ printful-mockups   │
│  ─ sessions                        ─ printful-orders    │
└─────────────────────────────────────────┬───────────────┘
                                          │
                                          │ Printful API
                                          │ (private token, server-side only)
                                          │
                              ┌───────────▼───────────┐
                              │       Printful        │
                              │                       │
                              │  Catalog (blanks)     │
                              │  Sync Products        │
                              │  File Library         │
                              │  Mockup Generator     │
                              │  Orders & Shipping    │
                              └───────────────────────┘
```

## Authentication Flow

1. **Signup:** User fills out name, business name, email, password on `/signup`
2. Frontend calls `supabase.auth.signUp()` with user metadata (`full_name`, `business_name`)
3. Supabase creates user in `auth.users`, sends confirmation email
4. User clicks confirmation link → redirected to `/dashboard`
5. Database trigger `on_auth_user_created` auto-creates a row in `merchants` table
6. **Login:** `supabase.auth.signInWithPassword()` or `signInWithOtp()` (magic link)
7. Auth state managed by `AuthProvider` context, available app-wide via `useAuth()`

## Database Schema

### `merchants` table
Links 1:1 with `auth.users`. Created automatically via trigger on signup.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | Same as `auth.users.id` (FK, cascade delete) |
| `business_name` | `text` NOT NULL | From signup form |
| `contact_name` | `text` NOT NULL | From signup form |
| `contact_email` | `text` NOT NULL | Mirrors auth email |
| `phone` | `text` | Optional |
| `website` | `text` | Optional |
| `storefront_slug` | `text` UNIQUE | URL slug for public storefront |
| `qr_code_url` | `text` | Generated QR code image URL |
| `onboarding_status` | `text` NOT NULL | `pending` / `active` / `suspended` |
| `created_at` | `timestamptz` | Default `now()` |
| `updated_at` | `timestamptz` | Auto-updated via trigger |

**RLS Policies:** Users can only view and update their own merchant row.

### `products` table
Tracks sync products created via Printful, linked to merchants. Migration: `002_create_products.sql`.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` PK | Auto-generated (`gen_random_uuid()`) |
| `merchant_id` | `uuid` FK | References `merchants.id` (cascade delete) |
| `printful_sync_id` | `bigint` | Printful sync product ID |
| `printful_variant_ids` | `jsonb` | Array of Printful variant IDs |
| `title` | `text` NOT NULL | Product display name |
| `description` | `text` | Optional |
| `retail_price` | `numeric` | Price merchant charges customers (default 0) |
| `base_cost` | `numeric` | Printful's cost from API (default 0) |
| `status` | `text` NOT NULL | `draft` / `live` / `in_review` / `archived` (default `draft`) |
| `mockup_urls` | `jsonb` | Array of mockup image URLs |
| `created_at` | `timestamptz` | Default `now()` |
| `updated_at` | `timestamptz` | Auto-updated via trigger |

**RLS Policies:** Merchants can select, insert, update, and delete their own products only.
**Index:** `idx_products_merchant_id` on `merchant_id` for fast lookups.

## Printful Integration

### Multi-Tenant Model
- **Single Printful account** owned by DripCloud
- **Single store** — all merchant products live in one Printful store
- **Tenant isolation** enforced by our database: `products.merchant_id` links each product to its owner
- Merchants never interact with Printful directly — DripCloud is the abstraction layer

### Edge Functions (deployed)
All Printful API calls go through Supabase Edge Functions. The Printful API token is stored as a Supabase secret (`PRINTFUL_API_TOKEN`) and is never exposed to the browser.

#### Shared Helpers (`supabase/functions/_shared/`)
- **`cors.ts`** — Standard CORS headers used by all functions
- **`printful.ts`** — `printfulFetch(path, options)` adds Bearer auth; `printfulRequest<T>(path, options)` adds error handling and returns parsed `result`

#### Function Reference

| Function | Methods | Auth Required | Purpose | Printful Endpoint |
|----------|---------|---------------|---------|-------------------|
| `printful-catalog` | GET | No | Browse blank products, variants, pricing. Supports `?product_id=` and `?category_id=` query params | `GET /products`, `GET /products/{id}` |
| `printful-products` | GET, POST | Yes | GET: list merchant's products from our DB. POST: create sync product on Printful + store in our `products` table | `POST /store/products` |
| `printful-files` | POST | No | Upload design artwork via URL | `POST /files` |
| `printful-mockups` | GET, POST | No | POST: create mockup generation task. GET: check task status via `?task_key=` | `POST /mockup-generator/create-task/{id}`, `GET /mockup-generator/task` |
| `printful-orders` | POST | Yes | Create fulfillment order on Printful | `POST /orders` |

#### Authentication Pattern
Functions that require auth (`printful-products`, `printful-orders`) pass the user's `Authorization` header to a Supabase client to verify identity via `supabase.auth.getUser()`. The authenticated `user.id` is used as `merchant_id` for RLS-scoped DB queries.

### Design New Merch Flow (3 steps)
1. **Select Product** → `printful-catalog` returns available blanks with variants/colors/sizes
2. **Upload Design** → `printful-files` uploads artwork, `printful-mockups` generates previews
3. **Confirm & Publish** → `printful-products` creates sync product, our DB stores merchant linkage + retail price

## Frontend Routing

| Route | Component | Auth Required | Purpose |
|-------|-----------|---------------|---------|
| `/` | `HomePage` | No | Marketing landing page |
| `/login` | `LoginPage` | No | Email/password or magic link login |
| `/signup` | `SignupPage` | No | Account creation with business name |
| `/dashboard` | `DashboardPage` | Yes | Merchant dashboard (placeholder) |

## Navbar Behavior

- **Logged out:** About, Inquire, Log In, Book a Demo
- **Logged in:** About, Inquire, Log Out, Dashboard (purple button)
- Same navbar component (`Navbar`) used on all pages for consistency
