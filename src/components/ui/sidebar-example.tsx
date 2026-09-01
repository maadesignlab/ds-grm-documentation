"use client"

import * as React from "react"
import Image from "next/image"
import {
  BadgeCheck,
  Banknote,
  BriefcaseMedical,
  Building2,
  ChevronDown,
  ClipboardList,
  Database,
  FileClock,
  FileText,
  HeartPulse,
  Home,
  Hospital,
  LayoutDashboard,
  MapPinned,
  Scale,
  Settings,
  ShieldCheck,
  Tags,
  TicketPercent,
  UserCog,
  Users,
  WalletCards,
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
import { TooltipProvider } from "./tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar"

type NavigationItem = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  children?: { label: string; icon: React.ComponentType<{ className?: string }> }[]
}

const navigationGroups: { label: string; items: NavigationItem[] }[] = [
  { label: "Operación", items: [{ label: "Pacientes", icon: Users, children: [{ label: "Directorio", icon: Users }, { label: "Historia clínica", icon: FileText }] }] },
  { label: "Comercial y finanzas", items: [{ label: "Reina Wallet", icon: WalletCards }, { label: "Conciliación", icon: Scale }] },
  { label: "Catálogos", items: [{ label: "Servicios", icon: BriefcaseMedical }, { label: "Planes de salud", icon: HeartPulse }, { label: "Membresías", icon: BadgeCheck }, { label: "Cupones", icon: TicketPercent }, { label: "Tipos de venta", icon: Tags }] },
  { label: "Personal", items: [{ label: "Staff", icon: UserCog, children: [{ label: "Directorio de staff", icon: Users }, { label: "Roles", icon: ShieldCheck }] }, { label: "Solicitudes", icon: ClipboardList, children: [{ label: "Pendientes", icon: FileClock }, { label: "Historial", icon: FileText }] }, { label: "Honorarios", icon: Banknote }] },
  { label: "Sucursales", items: [{ label: "Regiones", icon: MapPinned }, { label: "Entidades legales", icon: Building2 }, { label: "Sucursales", icon: Hospital }] },
  { label: "Ajustes", items: [{ label: "Ajustes", icon: Settings }, { label: "Permisos de acceso", icon: ShieldCheck }, { label: "Migración", icon: Database }] },
]

export type SidebarExampleProps = {
  state?: "expanded" | "collapsed"
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  activeItem?: string
  expandedGroups?: boolean
  showInset?: boolean
  className?: string
}

function NavigationButton({ item, activeItem, expandedGroups }: { item: NavigationItem; activeItem: string; expandedGroups: boolean }) {
  const Icon = item.icon

  if (!item.children) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={item.label} isActive={activeItem === item.label}>
          <Icon /><span>{item.label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Collapsible asChild defaultOpen={expandedGroups} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.label} isActive={activeItem === item.label} className="group-data-[collapsible=icon]:group-data-[state=open]/collapsible:rounded-b-none group-data-[collapsible=icon]:group-data-[state=open]/collapsible:bg-sidebar-accent">
            <Icon /><span>{item.label}</span>
            <ChevronDown className="ml-auto size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map(({ label, icon: ChildIcon }) => (
              <SidebarMenuSubItem key={label}>
                <SidebarMenuSubButton href="#"><ChildIcon /><span>{label}</span></SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function SidebarExample({
  state = "expanded",
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
  activeItem = "",
  expandedGroups = false,
  showInset = true,
  className,
}: SidebarExampleProps) {
  const [open, setOpen] = React.useState(state === "expanded")

  return (
    <TooltipProvider>
      <SidebarProvider open={open} onOpenChange={setOpen} className={className}>
        <Sidebar side={side} variant={variant} collapsible={collapsible}>
          <SidebarHeader>
            <div className="flex min-w-0 items-center justify-between">
              <Image
                src="/grm-sidebar-logo.svg"
                alt="Grupo Reina Madre"
                width={193}
                height={26}
                priority
                className="h-[26px] w-[193px] shrink-0 group-data-[collapsible=icon]:hidden"
              />
              <SidebarTrigger className="shrink-0 border border-border bg-background shadow-xs hover:bg-[var(--background-hover)]" />
            </div>
          </SidebarHeader>

          <div className="shrink-0 px-2 pt-2">
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem><SidebarMenuButton tooltip="Inicio" isActive={activeItem === "Inicio"}><Home /><span>Inicio</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton tooltip="Dashboard" isActive={activeItem === "Dashboard"}><LayoutDashboard /><span>Dashboard</span></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </div>

          <SidebarContent className="pb-5">
            {navigationGroups.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => <NavigationButton key={item.label} item={item} activeItem={activeItem} expandedGroups={expandedGroups} />)}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        {showInset && <SidebarInset className="items-center justify-center p-8 text-center text-muted-foreground"><p>Contenido principal</p></SidebarInset>}
      </SidebarProvider>
    </TooltipProvider>
  )
}
