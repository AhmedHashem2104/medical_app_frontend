# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

## Architecture

React 19 + TypeScript + Vite SPA. Entry point is `src/main.tsx` → `src/App.tsx`.

**Key tooling:**
- **React Compiler** is enabled via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` — automatic memoization, so avoid manual `useMemo`/`useCallback` unless benchmarked
- **Vite** with `@vitejs/plugin-react` using Oxc for JSX transforms
- TypeScript strict mode with `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`, and `erasableSyntaxOnly`
- TypeScript uses split configs: `tsconfig.app.json` (browser/React code) and `tsconfig.node.json` (build tools)

**ESLint** uses flat config (ESLint 9+). Type-aware linting rules can be enabled in `eslint.config.js` for stricter production checks — consider enabling these as the codebase grows.

**CSS** uses custom properties defined in `src/index.css` with light/dark mode via `prefers-color-scheme`. Extend these variables for theming rather than hardcoding colors. `public/icons.svg` is an SVG sprite sheet used for UI icons.

## Notes

- This is a medical app — follow HIPAA-relevant practices for any patient data handling (avoid logging PII, treat API responses with patient data carefully)
- No routing, state management, or API layer exists yet — add these incrementally as features require them
