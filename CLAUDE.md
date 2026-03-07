# DripCloud Website

Marketing website and merchant dashboard for DripCloud — an on-demand custom merchandise platform (no minimums, no inventory).

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Animation:** Framer Motion
- **Testing:** Vitest + React Testing Library + jsdom
- **Auth & Database:** Supabase (auth, Postgres, Edge Functions)
- **Print Fulfillment:** Printful API (single DripCloud account, multi-tenant via our DB)
- **Fonts:** Caprasimo (h1), DM Sans (h2/h3/nav/buttons), Inter (body), Fragment Mono (mono accents)
- **Brand color:** `#6B2D8B` (purple)

## Project Structure

```
src/
  App.tsx              # Root router: marketing + nested dashboard routes
  main.tsx             # Entry point: BrowserRouter + AuthProvider
  lib/
    supabase.ts        # Supabase client init (uses env vars)
    AuthProvider.tsx    # React context: user, session, loading, signOut
  types/
    product.ts         # Product interface matching DB schema
    catalog.ts         # CatalogProduct, CatalogVariant, CatalogColor, WizardState types
  hooks/
    useProducts.ts     # Fetch products via supabase.functions.invoke
    useCatalog.ts      # Fetch catalog products list
    useCatalogProduct.ts # Fetch single product + variants
    useFileUpload.ts   # Upload to Supabase Storage → printful-files
    useMockupGenerator.ts # Create mockup task + poll status
    useCreateProduct.ts # Create sync product via printful-products
  components/          # Shared UI components (Navbar, AuthNavbar, etc.)
  components/__tests__/ # Co-located component tests
  components/dashboard/ # Dashboard shell: DashboardLayout, Sidebar, TopBar, MetricCard, ProductCard, etc.
  components/studio/   # Studio (design flow) shell: StudioLayout, StudioTopBar, StudioProgress, upload/mockup components
  pages/               # Route-level page components (DashboardHomePage, ProductsPage, PlaceholderPage, etc.)
  pages/__tests__/     # Co-located page tests
  pages/studio/        # Design flow wizard: StudioPage, SelectProductStep, DesignStep, ConfirmStep
  test/
    setup.ts           # Vitest setup (jest-dom, supabase mock)
    mocks/supabase.ts  # Supabase mock for tests
    renderWithRouter.tsx # Test helper wrapping MemoryRouter
  assets/              # Static assets (logo.png)
  index.css            # Global styles, Tailwind import, keyframe animations
supabase/
  config.toml          # Supabase CLI config (created by `supabase init`)
  migrations/          # SQL migration files (run via CLI or manually in SQL Editor)
    001_create_merchants.sql
    002_create_products.sql
    003_create_design_files_bucket.sql
  functions/
    _shared/            # Shared helpers (cors.ts, printful.ts)
    printful-catalog/   # Browse Printful catalog
    printful-products/  # CRUD sync products (auth required)
    printful-files/     # Upload design artwork
    printful-mockups/   # Generate/check mockup tasks
    printful-orders/    # Create fulfillment orders (auth required)
docs/
  ARCHITECTURE.md      # System architecture, business logic, data flow
```

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — type-check then build for production
- `npm test` — run all tests once (`vitest run`)
- `npm run test:watch` — run tests in watch mode
- `npm run lint` — run ESLint

## Environment Variables

Stored in `.env.local` (gitignored):

- `VITE_SUPABASE_URL` — Supabase project URL (safe for browser)
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key (safe for browser)
- `PRINTFUL_API_TOKEN` — Printful private API token (**server-side only**, never expose to browser)
- `SUPABASE_ACCESS_TOKEN` — Personal Supabase management token (for CLI: deploy functions, push migrations, manage secrets)

## Supabase CLI

Requires `SUPABASE_ACCESS_TOKEN` env var (or pass via `--token`).

- `npx supabase db push` — push migrations to remote DB
- `npx supabase functions deploy <name>` — deploy an edge function
- `npx supabase secrets set KEY=VALUE` — set a secret for edge functions
- `npx supabase secrets list` — list current secrets

**Note:** `db push` requires a direct Postgres connection. If it fails (network/firewall), run migrations manually in the [Supabase SQL Editor](https://supabase.com/dashboard/project/ojnwtwtewstzzxkkhzum/sql/new).

## Deployment

- **Hosting:** Vercel
- **`main` branch = production.** Only merged PRs land on `main`. Never push directly to `main`.
- **Preview deploys:** Vercel auto-deploys every branch/PR with a unique preview URL for review.

## Git Workflow

**Every feature, fix, or change MUST go through a feature branch + PR. This is mandatory, not optional.**

**One branch per feature.** Each new task or feature gets its own branch — never reuse an existing feature branch for unrelated work.

1. **Create a feature branch** off `main` (e.g. `feat/font-swap`, `fix/navbar-link`).
2. **Do all work on the feature branch.** Commit and push to the feature branch.
3. **Run `npm test`** and confirm all tests pass before pushing.
4. **Push the branch and open a PR** to `main` using `gh pr create`.
5. **Review the Vercel preview URL** from the PR before merging.
6. **Merge to `main`** only after tests pass and the preview looks correct.

**Subagent workflow:** When spawning Task subagents with `isolation: "worktree"`, they must also create feature branches and open PRs — never push to `main`.

## Engineering Guidelines

- **Follow TDD.** Write or update tests before writing implementation code. Red → Green → Refactor.
- **Keep it simple.** Do not overcomplicate code. Prefer straightforward solutions over clever abstractions.
- **Push back on bad decisions.** If the human proposes something that is a poor engineering choice, say so and explain why.
- **All tests must pass before committing.** Run `npm test` and confirm zero failures before any commit.
- **Use worktrees for subagents.** When spawning Task subagents, use `isolation: "worktree"` so they work on isolated copies of the repo.
- **Update documentation.** When making code changes, update CLAUDE.md and docs/ARCHITECTURE.md if the change affects project structure, architecture, or business logic.
