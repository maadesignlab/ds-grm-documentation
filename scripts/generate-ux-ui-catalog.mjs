import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import ts from "typescript"

const root = process.cwd()
const uiDirectory = path.join(root, "src/components/ui")
const outputPath = path.join(root, "STORYBOOK_UX_UI_CATALOG.md")
const storybookUrl = "https://ds-grm-documentation.vercel.app"
const chromaticUrl = "https://6aa378ea63d7e5f79e6c2845-ctflbyijzl.chromatic.com"
const repositoryUrl = "https://github.com/maadesignlab/ds-grm-documentation"

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"))
const manifest = JSON.parse(await readFile(path.join(root, "public/r/ai-manifest.json"), "utf8"))
const registry = JSON.parse(await readFile(path.join(root, "src/components/registry.json"), "utf8"))

const componentDescriptions = {
  accordion: "Agrupa contenido expandible en uno o varios paneles y conserva interacción por teclado.",
  alert: "Comunica información contextual, advertencias, errores o confirmaciones dentro del flujo.",
  "alert-dialog": "Solicita confirmación explícita antes de ejecutar una acción relevante o irreversible.",
  attachment: "Representa archivos adjuntos y sus estados de carga, procesamiento, error y finalización.",
  avatar: "Representa una identidad mediante imagen, iniciales o icono, con tamaños y complementos proporcionales.",
  badge: "Etiqueta compacta para clasificación, estado o metadatos breves.",
  breadcrumb: "Representa la jerarquía de ubicación; en Storybook GRM su muestra no navega.",
  button: "Acción primaria o secundaria con texto, icono, spinner y estados interactivos.",
  "button-group": "Agrupa acciones relacionadas y coordina bordes, orientación y espaciado entre botones.",
  calendar: "Selección de fecha, rango y disponibilidad basada en el Calendar oficial de shadcn/ui.",
  card: "Contenedor estructurado con header, contenido, media, acciones y footer opcionales.",
  carousel: "Secuencia navegable de contenidos basada en Embla y la composición oficial de shadcn/ui.",
  checkbox: "Control de selección binaria o indeterminada, individual o contenido en una opción ampliada.",
  collapsible: "Muestra u oculta una región de contenido mediante un trigger accesible.",
  combobox: "Selección con búsqueda, grupos, limpieza, opción múltiple y popup según Base UI.",
  "context-menu": "Menú contextual activado sobre un área de trigger mediante interacción secundaria.",
  "data-table": "Composición avanzada de Table con TanStack: sorting, filtros, visibilidad, selección y paginación.",
  "date-picker": "Composición de Button, Popover y Calendar para elegir fecha, rango o fecha y hora.",
  drawer: "Panel flotante deslizable con posiciones, tamaños, nesting, non-modal y snap points.",
  "dropdown-menu": "Menú de acciones y opciones con grupos, checks, radios, submenús y shortcuts.",
  empty: "Estado vacío con media, título, descripción y acciones opcionales.",
  field: "Estructura de formulario que asocia label, descripción, control, errores y agrupaciones.",
  "hover-card": "Contenido contextual enriquecido que aparece al mantener hover o foco sobre un trigger.",
  input: "Entrada de texto basada en shadcn/ui, con estados y composición lateral mediante Input Group.",
  "input-otp": "Entrada accesible para códigos segmentados con agrupación, separadores y estados.",
  item: "Unidad de contenido reutilizable con media, cuerpo, acciones, header y footer.",
  kbd: "Representación compacta de teclas o atajos de teclado.",
  label: "Etiqueta accesible asociada a controles de formulario.",
  menubar: "Barra persistente de menús con items, checks, radios, submenús y shortcuts.",
  "native-select": "Selector nativo del navegador adaptado a tokens y geometría GRM.",
  "navigation-menu": "Navegación principal con links, dropdowns y viewport compuesto.",
  pagination: "Navegación entre páginas con controles laterales, elipsis y selector de filas.",
  popover: "Contenedor contextual no modal con trigger, anchor y content oficiales de shadcn/ui.",
  progress: "Indicador de avance determinado con label y porcentaje opcionales por composición.",
  "radio-group": "Selección excluyente entre opciones relacionadas.",
  resizable: "Distribución de paneles redimensionables horizontal o verticalmente.",
  "scroll-area": "Región con scroll estilizado vertical u horizontal sin sustituir el comportamiento nativo.",
  select: "Selector compuesto accesible con grupos, scrolling e iconos opcionales.",
  separator: "Divisor semántico o decorativo horizontal o vertical.",
  sheet: "Panel superpuesto desde un borde con anchuras y disposiciones de footer documentadas.",
  sidebar: "Navegación lateral responsive con estados expanded/collapsed, subnavegación y tooltips.",
  slider: "Selección numérica simple, de rango o múltiple, horizontal o vertical.",
  spinner: "Indicador animado de actividad o carga indeterminada.",
  switch: "Control binario inmediato para activar o desactivar una configuración.",
  table: "Primitivas semánticas de tabla para headers, filas, celdas, captions y contenido especializado.",
  tabs: "Cambio entre paneles relacionados mediante triggers contenidos o underline.",
  toast: "Notificación temporal basada en Toast de Base UI con estados y comportamientos compuestos.",
  toggle: "Control presionable independiente con icono, texto, estilos y tamaños.",
  "toggle-group": "Agrupación single o multiple construida sobre Toggle.",
  tooltip: "Ayuda contextual breve activada por hover o foco y vinculada accesiblemente al trigger.",
}

