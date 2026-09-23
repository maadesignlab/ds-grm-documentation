# Sincronización Figma → código · 23 septiembre 2026

Se incorporaron 32 variables modificadas de las 768 leídas en Figma. Sin variables añadidas ni eliminadas. Se regeneraron CSS, valores semánticos, etiquetas de cambios de Storybook y distribución del registry.

- GRM Global: estados y gradiente de dos paradas aprobados.
- Reina Madre: success/error/info. Primary y gradiente conservan sus valores originales.
- María Linda: primary, estados y gradiente de dos paradas aprobados.
- Piel Sana: success/error/info. Primary naranja y gradiente conservados.
- Todos los tonos 500 permanecen intactos respecto al snapshot anterior.

El navegador verificó los 157 roles en cada una de las cuatro marcas: 628 valores, cero diferencias con el snapshot exportado. Véase `../releases/1.1.0/tokens-sync-2026-09-23-browser.json`.

Las pruebas detectaron nombres accesibles duplicados en las secciones de tipografía. Se incluyeron sección, tamaño y familia en aria-labelledby, sin modificar el diseño visual.

La paridad de tokens no equivale a conformidad WCAG de todo el catálogo. Los fallos de contraste de primary excluidos expresamente en Reina Madre y Piel Sana siguen pendientes. No se publicó la versión ni se renovó el sello histórico de validación de release.
