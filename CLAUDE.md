@AGENTS.md
@DESIGN_SYSTEM_WORKFLOW.md
@AI_WIREFRAME_WORKFLOW.md

# Claude + GRM

Antes de crear o modificar una pantalla, consulta el servidor MCP `grm-storybook`.

1. Usa `docs-list` para descubrir los componentes disponibles.
2. Usa `docs-show` antes de consumir cualquier componente o propiedad.
3. Usa las stories de Playground como referencia visual y funcional canónica.
4. Instala el código desde el Registry `@grm`; no reconstruyas componentes con HTML o CSS paralelo.
5. No asumas propiedades por el nombre del componente. Si una necesidad no está documentada, regístrala como gap.
6. Valida el resultado con las herramientas de prueba de Storybook, lint y typecheck.

Las entregas navegables pueden publicarse como HTML compilado, pero su fuente debe ser React, Tailwind CSS y componentes GRM reales.