const componentCategories = {
  accordion: "Disclosure", collapsible: "Disclosure",
  alert: "Feedback", "alert-dialog": "Overlay", empty: "Feedback", progress: "Feedback", spinner: "Feedback", toast: "Feedback",
  attachment: "Data display", avatar: "Data display", badge: "Data display", card: "Data display", item: "Data display", kbd: "Data display", table: "Data display", "data-table": "Data display",
  breadcrumb: "Navigation", menubar: "Navigation", "navigation-menu": "Navigation", pagination: "Navigation", sidebar: "Navigation", tabs: "Navigation",
  button: "Action", "button-group": "Action", toggle: "Action", "toggle-group": "Action",
  calendar: "Form", checkbox: "Form", combobox: "Form", "date-picker": "Form", field: "Form", input: "Form", "input-otp": "Form", label: "Form", "native-select": "Form", "radio-group": "Form", select: "Form", slider: "Form", switch: "Form",
  carousel: "Layout", resizable: "Layout", "scroll-area": "Layout", separator: "Layout",
  "context-menu": "Menu", "dropdown-menu": "Menu",
  drawer: "Overlay", "hover-card": "Overlay", popover: "Overlay", sheet: "Overlay", tooltip: "Overlay",
}

const brandLabels = {
  "grm-global": "GRM Global",
  "reina-madre": "Reina Madre",
  "maria-linda": "María Linda",
  "piel-sana": "Piel Sana",
}

function parseSource(content, fileName) {
  return ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
}

function propertyName(node) {
  if (!node) return ""
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text
  return node.getText()
}

function unwrap(node) {
  let current = node
  while (current && (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current))) current = current.expression
  return current
}

function createEvaluator(sourceFile) {
  const declarations = new Map()
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) declarations.set(declaration.name.text, declaration.initializer)
    }
  }

  const evaluating = new Set()
  function evaluate(input, scope = new Map()) {
    const node = unwrap(input)
    if (!node) return undefined
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
    if (ts.isNumericLiteral(node)) return Number(node.text)
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false
    if (node.kind === ts.SyntaxKind.NullKeyword) return null
    if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) return node.operator === ts.SyntaxKind.MinusToken ? -Number(node.operand.text) : Number(node.operand.text)
    if (ts.isArrayLiteralExpression(node)) {
      const value = []
      for (const element of node.elements) {
        if (ts.isSpreadElement(element)) {
          const spread = evaluate(element.expression, scope)
          if (Array.isArray(spread)) value.push(...spread)
          else value.push(`Expression: ${element.getText(sourceFile)}`)
        } else value.push(evaluate(element, scope))
      }
      return value
    }
    if (ts.isObjectLiteralExpression(node)) {
      const value = {}
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) value[propertyName(property.name)] = evaluate(property.initializer, scope)
        else if (ts.isShorthandPropertyAssignment(property)) value[property.name.text] = evaluate(property.name, scope)
        else if (ts.isSpreadAssignment(property)) {
          const spread = evaluate(property.expression, scope)
          if (spread && typeof spread === "object" && !Array.isArray(spread)) Object.assign(value, spread)
        }
      }
      return value
    }
    if (ts.isIdentifier(node)) {
      if (node.text === "undefined") return undefined
      if (scope.has(node.text)) return scope.get(node.text)
      if (!declarations.has(node.text) || evaluating.has(node.text)) return `Expression: ${node.getText(sourceFile)}`
      evaluating.add(node.text)
      const value = evaluate(declarations.get(node.text), scope)
      evaluating.delete(node.text)
      return value
    }
    if (ts.isBinaryExpression(node)) {
      const left = evaluate(node.left, scope)
      const right = evaluate(node.right, scope)
      if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + right
      if (node.operatorToken.kind === ts.SyntaxKind.MinusToken) return left - right
      if (node.operatorToken.kind === ts.SyntaxKind.AsteriskToken) return left * right
      if (node.operatorToken.kind === ts.SyntaxKind.SlashToken) return left / right
    }
    if (ts.isTemplateExpression(node)) {
      let value = node.head.text
      for (const span of node.templateSpans) value += `${evaluate(span.expression, scope)}${span.literal.text}`
      return value
    }
    if (
      ts.isCallExpression(node)
      && ts.isPropertyAccessExpression(node.expression)
      && node.expression.expression.getText(sourceFile) === "Array"
      && node.expression.name.text === "from"
    ) {
      const source = evaluate(node.arguments[0], scope)
      const mapper = node.arguments[1]
      if (source && typeof source.length === "number" && mapper && ts.isArrowFunction(mapper)) {
        return Array.from({ length: source.length }, (_, index) => {
          const localScope = new Map(scope)
          if (mapper.parameters[0] && ts.isIdentifier(mapper.parameters[0].name)) localScope.set(mapper.parameters[0].name.text, undefined)
          if (mapper.parameters[1] && ts.isIdentifier(mapper.parameters[1].name)) localScope.set(mapper.parameters[1].name.text, index)
          return evaluate(mapper.body, localScope)
        })
      }
    }
    return `Expression: ${node.getText(sourceFile).replace(/\s+/g, " ").slice(0, 240)}`
  }
  return evaluate
}

