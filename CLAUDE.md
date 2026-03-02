# DripCloud Website

Marketing website for DripCloud — an on-demand custom merchandise platform (no minimums, no inventory). 

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Animation:** Framer Motion
- **Testing:** Vitest + React Testing Library + jsdom
- **Fonts:** Geist (headings), Geist Mono (body)
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

## Engineering Guidelines

- **Follow TDD.** Write or update tests before writing implementation code. Red → Green → Refactor.
- **Keep it simple.** Do not overcomplicate code. Prefer straightforward solutions over clever abstractions.
- **Push back on bad decisions.** If the human proposes something that is a poor engineering choice, say so and explain why.
- **All tests must pass before committing.** Run `npm test` and confirm zero failures before any commit.
- **Always commit and push once tests pass.** Do not leave passing work uncommitted.
- **Use worktrees for subagents.** When spawning Task subagents, use `isolation: "worktree"` so they work on isolated copies of the repo.
