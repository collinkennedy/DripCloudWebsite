# DripCloud Website

Marketing website for DripCloud — an on-demand custom merchandise platform (no minimums, no inventory). 

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Animation:** Framer Motion
- **Testing:** Vitest + React Testing Library + jsdom
- **Fonts:** Caprasimo (h1), DM Sans (h2/h3/nav/buttons), Inter (body), Fragment Mono (mono accents)
- **Brand color:** `#6B2D8B` (purple)

## Project Structure

```
src/
  App.tsx              # Root layout: Navbar → Hero → HowItWorks → WhyDripCloud → Footer
  components/          # Page sections (one component per section)
  components/__tests__/ # Co-located test files
  assets/              # Static assets (logo.png)
  index.css            # Global styles, Tailwind import, keyframe animations
```

## Commands

- `npm run dev` — start Vite dev server (http://localhost:5173)
- `npm run build` — type-check then build for production
- `npm test` — run all tests once (`vitest run`)
- `npm run test:watch` — run tests in watch mode
- `npm run lint` — run ESLint

## Deployment

- **Hosting:** Vercel
- **`main` branch = production.** Only merged PRs land on `main`. Never push directly to `main`.
- **Preview deploys:** Vercel auto-deploys every branch/PR with a unique preview URL for review.

## Git Workflow

**Every feature, fix, or change MUST go through a feature branch + PR. This is mandatory, not optional.**

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