function getObjectProperty(object, name) {
  const node = unwrap(object)
  if (!node || !ts.isObjectLiteralExpression(node)) return undefined
  const property = node.properties.find((item) => ts.isPropertyAssignment(item) && propertyName(item.name) === name)
  return property?.initializer
}

function findVariable(sourceFile, name) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name) return declaration.initializer
    }
  }
  return undefined
}

function exportedVariableStatements(sourceFile) {
  return sourceFile.statements.filter((statement) =>
    ts.isVariableStatement(statement) && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword),
  )
}

function markdownValue(value) {
  if (value === undefined) return "—"
  if (value === null) return "`null`"
  if (typeof value === "string") {
    const clean = value.replace(/\s+/g, " ").trim()
    return clean ? `\`${clean.replaceAll("`", "\\`")}\`` : "—"
  }
  if (typeof value === "number" || typeof value === "boolean") return `\`${value}\``
  const serialized = JSON.stringify(value)
  return serialized ? `\`${serialized.replaceAll("|", "\\|").replaceAll("`", "\\`")}\`` : "—"
}

function escapeCell(value) {
  return String(value ?? "—").replaceAll("|", "\\|").replace(/\r?\n/g, "<br>")
}

function table(columns, rows) {
  if (!rows.length) return "_Sin datos._\n"
  return [
    `| ${columns.map(escapeCell).join(" | ")} |`,
    `| ${columns.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
    "",
  ].join("\n")
}

function staticTable(value) {
  if (!Array.isArray(value) || value.length === 0) return null
  if (value.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
    const columns = [...new Set(value.flatMap((item) => Object.keys(item)))]
    return table(columns, value.map((item) => columns.map((column) => markdownValue(item[column]))))
  }
  if (value.every(Array.isArray)) {
    const width = Math.max(...value.map((row) => row.length))
    return table(Array.from({ length: width }, (_, index) => `Valor ${index + 1}`), value.map((row) => Array.from({ length: width }, (_, index) => markdownValue(row[index]))))
  }
  if (value.every((item) => ["string", "number", "boolean"].includes(typeof item))) return table(["Valor"], value.map((item) => [markdownValue(item)]))
  return null
}

function isUsefulStaticArray(name, value) {
  return Array.isArray(value) && value.length > 0 && /(variant|size|spec|state|option|mode|layout|appearance|type|orientation|placement|status|behavior|content|pattern|row|column)/i.test(name)
}

function parseImports(content) {
  return [...content.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1])
}

function parsePublicExports(sourceFile) {
  const exports = new Set()
  for (const statement of sourceFile.statements) {
    const isExported = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    if (isExported && statement.name && ts.isIdentifier(statement.name)) exports.add(statement.name.text)
    if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      for (const element of statement.exportClause.elements) exports.add(element.name.text)
    }
  }
  return [...exports]
}

function parseTypeContracts(sourceFile) {
  const contracts = []
  for (const statement of sourceFile.statements) {
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue
    if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) contracts.push(statement.getText(sourceFile))
  }
  return contracts
}

function parseMdx(content) {
  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim())
  const versionMatch = content.match(/<summary>\s*<strong>([^<]+)<\/strong>\s*·\s*([^<]+)<\/summary>/)
  const details = content.match(/<details[\s\S]*?<\/details>/)?.[0] ?? ""
  const changes = [...details.matchAll(/^\s*-\s+(.+)$/gm)].map((match) => match[1].trim())
  return { headings, version: versionMatch?.[1] ?? "No declarada", versionLabel: versionMatch?.[2]?.trim() ?? "—", changes }
}

function storyControlRows(argTypes = {}) {
  return Object.entries(argTypes).map(([property, config]) => {
    const tableConfig = config?.table ?? {}
    const control = typeof config?.control === "object" ? config.control.type : config?.control
    return [
      `\`${property}\``,
      config?.name ?? property,
      tableConfig.category ?? "General",
      control === false || tableConfig.disable ? "No" : "Sí",
      control === false ? "desactivado" : control ?? "automático",
      Array.isArray(config?.options) ? config.options.map((value) => `\`${value}\``).join(", ") : "—",
      config?.description ?? "—",
    ]
  })
}

function parseStories(content, fileName) {
  const sourceFile = parseSource(content, fileName)
  const evaluate = createEvaluator(sourceFile)
  const metaInitializer = findVariable(sourceFile, "meta")
  const meta = evaluate(metaInitializer) ?? {}
  const stories = []
  for (const statement of exportedVariableStatements(sourceFile)) {
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue
      const objectNode = unwrap(declaration.initializer)
      if (!ts.isObjectLiteralExpression(objectNode)) continue
      const args = evaluate(getObjectProperty(objectNode, "args")) ?? {}
      const argTypes = evaluate(getObjectProperty(objectNode, "argTypes")) ?? {}
      stories.push({
        exportName: declaration.name.text,
        args,
        argTypes,
        hasPlay: Boolean(getObjectProperty(objectNode, "play")),
        hasRender: Boolean(getObjectProperty(objectNode, "render")),
      })
    }
  }
  return { sourceFile, meta, stories }
}

