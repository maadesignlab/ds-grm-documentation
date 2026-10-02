"use client"

import { Fragment } from "react"
import { AArrowDown, CircleCheck, TriangleAlert, CircleX, Info, ChevronRight, ExternalLink, ImageIcon, Plus } from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "./avatar"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "./item"

import { cn } from "@/lib/utils"
import { itemAppearanceClasses, itemBaseVariant, type ItemAppearance, type ItemStatus } from "./item-appearance"

export type ItemExampleProps = {
  composition?: "single" | "list" | "grid"
  pattern?: "basic" | "group" | "header" | "link" | "dropdown"
  appearance?: ItemAppearance
  status?: ItemStatus
  showTrailing?: boolean
  size?: "default" | "sm" | "xs"
  layout?: "default" | "compact" | "stacked"
  leading?: "none" | "icon" | "avatar" | "avatarGroup" | "image"
  trailing?: "none" | "button" | "icon" | "iconButton" | "time"
  description?: boolean
  itemCount?: 2 | 3 | 4 | 5
}

export const itemPlaygroundArgs = {
  composition: "single",
  pattern: "basic",
  appearance: "default",
  status: "neutral",
  showTrailing: true,
  size: "default",
  layout: "default",
  leading: "icon",
  trailing: "button",
  description: true,
  itemCount: 2,
} as const satisfies ItemExampleProps

export const itemExamplePresets = {
  playground: itemPlaygroundArgs,
  default: { ...itemPlaygroundArgs },
  outline: { ...itemPlaygroundArgs, appearance: "outline" },
  muted: { ...itemPlaygroundArgs, appearance: "muted" },
  light: { ...itemPlaygroundArgs, appearance: "light" },
  sizeDefault: { ...itemPlaygroundArgs, appearance: "outline", size: "default", leading: "image", description: false, trailing: "icon" },
  sizeSm: { ...itemPlaygroundArgs, appearance: "outline", size: "sm", leading: "image", description: false, trailing: "icon" },
  sizeXs: { ...itemPlaygroundArgs, appearance: "outline", size: "xs", leading: "image", description: false, trailing: "icon" },
  icon: { ...itemPlaygroundArgs, appearance: "outline", leading: "icon", trailing: "button" },
  avatar: { ...itemPlaygroundArgs, appearance: "outline", leading: "avatar", trailing: "none" },
  image: { ...itemPlaygroundArgs, appearance: "outline", leading: "image", trailing: "time" },
  group: { ...itemPlaygroundArgs, pattern: "group", appearance: "default", leading: "none", trailing: "none", itemCount: 3 },
  header: { ...itemPlaygroundArgs, pattern: "header", appearance: "outline", leading: "none", trailing: "none" },
  link: { ...itemPlaygroundArgs, pattern: "link", appearance: "outline", leading: "icon", trailing: "icon" },
  dropdown: { ...itemPlaygroundArgs, pattern: "dropdown", appearance: "default", size: "sm", leading: "none", trailing: "none", description: false },
  iconIcon: { ...itemPlaygroundArgs, trailing: "icon" },
  avatarAction: { ...itemPlaygroundArgs, appearance: "outline", leading: "avatar", trailing: "iconButton" },
  avatarGroup: { ...itemPlaygroundArgs, appearance: "outline", leading: "avatarGroup" },
  time: { ...itemPlaygroundArgs, appearance: "outline", leading: "none", trailing: "time" },
  withoutDescription: { ...itemPlaygroundArgs, appearance: "outline", description: false, trailing: "icon" },
  compact: { ...itemPlaygroundArgs, appearance: "outline", layout: "compact", description: true, trailing: "icon" },
  stacked: { ...itemPlaygroundArgs, appearance: "outline", layout: "stacked", leading: "none", trailing: "none" },
  list: { ...itemPlaygroundArgs, composition: "list", appearance: "outline", itemCount: 2 },
  grid: { ...itemPlaygroundArgs, composition: "grid", appearance: "outline", layout: "stacked", leading: "none", trailing: "none", itemCount: 2 },
} as const satisfies Record<string, ItemExampleProps>

