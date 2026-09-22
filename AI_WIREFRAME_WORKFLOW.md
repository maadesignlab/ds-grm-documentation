# Generación de wireframes con Claude

Este documento define cómo un diseñador UX/UI solicita a Claude pantallas navegables sin tener que operar el repositorio ni escribir código. Claude es la capa de composición; Storybook, el Registry y el contrato del Design System son sus fuentes técnicas.

## Tipo de entrega

El archivo `Paquetes-prototipo.html` es la referencia del nivel esperado de interacción: varias vistas, datos de muestra, filtros, tablas, formularios, modales y estados dentro de una entrega navegable.

La referencia no debe copiarse como arquitectura. Un HTML autónomo que recrea `.btn`, `.card`, `.toast`, calendarios o tablas mediante CSS y JavaScript propios deriva del Design System. El flujo canónico es:

1. Claude compone la pantalla en React y Tailwind CSS.
2. Claude incorpora los componentes reales desde el Registry `@grm`.
3. El proyecto compila la entrega para revisión o publicación web.
4. HTML, CSS y JavaScript compilados son el artefacto de distribución, no una segunda implementación manual.

## Fuentes obligatorias

La IA debe consultar, en este orden:

1. `DESIGN_SYSTEM_WORKFLOW.md`, como contrato del proyecto.
2. `STORYBOOK_UX_UI_CATALOG.md`, cargando las reglas generales y solo las fichas de los componentes requeridos.
3. Storybook y su MCP, para confirmar componentes, argumentos, estados y comportamiento real.
4. `public/r/ai-manifest.json`, para relacionar Registry, Figma, implementación, ejemplo y Docs.
5. El Registry `/r/{component}.json`, para incorporar el código real.

Playground es la referencia canónica de renderizado. Figma determina la expresión GRM y shadcn/ui conserva la estructura y el comportamiento.

## Flujo del diseñador

1. Escribir el objetivo, los usuarios y las tareas de la pantalla.
2. Elegir marca y viewport.
3. Indicar datos, estados y acciones necesarias.
4. Solicitar a la IA una primera composición.
5. Revisar la vista HTML interactiva.
6. Iterar sobre jerarquía y flujo, no sobre valores CSS aislados.
7. Entregar la composición aprobada a desarrollo con la lista de componentes utilizados.

El diseñador trabaja con Claude mediante un brief. No necesita indicar clases Tailwind, variables CSS ni detalles internos de shadcn/ui.

## Formato recomendado del requerimiento

```text
Objetivo: consultar y administrar pacientes.
Marca: Reina Madre.
Viewport: desktop y mobile.
Estructura: Sidebar, encabezado, filtros, Data Table y paginación.
Datos: nombre, identificación, estado y próxima cita.
Acciones: buscar, filtrar, abrir detalle y crear paciente.
Estados: cargando, vacío, con resultados y error.
Restricciones: utilizar exclusivamente componentes GRM existentes.
```

## Brief para una entrega navegable

```text
Entrega: prototipo navegable.
Objetivo: [qué debe poder resolver el usuario].
Usuarios: [roles principales].
Marca: [GRM Global | Reina Madre | María Linda | Piel Sana].
Viewports: [desktop | tablet | mobile].

Vistas:
- [vista 1 y su propósito].
- [vista 2 y su propósito].

Datos de muestra:
- [entidades y campos relevantes].

Acciones e interacciones:
- [crear, editar, filtrar, seleccionar, confirmar...].

Estados obligatorios:
- [cargando, vacío, con datos, error, éxito, disabled...].

Reglas de negocio:
- [validaciones, permisos y restricciones conocidas].

Criterio de aceptación:
- Usa exclusivamente componentes disponibles en GRM Storybook.
- Consulta Storybook MCP antes de elegir propiedades o variantes.
- Mantén correspondencia con Playground.
- Reporta por separado cualquier gap del Design System.
- Entrega la URL o build navegable y el inventario de componentes usados.
```

Claude puede proponer la composición y los componentes concretos. El diseñador valida jerarquía, contenido, flujo y estados; no corrige manualmente el CSS del componente.

## Resultado esperado

La salida visible puede ser HTML, pero la fuente debe ser React y Tailwind CSS. Los componentes se instalan desde el Registry y se componen dentro de la aplicación de wireframes.

Cada entrega debe incluir:

- Vista interactiva y responsiva.
- Marca aplicada mediante `data-theme`.
- Lista de componentes y variantes utilizadas.
- Estados relevantes de la pantalla.
- Código fuente reutilizable.
- Faltantes del Design System, si existen.

## Restricciones

- No recrear Button, Input, Select, Table u otro componente con HTML paralelo.
- No usar colores hexadecimales, `!important` ni estilos visuales hardcodeados.
- No crear variantes privadas para resolver una composición de pantalla.
- No tomar las cards editoriales de Docs como parte del componente.
- No modificar primitives para incorporar lógica de negocio.
- No inventar un componente ausente: se registra como gap para diseño y desarrollo.

## Instalación en el proyecto generador

Configurar el namespace en `components.json`, reemplazando `<storybook-url>` por el dominio del despliegue:

```json
{
  "registries": {
    "@grm": "<storybook-url>/r/{name}.json"
  }
}
```

Instalar primero la base y después los componentes requeridos:

```bash
npx shadcn@latest add @grm/grm-base
npx shadcn@latest add @grm/sidebar @grm/input @grm/select @grm/data-table
```

La hoja de entrada de la aplicación debe importar `src/styles/grm.css` y las fuentes variables declaradas por `grm-base`.

## Configuración de Claude Code

El repositorio incluye `.mcp.json`, que registra dos accesos: `grm-storybook` para autoría y pruebas contra Storybook local, y `grm-storybook-docs` para consultar la documentación compartida publicada en Chromatic. `CLAUDE.md` carga este flujo y el contrato del Design System.

Antes de iniciar Claude Code:

```bash
npm run storybook
```

Al abrir el repositorio por primera vez, se aprueba el servidor MCP del proyecto. Claude debe poder consultar `docs-list`, `docs-show`, las stories y las herramientas de prueba antes de generar UI.

## Pruebas desde ChatGPT y Codex

Para probar el mismo consumo desde ChatGPT Desktop o Codex:

1. Abrir este repositorio como proyecto.
2. Ejecutar `npm run storybook` en una terminal.
3. Reiniciar ChatGPT Desktop o Codex para cargar `.codex/config.toml`.
4. Verificar que el servidor `grm_storybook` esté conectado.
5. Enviar el brief de este documento y solicitar explícitamente que consulte GRM Storybook antes de componer.

Prompt mínimo de validación:

```text
Usa exclusivamente el Design System GRM. Antes de generar UI, consulta
grm_storybook para descubrir componentes y verificar sus propiedades reales.

Crea una pantalla de consulta de pacientes para Reina Madre con Sidebar,
encabezado, filtros, Data Table y paginación. Incluye estados con datos,
vacío, cargando y error. No recrees componentes con HTML paralelo y reporta
cualquier gap del Design System.
```

Para el equipo, la documentación y el MCP remoto están publicados en Chromatic:

- Storybook: `https://6aa378ea63d7e5f79e6c2845-ctflbyijzl.chromatic.com/`
- MCP de documentación: `https://6aa378ea63d7e5f79e6c2845-ctflbyijzl.chromatic.com/mcp`
- Registry: `https://ds-grm-documentation.vercel.app/r/{name}.json`

Los consumidores no necesitan ejecutar Storybook localmente. El servidor local se conserva únicamente para desarrollar, probar y documentar componentes dentro de este repositorio.