function parseDocsData(content, fileName) {
  const sourceFile = parseSource(content, fileName)
  const evaluate = createEvaluator(sourceFile)
  const usedRows = new Set()
  const specificationTables = []

  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(sourceFile).endsWith("DocsSpecificationTable")) {
      const attributes = Object.fromEntries(node.attributes.properties
        .filter(ts.isJsxAttribute)
        .map((attribute) => {
          const initializer = attribute.initializer
          if (!initializer) return [attribute.name.text, true]
          if (ts.isStringLiteral(initializer)) return [attribute.name.text, initializer.text]
          if (ts.isJsxExpression(initializer)) return [attribute.name.text, evaluate(initializer.expression)]
          return [attribute.name.text, initializer.getText(sourceFile)]
        }))
      const rowsAttribute = node.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && attribute.name.text === "rows")
      if (rowsAttribute?.initializer && ts.isJsxExpression(rowsAttribute.initializer) && ts.isIdentifier(rowsAttribute.initializer.expression)) usedRows.add(rowsAttribute.initializer.expression.text)
      specificationTables.push(attributes)
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)

  const staticArrays = []
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue
      const value = evaluate(declaration.initializer)
      if (isUsefulStaticArray(declaration.name.text, value) && !usedRows.has(declaration.name.text) && staticTable(value)) staticArrays.push({ name: declaration.name.text, value })
    }
  }
  return { specificationTables, staticArrays }
}

async function loadExportedConst(file, exportName) {
  const content = await readFile(path.join(root, file), "utf8")
  const sourceFile = parseSource(content, file)
  return createEvaluator(sourceFile)(findVariable(sourceFile, exportName))
}

function getFontWeight(fontStyle) {
  if (fontStyle.includes("Extra Bold")) return 800
  if (fontStyle.includes("Semi Bold")) return 600
  if (fontStyle.includes("Bold")) return 700
  if (fontStyle.includes("Medium")) return 500
  return 400
}

function getTailwindClasses(style) {
  const sizeClasses = { 30: "text-3xl", 24: "text-2xl", 20: "text-xl", 18: "text-lg", 16: "text-base", 14: "text-sm", 12: "text-xs" }
  const lineHeightClasses = { Auto: "leading-normal", "24px": "leading-6", "20px": "leading-5", "16px": "leading-4" }
  const weightClasses = { 400: "font-normal", 500: "font-medium", 600: "font-semibold", 700: "font-bold", 800: "font-extrabold" }
  const sizeClass = sizeClasses[style.size] ?? (style.size === 12.8 ? "text-[0.8rem]" : `text-[${style.size}px]`)
  const lineHeightClass = lineHeightClasses[style.lineHeight] ?? `leading-[${style.lineHeight}]`
  const trackingClass = style.letterSpacing === "0%" ? "tracking-normal" : `tracking-[${Number.parseFloat(style.letterSpacing) / 100}em]`
  const caseClass = style.textCase === "UPPER" ? "uppercase" : style.textCase === "TITLE" ? "capitalize" : "normal-case"
  const decorationClass = style.textDecoration === "UNDERLINE" ? "underline" : style.textDecoration === "STRIKETHROUGH" ? "line-through" : "no-underline"
  const familyClass = style.familyToken.includes("mono") || style.family.includes("Mono") ? "font-mono" : "font-sans"
  const italicClass = style.fontStyle.includes("Italic") ? "italic" : ""
  return [familyClass, sizeClass, lineHeightClass, weightClasses[getFontWeight(style.fontStyle)], trackingClass, caseClass, decorationClass, italicClass].filter(Boolean).join(" ")
}

function storyId(slug, exportName) {
  return `components-${slug}--${exportName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replaceAll("_", "-").toLowerCase()}`
}

const semanticTokens = await loadExportedConst("src/foundations/semantic-brand-token-values.ts", "semanticBrandTokenValues")
const extraColors = await loadExportedConst("src/foundations/extra-color-token-values.ts", "extraColorTokenValues")
const typographyStyles = await loadExportedConst("src/foundations/typography-style-values.ts", "typographyStyles")
const registryItems = new Map(registry.items.map((item) => [item.name, item]))
const primaryStoryIds = new Map()

for (const component of manifest.components) {
  const storyContent = await readFile(path.join(uiDirectory, `${component.slug}.stories.tsx`), "utf8")
  const firstStory = parseStories(storyContent, `${component.slug}.stories.tsx`).stories[0]
  if (firstStory) primaryStoryIds.set(component.slug, storyId(component.slug, firstStory.exportName))
}

const lines = []
const push = (...values) => lines.push(...values)

