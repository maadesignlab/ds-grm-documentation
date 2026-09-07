"use client"

import {
  NavigationMenu, NavigationMenuContent, NavigationMenuIndicator,
  NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle,
} from "./navigation-menu"

export type NavigationMenuExampleProps = {
  itemCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  layout?: "list" | "featured"
  viewport?: boolean
  defaultOpen?: boolean
  activeItem?: number
  lastItemType?: "dropdown" | "link"
  disabledItem?: number | "none"
}

export const navigationMenuPlaygroundArgs = {
  itemCount: 3,
  layout: "list",
  viewport: true,
  defaultOpen: false,
  activeItem: 1,
  lastItemType: "dropdown",
  disabledItem: "none",
} as const satisfies NavigationMenuExampleProps

export const navigationMenuExamplePresets = {
  playground: navigationMenuPlaygroundArgs,
  closed: { ...navigationMenuPlaygroundArgs },
  open: { ...navigationMenuPlaygroundArgs, defaultOpen: true },
  list: { ...navigationMenuPlaygroundArgs, defaultOpen: true, layout: "list" },
  featured: { ...navigationMenuPlaygroundArgs, defaultOpen: true, layout: "featured" },
  withoutViewport: { ...navigationMenuPlaygroundArgs, defaultOpen: true, viewport: false },
  one: { ...navigationMenuPlaygroundArgs, itemCount: 1 },
  three: { ...navigationMenuPlaygroundArgs, itemCount: 3 },
  six: { ...navigationMenuPlaygroundArgs, itemCount: 6 },
  ten: { ...navigationMenuPlaygroundArgs, itemCount: 10 },
  link: { ...navigationMenuPlaygroundArgs, lastItemType: "link" },
} as const satisfies Record<string, NavigationMenuExampleProps>

const items = ["Servicios", "Pacientes", "Agenda", "Órdenes", "Resultados", "Sedes", "Recursos", "Equipo", "Reportes", "Ayuda"] as const
const links = [
  { title: "Citas", description: "Agenda y seguimiento de consultas." },
  { title: "Pacientes", description: "Perfiles e historias clínicas." },
  { title: "Órdenes", description: "Resultados, estudios y solicitudes." },
  { title: "Facturación", description: "Pagos y estados de cuenta." },
] as const

function ContentLink({ title, description, active = false }: { title: string; description: string; active?: boolean }) {
  return <NavigationMenuLink asChild active={active}>
    <a href={`#${title.toLowerCase()}`} onClick={event => event.preventDefault()} className="h-[60px] w-full items-start bg-background">
      <span className="text-sm leading-5 font-medium">{title}</span>
      <span className="text-xs leading-4 font-normal text-muted-foreground">{description}</span>
    </a>
  </NavigationMenuLink>
}

function NavigationContent({ layout }: { layout: "list" | "featured" }) {
  if (layout === "featured") {
    return <div className="grid h-[180px] w-[500px] grid-cols-[190px_300px] gap-2">
      <NavigationMenuLink asChild>
        <a href="#servicios" onClick={event => event.preventDefault()} className="h-[180px] justify-end gap-2 rounded-lg bg-accent p-4">
          <span className="text-base leading-6 font-medium text-accent-foreground">Servicios GRM</span>
          <span className="text-xs leading-4 font-normal text-muted-foreground">Accede a la atención y gestión clínica.</span>
        </a>
      </NavigationMenuLink>
      <div className="grid w-[300px] gap-1">{links.slice(0, 3).map(link => <ContentLink key={link.title} {...link} />)}</div>
    </div>
  }

  return <div className="grid w-[380px] gap-1">{links.map((link, index) => <ContentLink key={link.title} {...link} active={index === 0} />)}</div>
}

export function NavigationMenuExample({
  itemCount = 3,
  layout = "list",
  viewport = true,
  defaultOpen = false,
  activeItem = 1,
  lastItemType = "dropdown",
  disabledItem = "none",
}: NavigationMenuExampleProps) {
  const visibleItems = items.slice(0, itemCount)
  const safeActive = Math.min(Math.max(activeItem, 1), itemCount) - 1
  const openValue = lastItemType === "link" && safeActive === itemCount - 1 ? undefined : `item-${safeActive + 1}`

  return (
    <NavigationMenu viewport={viewport} defaultValue={defaultOpen ? openValue : undefined}>
      <NavigationMenuList>
        {visibleItems.map((label, index) => {
          const isLink = lastItemType === "link" && index === visibleItems.length - 1
          if (isLink) return <NavigationMenuItem key={label} value={`item-${index + 1}`}>
            <NavigationMenuLink asChild active={safeActive === index}>
              <a href={`#${label.toLowerCase()}`} onClick={event => event.preventDefault()} className={navigationMenuTriggerStyle()}>{label}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          return <NavigationMenuItem key={label} value={`item-${index + 1}`}>
            <NavigationMenuTrigger disabled={disabledItem === index + 1}>{label}</NavigationMenuTrigger>
            <NavigationMenuContent className={layout === "featured" ? "w-[520px]" : "w-[400px]"}>
              <NavigationContent layout={layout} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        })}
        <NavigationMenuIndicator />
      </NavigationMenuList>
    </NavigationMenu>
  )
}