function Leading({ type, status }: { type: NonNullable<ItemExampleProps["leading"]>; status: ItemStatus }) {
  const Icon = { neutral: AArrowDown, success: CircleCheck, warning: TriangleAlert, error: CircleX, info: Info }[status]
  if (type === "icon") return <ItemMedia variant="icon"><Icon aria-hidden /></ItemMedia>
  if (type === "avatar") return <ItemMedia><Avatar size="lg"><AvatarImage src="/avatar/profile.png" alt="Perfil de Fernanda Jiménez" /><AvatarFallback>FJ</AvatarFallback></Avatar></ItemMedia>
  if (type === "avatarGroup") return <ItemMedia><AvatarGroup><Avatar size="sm"><AvatarFallback>FJ</AvatarFallback></Avatar><Avatar size="sm"><AvatarFallback>AM</AvatarFallback></Avatar><AvatarGroupCount>+3</AvatarGroupCount></AvatarGroup></ItemMedia>
  if (type === "image") return <ItemMedia variant="image"><Image src="/scroll-area/coacalco.jpeg" alt="Clínica Reina Madre Coacalco" width={40} height={40} /></ItemMedia>
  return null
}

function Trailing({ type }: { type: NonNullable<ItemExampleProps["trailing"]> }) {
  if (type === "button") return <ItemActions><Button size="sm">Button</Button></ItemActions>
  if (type === "icon") return <ItemActions><ChevronRight aria-hidden className="size-4 text-muted-foreground" /></ItemActions>
  if (type === "iconButton") return <ItemActions><Button variant="outline" size="icon-sm" className="rounded-full" aria-label="Agregar"><Plus aria-hidden /></Button></ItemActions>
  if (type === "time") return <ItemActions><time className="text-sm leading-5 text-muted-foreground">8:00</time></ItemActions>
  return null
}

type SingleItemProps = Required<Omit<ItemExampleProps, "composition" | "itemCount" | "pattern">> & { index?: number }

function SingleItem({ appearance, status, showTrailing, size, layout, leading, trailing, description, index = 0 }: SingleItemProps) {
  if (layout === "stacked") {
    return (
      <Item variant={itemBaseVariant(appearance)} size={size} className={cn("w-[182px]", itemAppearanceClasses(appearance, status))}>
        <ItemHeader>
          <div
            role="img"
            aria-label="Imagen de cabecera"
            className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-muted/60 text-muted-foreground"
          >
            <ImageIcon aria-hidden className="size-6" strokeWidth={1.5} />
          </div>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Título del ítem{index ? ` ${index + 1}` : ""}</ItemTitle>
          {description ? <ItemDescription>Descripción breve que aporta contexto adicional.</ItemDescription> : null}
        </ItemContent>
      </Item>
    )
  }

  return (
    <Item variant={itemBaseVariant(appearance)} size={size} className={cn(itemAppearanceClasses(appearance, status), layout === "compact" && description && "px-2.5 py-2 [&_[data-slot=item-description]]:text-xs [&_[data-slot=item-description]]:leading-4")}>
      <Leading type={leading} status={status} />
      <ItemContent>
        <ItemTitle>Título del ítem{index ? ` ${index + 1}` : ""}</ItemTitle>
        {description ? <ItemDescription>Descripción breve que aporta contexto adicional.</ItemDescription> : null}
      </ItemContent>
      {showTrailing && <Trailing type={trailing} />}
    </Item>
  )
}

function HeaderGroup({ appearance, size, status, showTrailing }: Pick<SingleItemProps, "appearance" | "size" | "status" | "showTrailing">) {
  return (
    <ItemGroup className="grid w-auto grid-cols-3 gap-4">
      {Array.from({ length: 3 }, (_, index) => (
        <SingleItem key={index} appearance={appearance} status={status} showTrailing={showTrailing} size={size} layout="stacked" leading="none" trailing="none" description index={index} />
      ))}
    </ItemGroup>
  )
}