push(
  "---",
  `title: \"Catálogo UX/UI del Storybook GRM\"`,
  `designSystem: \"${manifest.designSystem.name}\"`,
  `version: \"${packageJson.version}\"`,
  `catalogSchemaVersion: 1`,
  `status: \"current\"`,
  `canonicalRendering: \"Playground\"`,
  `generatedFrom: \"Storybook source\"`,
  "---",
  "",
  "# Catálogo UX/UI del Storybook GRM",
  "",
  `> Snapshot exhaustivo de **${manifest.designSystem.name} v${packageJson.version}**. Este archivo está orientado a diseñadores UX/UI y agentes de IA que necesiten construir wireframes fieles al Storybook sin recorrer todo el repositorio.`,
  "> **Archivo generado:** no editar manualmente. Actualizar las fuentes canónicas y ejecutar `npm run catalog:generate`.",
  "",
  "## Estado y alcance de esta versión",
  "",
  table(
    ["Campo", "Valor"],
    [
      ["Versión del Design System", `\`${packageJson.version}\``],
      ["Componentes documentados", String(manifest.components.length)],
      ["Marcas", Object.values(brandLabels).join(", ")],
      ["Base técnica", "shadcn/ui; Radix UI o Base UI según el componente oficial vigente"],
      ["Fuente visual canónica", "Playground de Storybook"],
      ["Fuente de tokens y geometría", "Figma Design System GRM v1"],
      ["Distribución", "Storybook + shadcn Registry; paquete npm no publicado"],
    ],
  ),
  "Este documento describe **todo lo disponible en v1**. No convierte ejemplos editoriales en nuevas APIs y no sustituye los primitives públicos. Cuando una pantalla necesite algo que no aparezca aquí, se registra como gap en lugar de inventarlo.",
  "",
  "## Cómo usar este catálogo sin cargarlo completo",
  "",
  "1. Identificar la marca y el objetivo de la pantalla.",
  "2. Consultar el índice y abrir únicamente las secciones `Componente: ...` necesarias.",
  "3. Usar la tabla de controles de Playground para combinaciones válidas.",
  "4. Usar las tablas documentales para tamaños, tokens, spacing, estados y composiciones.",
  "5. Usar el código del primitive solo cuando se necesite implementar; el diseñador puede trabajar con los nombres públicos.",
  "6. Mantener en una misma composición las instancias compartidas por Docs y Playground.",
  "7. Reportar cualquier propiedad o variante no listada como gap.",
  "",
  "### Orden de autoridad",
  "",
  "1. **shadcn/ui:** primitive, API, comportamiento, accesibilidad y composición técnica.",
  "2. **Figma GRM:** tokens, tipografía, geometría, estados visuales y composiciones aprobadas.",
  "3. **Playground:** instancia renderizada canónica y controles válidos.",
  "4. **Docs:** explicación y tablas; nunca una implementación paralela.",
  "5. **Este catálogo:** índice versionado y consolidado de las cuatro capas anteriores.",
  "",
  "### Reglas innegociables para wireframes",
  "",
  "- No inventar props, subcomponentes, estados ni variantes.",
  "- No recrear con HTML un componente público existente.",
  "- No aplicar `!important`, colores hardcodeados o un sistema CSS paralelo.",
  "- Usar Tailwind CSS y variables semánticas GRM.",
  "- Aplicar la marca con `data-theme`.",
  "- Mantener accesibilidad, teclado, foco, disabled y ARIA heredados de shadcn/ui.",
  "- Considerar los archivos `*-example.tsx` como composiciones canónicas, no como primitives nuevos.",
  "- Mantener lógica, rutas, permisos y datos de negocio fuera del Design System.",
  "",
  "## Fuentes canónicas y acceso",
  "",
  table(
    ["Fuente", "Uso", "URL o ruta"],
    [
      ["Storybook visual", "Docs, Playground y selector de marca", `${storybookUrl}/`],
      ["Storybook MCP", "Descubrimiento y documentación estructurada", `${chromaticUrl}/mcp`],
      ["Figma", "Variables, geometría y componentes", manifest.sources.figma],
      ["GitHub", "Código y versionamiento", repositoryUrl],
      ["Registry", "Código instalable por shadcn", `${storybookUrl}/r/{name}.json`],
      ["Manifiesto IA", "Mapa máquina-componente", `${storybookUrl}/r/ai-manifest.json`],
      ["Contrato", "Reglas completas del proceso", "DESIGN_SYSTEM_WORKFLOW.md"],
    ],
  ),
  "## Marcas y tematización",
  "",
  "El selector global modifica `data-theme` en el elemento raíz. Todos los componentes deben reaccionar a la marca sin reconstruirse ni recibir colores directos.",
  "",
  table(
    ["Selector", "Marca", "Fuente sans", "Fuente mono"],
    Object.entries(brandLabels).map(([key, label]) => [key, label, semanticTokens[key]?.["--brand-font-sans"] ?? "—", semanticTokens[key]?.["--brand-font-mono"] ?? "—"]),
  ),
  "## Foundations: Semantic Brand",
  "",
  "Las siguientes tablas contienen todos los valores exportados desde Figma para cada modo. El nombre de variable es estable; cambia el valor según la marca.",
  "",
)

for (const [brand, label] of Object.entries(brandLabels)) {
  const entries = Object.entries(semanticTokens[brand] ?? {})
  push(`### ${label} — \`${brand}\``, "", table(["Variable", "Valor"], entries.map(([name, value]) => [`\`${name}\``, `\`${value}\``])))
}

push(
  "## Foundations: Extra Colors",
  "",
  "Paletas auxiliares estables. Appointment consume estas familias mediante aliases semánticos; los componentes deben usar el alias de Appointment y no el nombre de paleta cuando representen un estado de cita.",
  "",
)

for (const [family, entries] of Object.entries(extraColors)) push(`### ${family}`, "", table(["Token", "Valor"], entries.map(([name, value]) => [`\`${name}\``, `\`${value}\``])))

const appointmentFamilies = {
  scheduled: "Slate Gray", confirmed: "Clear Blue", reception: "Golden Yellow", vitals: "Berry Pink", consultation: "Amber Orange", completed: "Nature Green", "no-show": "Warm Red", cancelled: "Soft Coral", rescheduled: "Lavender Purple",
}
const appointmentLevels = { light: "50", "light-border": "200", default: "500", foreground: "700" }
const extraEntries = Object.values(extraColors).flat()
const appointmentRows = []
for (const [status, family] of Object.entries(appointmentFamilies)) {
  for (const [semanticLevel, extraLevel] of Object.entries(appointmentLevels)) {
    const variable = `--appointment-${status}-${semanticLevel}`
    const extraPrefix = family.replaceAll(" ", "").replace(/^./, (letter) => letter.toLowerCase())
    const reference = `${extraPrefix}/${extraLevel}`
    const value = semanticTokens["grm-global"]?.[variable] ?? extraEntries.find(([name]) => name === reference)?.[1] ?? "—"
    appointmentRows.push([status, `\`${variable}\``, `\`${reference}\``, `\`${value}\``])
  }
}
push("## Foundations: relación Appointment ↔ Extra Colors", "", table(["Estado", "Token semántico", "Token base", "Valor"], appointmentRows))

