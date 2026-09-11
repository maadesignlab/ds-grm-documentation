import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const uiDirectory = path.join(root, "src/components/ui")
const registryPath = path.join(root, "src/components/registry.json")
const publicDirectory = path.join(root, "public/r")
const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"))
const packageVersions = { ...packageJson.dependencies, ...packageJson.devDependencies }

const figmaNodes = {
  accordion: "1771:909",
  alert: "1178:530",
  "alert-dialog": "1187:612",
  attachment: "2827:14904",
  avatar: "246:2681",
  badge: "186:141",
  breadcrumb: "1760:597",
  button: "1:24",
  "button-group": "3355:1262",
  calendar: "1521:3069",
  card: "1798:3431",
  carousel: "2782:1341",
  checkbox: "1:41",
  collapsible: "1771:929",
  combobox: "1:39",
  "context-menu": "1675:339",
  "data-table": "2366:19504",
  "date-picker": "1:35",
  drawer: "1290:302",
  "dropdown-menu": "1521:4708",
  empty: "2173:21188",
  field: "553:2675",
  "hover-card": "1650:2013",
  input: "1:34",
  "input-otp": "561:4282",
  item: "2190:1413",
  kbd: "2793:2325",
  label: "1:38",
  menubar: "2938:11449",
  "native-select": "553:7952",
  "navigation-menu": "2938:12924",
  pagination: "1763:1260",
  popover: "726:6350",
  progress: "2206:16412",
  "radio-group": "1:41",
  resizable: "2882:453",
  "scroll-area": "1800:1860",
  select: "614:4917",
  separator: "589:983",
  sheet: "1295:386",
  sidebar: "3114:1373",
  slider: "2772:1030",
  spinner: "2206:19380",
  switch: "1:41",
  table: "2064:259",
  tabs: "1:33",
  toast: "1:45",
  toggle: "3267:2627",
  "toggle-group": "3331:60517",
  tooltip: "1:30",
}

const titleFromSlug = (slug) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

const files = await readdir(uiDirectory)
const documented = files
  .filter((file) => file.endsWith(".stories.tsx"))
  .map((file) => file.replace(".stories.tsx", ""))
  .sort((a, b) => a.localeCompare(b))

const documentedSet = new Set(documented)
const supporting = files
  .filter((file) => file.endsWith(".tsx") || file.endsWith(".ts"))
  .filter((file) => !file.endsWith(".stories.tsx"))
  .filter((file) => !file.endsWith("-docs.tsx"))
  .filter((file) => !file.endsWith("-example.tsx"))
  .map((file) => file.replace(/\.tsx?$/, ""))
  .filter((name) => !documentedSet.has(name))
  .filter((name) => name !== "index")
  .filter((name) => name !== "selectable-docs-shared")
  .sort((a, b) => a.localeCompare(b))
const registryNames = new Set([...documented, ...supporting, "use-mobile"])

const storyTitles = Object.fromEntries(await Promise.all(documented.map(async (name) => {
  const story = await readFile(path.join(uiDirectory, `${name}.stories.tsx`), "utf8")
  const title = story.match(/title:\s*["']Components\/([^"']+)["']/)?.[1]
  return [name, title ?? titleFromSlug(name)]
})))

function packageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/")
  return specifier.split("/")[0]
}

function parseImports(content) {
  return [...content.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1])
}

function resolveInternalDependency(specifier) {
  const alias = specifier.match(/^@\/components\/ui\/(.+)$/)?.[1]
  const hook = specifier.match(/^@\/hooks\/(.+)$/)?.[1]
  const relative = specifier.match(/^\.\/(.+)$/)?.[1]
  const name = (alias ?? hook ?? relative)?.replace(/\.(tsx?|jsx?)$/, "")
  return name && registryNames.has(name) ? name : null
}

async function componentItem(name) {
  const hasPrimitive = files.includes(`${name}.tsx`)
  const hasLibrary = files.includes(`${name}.ts`)
  const sourceFile = hasPrimitive ? `${name}.tsx` : hasLibrary ? `${name}.ts` : `${name}-example.tsx`
  const sourcePath = `src/components/ui/${sourceFile}`
  const content = await readFile(path.join(root, sourcePath), "utf8")
  const imports = parseImports(content)
  const registryDependencies = ["@grm/grm-base"]

  for (const specifier of imports) {
    const dependency = resolveInternalDependency(specifier)
    if (dependency && dependency !== name) registryDependencies.push(`@grm/${dependency}`)
  }

  const dependencies = imports
    .filter((specifier) => !specifier.startsWith(".") && !specifier.startsWith("@/"))
    .map(packageName)
    .filter((dependency) => dependency !== "react" && dependency !== "react-dom")
    .filter((dependency, index, values) => values.indexOf(dependency) === index)
    .map((dependency) => packageVersions[dependency] ? `${dependency}@${packageVersions[dependency]}` : dependency)

  return {
    name,
    type: hasPrimitive ? "registry:ui" : hasLibrary ? "registry:lib" : "registry:block",
    title: storyTitles[name] ?? titleFromSlug(name),
    description: documentedSet.has(name)
      ? `${storyTitles[name]} GRM basado en shadcn/ui, tokens de marca y la referencia canónica de Storybook.`
      : `${titleFromSlug(name)} requerido como soporte por los componentes públicos GRM.`,
    registryDependencies: [...new Set(registryDependencies)].sort(),
    ...(dependencies.length ? { dependencies: dependencies.sort() } : {}),
    files: [{
      path: sourcePath,
      type: hasPrimitive ? "registry:ui" : hasLibrary ? "registry:lib" : "registry:block",
      ...(hasLibrary ? { target: sourcePath } : {}),
    }],
  }
}

