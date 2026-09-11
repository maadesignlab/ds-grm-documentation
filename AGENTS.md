<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GRM wireframe generation contract

Read `DESIGN_SYSTEM_WORKFLOW.md` before creating or changing UI.

Before using a Design System component, query the `grm_storybook` MCP server: use the documentation tools to discover the component and verify its real properties and examples. Never infer an undocumented property.

For generated screens:

1. Use the public components in `src/components/ui`; never reproduce an existing component with parallel HTML.
2. Preserve the official shadcn/ui primitive, composition, behavior, accessibility and public API.
3. Use Figma only for GRM tokens, geometry, typography and approved compositions.
4. Use Tailwind CSS and semantic variables from `src/styles/tokens.css`. Do not use `!important`, hexadecimal colors or arbitrary visual values.
5. Treat Storybook Playground as the canonical rendered instance. Docs are explanatory and must not be used as an alternate implementation.
6. Apply the brand with `data-theme`: `grm-global`, `reina-madre`, `maria-linda` or `piel-sana`.
7. Use `src/components/ui/*-example.tsx` as composition references, not as primitives.
8. If a required pattern or component is absent, report the gap instead of inventing a substitute.
9. Keep application data, routes, permissions and business logic outside the Design System primitives.
10. Validate generated screens with lint, type checking, interaction tests and browser rendering.