push(
  "## Foundations: Typography",
  "",
  "Cada estilo conserva el nombre de Figma y su traducción vigente a Tailwind CSS. `font-sans` resuelve la familia activa de marca y `font-mono` resuelve JetBrains Mono.",
  "",
  table(
    ["Estilo Figma", "Estado", "Familia", "Peso", "Tamaño", "Line height", "Tracking", "Case", "Decoración", "Tailwind CSS", "Variables"],
    typographyStyles.map((style) => [
      `\`${style.name}\``, style.status === "legacy" ? "Legacy" : "Activo", style.family, `${style.fontStyle} (${getFontWeight(style.fontStyle)})`, `${style.size}px`, style.lineHeight, style.letterSpacing, style.textCase, style.textDecoration, `\`${getTailwindClasses(style)}\``, [style.familyToken, style.sizeToken, style.weightToken, style.lineHeightToken].filter(Boolean).map((token) => `\`${token}\``).join("<br>") || "—",
    ]),
  ),
  "## Inventario de componentes v1",
  "",
  table(
    ["Componente", "Categoría", "Tipo", "Nodo Figma", "Docs", "Playground"],
    manifest.components.map((component) => [
      `[${component.name}](#componente-${component.slug})`, componentCategories[component.slug] ?? "Other", component.kind, `\`${component.figmaNode}\``, `[abrir](${storybookUrl}/?path=/docs/components-${component.slug}--docs)`, primaryStoryIds.has(component.slug) ? `[abrir](${storybookUrl}/?path=/story/${primaryStoryIds.get(component.slug)})` : "—",
    ]),
  ),
)