async function hookItem() {
  const sourcePath = "src/hooks/use-mobile.ts"
  const content = await readFile(path.join(root, sourcePath), "utf8")
  const dependencies = parseImports(content)
    .filter((specifier) => specifier !== "react")
    .map(packageName)
    .filter((dependency, index, values) => values.indexOf(dependency) === index)
    .map((dependency) => packageVersions[dependency] ? `${dependency}@${packageVersions[dependency]}` : dependency)

  return {
    name: "use-mobile",
    type: "registry:hook",
    title: "Use Mobile",
    description: "Hook responsive requerido por Sidebar.",
    ...(dependencies.length ? { dependencies } : {}),
    files: [{ path: sourcePath, type: "registry:hook" }],
  }
}

const items = await Promise.all([...documented, ...supporting].map(componentItem))
items.push(await hookItem())
const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "grm",
  homepage: "https://github.com/maadesignlab/ds-grm-documentation",
  items: [
    {
      name: "grm-base",
      type: "registry:style",
      title: "GRM Base",
      description: "Tokens, tipografías, marcas y utilidades compartidas del Design System GRM.",
      dependencies: [
        `@fontsource-variable/inter@${packageVersions["@fontsource-variable/inter"]}`,
        `@fontsource-variable/jetbrains-mono@${packageVersions["@fontsource-variable/jetbrains-mono"]}`,
        `@fontsource-variable/kantumruy-pro@${packageVersions["@fontsource-variable/kantumruy-pro"]}`,
        `@fontsource-variable/plus-jakarta-sans@${packageVersions["@fontsource-variable/plus-jakarta-sans"]}`,
        `clsx@${packageVersions.clsx}`,
        `tailwind-merge@${packageVersions["tailwind-merge"]}`,
        `tw-animate-css@${packageVersions["tw-animate-css"]}`,
        `shadcn@${packageVersions.shadcn}`,
      ],
      files: [
        { path: "src/styles/grm.css", type: "registry:style", target: "src/styles/grm.css" },
        { path: "src/styles/tokens.css", type: "registry:style", target: "src/styles/tokens.css" },
        { path: "src/lib/utils.ts", type: "registry:lib", target: "src/lib/utils.ts" },
        { path: "src/lib/brand-theme.ts", type: "registry:lib", target: "src/lib/brand-theme.ts" },
      ],
    },
    ...items,
  ],
}

const figmaBase = "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1"
const manifest = {
  schemaVersion: 1,
  designSystem: { name: "Design System GRM", version: packageJson.version },
  sources: {
    contract: "DESIGN_SYSTEM_WORKFLOW.md",
    figma: figmaBase,
    registry: "/r/registry.json",
    storybookIndex: "/index.json",
  },
  priority: ["shadcn/ui", "Figma", "GRM extensions"],
  canonicalRendering: "Playground",
  brands: ["grm-global", "reina-madre", "maria-linda", "piel-sana"],
  constraints: [
    "Use public GRM components instead of recreating them with HTML.",
    "Use Tailwind CSS and semantic variables; do not hardcode colors or visual CSS values.",
    "Do not use !important.",
    "Treat component examples as compositions, not new primitive variants.",
    "Keep generated screens responsive and preserve accessible component behavior.",
  ],
  components: documented.map((name) => ({
    name: storyTitles[name],
    slug: name,
    kind: files.includes(`${name}.tsx`) ? "component" : "block",
    registry: `/r/${name}.json`,
    figmaNode: figmaNodes[name],
    figma: `${figmaBase}?node-id=${figmaNodes[name].replace(":", "-")}`,
    storybookTitle: `Components/${titleFromSlug(name)}`,
    implementation: files.includes(`${name}.tsx`) ? `src/components/ui/${name}.tsx` : null,
    example: `src/components/ui/${name}-example.tsx`,
    docs: `src/components/ui/${name}.mdx`,
  })),
}

await mkdir(publicDirectory, { recursive: true })
await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
await writeFile(path.join(publicDirectory, "ai-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`)

console.log(`Registry source generated with ${documented.length} documented components and ${supporting.length + 1} support items.`)