function OfficialItemGroup() {
  const people = [
    { username: "fernanda", initials: "FJ", email: "fernanda@grm.com" },
    { username: "andrea", initials: "AM", email: "andrea@grm.com" },
    { username: "laura", initials: "LC", email: "laura@grm.com" },
  ]

  return (
    <div className="w-[448px] max-w-full">
      <ItemGroup>
        {people.map((person, index) => (
          <Fragment key={person.username}>
            <Item>
              <ItemMedia><Avatar><AvatarFallback>{person.initials}</AvatarFallback></Avatar></ItemMedia>
              <ItemContent className="gap-1"><ItemTitle>{person.username}</ItemTitle><ItemDescription>{person.email}</ItemDescription></ItemContent>
              <ItemActions><Button variant="ghost" size="icon" className="rounded-full" aria-label={`Agregar a ${person.username}`}><Plus aria-hidden /></Button></ItemActions>
            </Item>
            {index !== people.length - 1 ? <ItemSeparator /> : null}
          </Fragment>
        ))}
      </ItemGroup>
    </div>
  )
}

function LinkItem({ appearance, size, status }: Pick<SingleItemProps, "appearance" | "size" | "status">) {
  return <div className="w-[511px] max-w-full"><Item render={<a href="#item-documentation" onClick={event => event.preventDefault()} />} variant={itemBaseVariant(appearance)} className={itemAppearanceClasses(appearance, status)} size={size}><ItemMedia variant="icon"><ExternalLink aria-hidden /></ItemMedia><ItemContent><ItemTitle>Visitar documentación</ItemTitle><ItemDescription>Conoce cómo implementar el componente.</ItemDescription></ItemContent><ItemActions><ChevronRight aria-hidden className="size-4" /></ItemActions></Item></div>
}

function DropdownItem() {
  const items = ["default-1", "default-2", "default-3"]

  return (
    <div className="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button className="w-fit">Ajustes</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-44" align="end">
          {items.map(item => (
            <DropdownMenuItem key={item} className="p-0">
              <Item size="sm" className="w-full gap-2 px-1.5 py-1">
                <ItemMedia>
                  <Avatar className="size-7">
                    <AvatarImage src="/avatar/profile.png" alt="Perfil" />
                    <AvatarFallback>DV</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle>Default Variant</ItemTitle>
                  <ItemDescription className="text-xs leading-4">Standard styling</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function ItemExample({
  composition = "single", pattern = "basic", appearance = "default", status = "neutral", showTrailing = true, size = "default", layout = "default", leading = "icon",
  trailing = "button", description = true, itemCount = 2,
}: ItemExampleProps) {
  const resolvedLayout = composition === "grid" ? "stacked" : composition === "list" ? "default" : layout
  const resolvedLeading = resolvedLayout === "stacked" ? "none" : leading
  const resolvedTrailing = resolvedLayout === "stacked" ? "none" : trailing
  const item = (index: number) => <SingleItem key={index} appearance={appearance} status={status} showTrailing={showTrailing} size={size} layout={resolvedLayout} leading={resolvedLeading} trailing={resolvedTrailing} description={description} index={index} />

  if (composition === "single" && pattern === "header") return <HeaderGroup appearance={appearance} status={status} showTrailing={showTrailing} size={size} />
  if (composition === "single" && pattern === "group") return <OfficialItemGroup />
  if (composition === "single" && pattern === "link") return <LinkItem appearance={appearance} status={status} size={size} />
  if (composition === "single" && pattern === "dropdown") return <DropdownItem />
  if (composition === "single") return <div className={resolvedLayout === "stacked" ? undefined : "w-[511px] max-w-full"}>{item(0)}</div>
  return <ItemGroup className={composition === "grid" ? "w-auto flex-row items-start" : "w-[511px] max-w-full"}>{Array.from({ length: itemCount }, (_, index) => item(index))}</ItemGroup>
}