for (const component of manifest.components) {
  const slug = component.slug
  const storyPath = path.join(uiDirectory, `${slug}.stories.tsx`)
  const examplePath = path.join(uiDirectory, `${slug}-example.tsx`)
  const docsPath = path.join(uiDirectory, `${slug}-docs.tsx`)
  const mdxPath = path.join(uiDirectory, `${slug}.mdx`)
  const implementationPath = component.implementation ? path.join(root, component.implementation) : null
  const [storyContent, exampleContent, docsContent, mdxContent, implementationContent] = await Promise.all([
    readFile(storyPath, "utf8"), readFile(examplePath, "utf8"), readFile(docsPath, "utf8"), readFile(mdxPath, "utf8"), implementationPath ? readFile(implementationPath, "utf8") : Promise.resolve(""),
  ])
  const parsedStories = parseStories(storyContent, `${slug}.stories.tsx`)
  const exampleSource = parseSource(exampleContent, `${slug}-example.tsx`)
  const exampleEvaluate = createEvaluator(exampleSource)
  const docsData = parseDocsData(docsContent, `${slug}-docs.tsx`)
  const mdx = parseMdx(mdxContent)
  const implementationSource = implementationContent ? parseSource(implementationContent, `${slug}.tsx`) : null
  const registryItem = registryItems.get(slug) ?? {}
  const externalImports = [...new Set([...(implementationContent ? parseImports(implementationContent) : []), ...parseImports(exampleContent)].filter((specifier) => !specifier.startsWith(".") && !specifier.startsWith("@/")))]
  const internalImports = [...new Set(parseImports(exampleContent).filter((specifier) => specifier.startsWith("./") || specifier.startsWith("@/components/ui/")))]
  const dataSlots = [...new Set([...implementationContent.matchAll(/data-slot=["']([^"']+)["']/g)].map((match) => match[1]))]
  const publicExports = implementationSource ? parsePublicExports(implementationSource) : []
  const typeContracts = parseTypeContracts(exampleSource)
  const exportedPresets = []
  for (const statement of exportedVariableStatements(exampleSource)) {
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !/(preset|playground|default|sizes|options)/i.test(declaration.name.text)) continue
      const value = exampleEvaluate(declaration.initializer)
      if (value && typeof value === "object") exportedPresets.push({ name: declaration.name.text, value })
    }
  }
  const baseName = externalImports.some((item) => item.startsWith("@base-ui")) ? "Base UI" : externalImports.some((item) => item.includes("radix")) ? "Radix UI" : component.kind === "block" ? "Composición de componentes GRM" : "React/HTML semántico"

  push(
    `## Componente: ${component.name}`,
    "",
    componentDescriptions[slug] ?? registryItem.description ?? "Componente público del Design System GRM.",
    "",
    "### Identidad y fuentes de verdad",
    "",
    table(
      ["Campo", "Valor"],
      [
        ["Slug", `\`${slug}\``],
        ["Categoría", componentCategories[slug] ?? "Other"],
        ["Tipo", component.kind === "block" ? "Composición / block" : "Primitive o wrapper público"],
        ["Base técnica detectada", baseName],
        ["Versión documentada", `\`${mdx.version}\` — ${mdx.versionLabel}`],
        ["Figma", `[nodo ${component.figmaNode}](${component.figma})`],
        ["Docs", `[abrir](${storybookUrl}/?path=/docs/components-${slug}--docs)`],
        ["Registry", `[${slug}.json](${storybookUrl}${component.registry})`],
        ["Implementación", component.implementation ? `\`${component.implementation}\`` : "Se resuelve en la composición de ejemplo"],
        ["Composición canónica", `\`${component.example}\``],
        ["Stories", `\`src/components/ui/${slug}.stories.tsx\``],
        ["Documentación", `\`${component.docs}\``],
      ],
    ),
  )

  if (mdx.changes.length) push("### Cambios declarados en la versión del componente", "", ...mdx.changes.map((change) => `- ${change}`), "")

  push(
    "### Contrato técnico y composición",
    "",
    table(
      ["Aspecto", "Detalle"],
      [
        ["Exports públicos", publicExports.length ? publicExports.map((name) => `\`${name}\``).join(", ") : "Composición sin primitive propio"],
        ["Data slots", dataSlots.length ? dataSlots.map((name) => `\`${name}\``).join(", ") : "No detectados"],
        ["Dependencias externas", externalImports.length ? externalImports.map((name) => `\`${name}\``).join(", ") : "Ninguna adicional"],
        ["Dependencias Registry", (registryItem.registryDependencies ?? []).map((name) => `\`${name}\``).join(", ") || "`@grm/grm-base`"],
        ["Composición interna del ejemplo", internalImports.length ? internalImports.map((name) => `\`${name}\``).join(", ") : "Solo el componente actual"],
        ["Secciones visibles en Docs", mdx.headings.join(" → ")],
      ],
    ),
  )

  if (typeContracts.length) {
    push("### Propiedades públicas de la composición de Playground", "", "Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.", "")
    for (const contract of typeContracts) push("```ts", contract, "```", "")
  }

  const metaArgs = parsedStories.meta.args ?? {}
  push("### Valores predeterminados globales de Storybook", "", table(["Propiedad", "Valor"], Object.entries(metaArgs).map(([name, value]) => [`\`${name}\``, markdownValue(value)])))

  const baseControlRows = storyControlRows(parsedStories.meta.argTypes ?? {})
  if (baseControlRows.length) push("### Controles globales", "", table(["Propiedad", "Nombre visible", "Categoría", "Visible", "Control", "Opciones", "Descripción"], baseControlRows))

  push("### Stories y Playground", "")
  for (const story of parsedStories.stories) {
    const id = storyId(slug, story.exportName)
    push(
      `#### ${story.exportName}`,
      "",
      `[Abrir story](${storybookUrl}/?path=/story/${id}) · [Abrir canvas aislado](${storybookUrl}/iframe.html?id=${id}&viewMode=story)`,
      "",
      table(
        ["Propiedad", "Valor"],
        [
          ["Render compartido explícito", story.hasRender ? "Sí" : "No; usa el componente definido en meta"],
          ["Prueba de interacción", story.hasPlay ? "Sí" : "No"],
        ],
      ),
      "**Args de esta story**",
      "",
      Object.keys(story.args ?? {}).length
        ? table(["Propiedad", "Valor"], Object.entries(story.args).map(([name, value]) => [`\`${name}\``, markdownValue(value)]))
        : "_No define valores propios; hereda los valores globales._",
    )
    const storyRows = storyControlRows(story.argTypes ?? {})
    if (storyRows.length) push("**Controles específicos o sobrescritos**", "", table(["Propiedad", "Nombre visible", "Categoría", "Visible", "Control", "Opciones", "Descripción"], storyRows))
  }

  if (exportedPresets.length) {
    push("### Presets exportados por la composición", "")
    for (const preset of exportedPresets) {
      push(`#### \`${preset.name}\``, "")
      if (Array.isArray(preset.value) && staticTable(preset.value)) push(staticTable(preset.value))
      else if (preset.value && typeof preset.value === "object") push(table(["Preset", "Configuración"], Object.entries(preset.value).map(([name, value]) => [`\`${name}\``, markdownValue(value)])))
    }
  }

  if (docsData.specificationTables.length || docsData.staticArrays.length) push("### Especificaciones consolidadas desde Docs", "")
  for (const specification of docsData.specificationTables) {
    push(`#### ${specification.title ?? "Especificación"}`, "", specification.description ? String(specification.description) : "", "")
    const rows = Array.isArray(specification.rows) ? specification.rows : []
    const columns = Array.isArray(specification.columns) ? specification.columns : []
    if (rows.length && columns.length) push(table(columns, rows.map((row) => row.map((value) => markdownValue(value)))))
  }
  for (const data of docsData.staticArrays) push(`#### Datos documentales: \`${data.name}\``, "", staticTable(data.value))

  push(
    "### Reglas de uso para wireframes",
    "",
    `- Construir la instancia mediante **${component.example.split("/").at(-1)}** o los exports públicos listados; no copiar el HTML de las cards editoriales.`,
    "- Mantener exactamente las combinaciones expuestas por las stories y sus controles.",
    "- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.",
    "- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.",
    "- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.",
    "",
  )
}

