# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-26
**Stack:** React 19 + TypeScript 6 + Vite 8 + Tailwind CSS 3 + Vitest 4

## OVERVIEW

Client-side Todo SPA. No backend — persistence via localStorage.

## STRUCTURE

```
.
├── src/
│   ├── main.tsx            # React DOM entry
│   ├── App.tsx             # Root component + all state management
│   ├── index.css           # Tailwind directives only
│   ├── components/         # UI components (default exports)
│   │   ├── AddTodo.tsx     # Task input form
│   │   ├── TodoItem.tsx    # Single task row
│   │   └── TodoList.tsx    # List renderer + empty state
│   ├── hooks/
│   │   └── useLocalStorage.ts  # Generic localStorage persistence hook (named export)
│   ├── types/
│   │   └── todo.ts         # Todo interface (named export)
│   └── test/
│       ├── setup.ts        # jest-dom/vitest matchers
│       └── App.test.tsx    # All tests (12 cases, 3 describe blocks)
├── index.html              # Vite SPA entry
├── vite.config.ts
├── vitest.config.ts        # jsdom env, setup file
├── eslint.config.js        # Flat config (ESLint 10)
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json           # Project references → tsconfig.app.json + tsconfig.node.json
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new component | `src/components/` | Default export, Tailwind classes, props interface |
| Add new hook | `src/hooks/` | Named export, generic if reusable |
| Add new type | `src/types/` | Named export, `export interface` |
| State management | `src/App.tsx` | All state in App, passed as props. No context/Redux |
| Persistence | `src/hooks/useLocalStorage.ts` | Generic hook wrapping useState + localStorage |
| Styling | Tailwind utility classes inline in TSX | No separate CSS files beyond `index.css` |
| Tests | `src/test/App.test.tsx` | Single file, add describe blocks per component |
| Build config | `vite.config.ts` | Minimal — only React plugin |
| ESLint rules | `eslint.config.js` | Flat config, ts-eslint + react-hooks + react-refresh |

## CONVENTIONS

- **ESM only** — `"type": "module"` in package.json
- **`import type` enforced** — `verbatimModuleSyntax: true` requires explicit `type` keyword for type-only imports
- **Default exports for components**, named exports for hooks and types
- **No barrel files** — import by full relative path (e.g., `"./components/AddTodo"`)
- **Props interfaces** defined inline above each component (not in separate files)
- **UI text is Japanese** — placeholder text, button labels, aria-labels all in Japanese
- **`crypto.randomUUID()`** for IDs — requires polyfill in jsdom tests
- **Strict TS linting** — `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, `noFallthroughCasesInSwitch` all enabled
- **No Prettier** — no formatter configured

## ANTI-PATTERNS (THIS PROJECT)

- No CI/CD (by design)
- No git repo initialized
- `vitest.config.ts` duplicates `plugins: [react()]` from `vite.config.ts` instead of sharing
- Stock Vite README — not updated for this app

## COMMANDS

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build → dist/
npm run test       # vitest run (jsdom)
npm run lint       # eslint .
```

## NOTES

- Not a git repo. `.gitignore` exists but no `.git/`
- No `vite-env.d.ts` — type reference handled via `tsconfig.app.json` `"types": ["vite/client"]`
- `tsc -b` (project references build mode) used instead of `tsc --noEmit`
- Test file has inline `crypto.randomUUID` polyfill for jsdom compatibility