const documented = new Set(manifest.components.map((component) => component.slug))
const supportingItems = registry.items.filter((item) => item.name !== "grm-base" && !documented.has(item.name))
push(
  "## Piezas de soporte no documentadas como componente independiente",
  "",
  "Estas piezas pueden ser dependencias legítimas, pero no deben presentarse como componentes aprobados del catálogo UX/UI mientras no tengan Docs y Playground propios.",
  "",
  table(
    ["Nombre", "Tipo Registry", "Descripción", "Archivo", "Dependencias"],
    supportingItems.map((item) => [
      `\`${item.name}\``, item.type, item.description ?? "—", (item.files ?? []).map((file) => `\`${file.path}\``).join("<br>"), (item.registryDependencies ?? []).map((name) => `\`${name}\``).join(", ") || "—",
    ]),
  ),
  "## Protocolo para crear una pantalla completa",
  "",
  "1. Definir marca, objetivo, audiencia, viewport y estados obligatorios.",
  "2. Seleccionar componentes únicamente desde el inventario v1.",
  "3. Leer la sección de cada componente seleccionado; no leer capítulos no usados.",
  "4. Elegir args y presets existentes. No combinar controles incompatibles.",
  "5. Construir primero la estructura, después contenido, estados y responsive.",
  "6. Aplicar la tipografía y los tokens semánticos de la marca.",
  "7. Añadir estados loading, empty, error, disabled y selección solo donde el flujo los requiera.",
  "8. Revisar foco, teclado, labels, nombres accesibles, contraste y orden de tabulación.",
  "9. Comparar contra Playground cuando exista acceso visual; de lo contrario, usar tipos, args y especificaciones de este catálogo.",
  "10. Entregar una lista de componentes usados, configuraciones elegidas, aproximaciones y gaps.",
  "",
  "## Plantilla compacta de brief UX/UI",
  "",
  "```yaml",
  "screen:",
  "  name: \"Nombre de la pantalla\"",
  "  objective: \"Tarea principal\"",
  "  audience: \"Usuario objetivo\"",
  "brand: \"grm-global | reina-madre | maria-linda | piel-sana\"",
  "viewport: \"desktop | tablet | mobile | responsive\"",
  "components:",
  "  required: []",
  "  forbidden: []",
  "states:",
  "  - data",
  "  - loading",
  "  - empty",
  "  - error",
  "content:",
  "  language: \"es-MX\"",
  "  data_policy: \"fictitious\"",
  "interactions: []",
  "acceptance:",
  "  - \"Uses only documented component APIs\"",
  "  - \"Uses semantic tokens for the selected brand\"",
  "  - \"Reports gaps instead of inventing variants\"",
  "```",
  "",
  "## Versionamiento y actualización del catálogo",
  "",
  "Este archivo es un artefacto generado y versionado junto con el código. Su frontmatter registra la versión vigente del paquete. Git conserva el historial completo de cada cambio.",
  "",
  "### Regla por release",
  "",
  "1. Modificar Figma, tokens, primitive, example, story y Docs según el contrato.",
  "2. Crear el changeset del componente.",
  "3. Actualizar la versión mediante Changesets.",
  "4. Ejecutar `npm run registry:generate`.",
  "5. Ejecutar `npm run catalog:generate`.",
  "6. Revisar el diff de `STORYBOOK_UX_UI_CATALOG.md`.",
  "7. Ejecutar `npm run release` y validar Storybook.",
  "8. Confirmar que versión, controles, presets, tokens y enlaces correspondan a la release.",
  "9. Commit y tag de la versión incluyendo este archivo.",
  "",
  "### Qué debe cambiar automáticamente",
  "",
  "- Versión global desde `package.json`.",
  "- Inventario y nodos Figma desde `public/r/ai-manifest.json`.",
  "- Tokens desde los archivos de Foundations.",
  "- Tipografía y traducción Tailwind desde la fuente tipográfica.",
  "- Componentes, dependencias y rutas desde el Registry.",
  "- Props, defaults, controles y stories desde CSF.",
  "- Presets desde `*-example.tsx`.",
  "- Especificaciones desde `*-docs.tsx`.",
  "- Versión y secciones visibles desde MDX.",
  "",
  "## Checklist de fidelidad 1:1",
  "",
  "- [ ] La marca y `data-theme` están definidos.",
  "- [ ] Todos los componentes existen en el inventario v1.",
  "- [ ] Cada componente usa props y presets documentados.",
  "- [ ] No se usaron piezas de soporte como si fueran componentes UX/UI aprobados.",
  "- [ ] Tipografía, tamaño, peso, line-height y tracking corresponden al catálogo.",
  "- [ ] Fondo, texto, borde, focus ring y estados consumen variables semánticas.",
  "- [ ] Padding, gap, altura, anchura, radio e iconos respetan especificaciones.",
  "- [ ] Loading, empty, error, disabled, hover, active y selección están considerados donde aplican.",
  "- [ ] La composición mantiene responsive y accesibilidad.",
  "- [ ] Docs y Playground comparten la misma instancia de ejemplo.",
  "- [ ] Las aproximaciones están declaradas y los gaps no se ocultaron.",
  "",
  "## Cierre normativo",
  "",
  "Ante una contradicción, prevalece shadcn/ui para el contrato técnico, Figma para la intención visual GRM y Playground para la instancia renderizada. Este catálogo facilita el consumo y el versionamiento, pero no autoriza implementaciones paralelas ni propiedades no documentadas.",
  "",
)

await writeFile(outputPath, `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`)
console.log(`UX/UI catalog generated for v${packageJson.version}: ${manifest.components.length} components, ${typographyStyles.length} typography styles.`)
