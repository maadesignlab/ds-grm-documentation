"use client"

import { Crown, UserRound } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar"

export const avatarSizes = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96, 120] as const
export type AvatarDisplaySize = (typeof avatarSizes)[number]

export type AvatarExampleProps = {
  composition?: "single" | "group"
  content?: "image" | "text" | "icon"
  style?: "primary" | "secondary" | "muted" | "gradient"
  roundness?: "full" | "semiSquared"
  size?: AvatarDisplaySize
  initials?: string
  status?: "none" | "online" | "away" | "busy"
  border?: "default" | "success" | "warning" | "error" | "brand" | "white"
  services?: boolean
  groupQuantity?: 1 | 2 | 3 | 4
}

export const avatarPlaygroundArgs = {
  composition: "single",
  content: "image",
  style: "primary",
  roundness: "full",
  size: 80,
  initials: "FJ",
  status: "none",
  border: "default",
  services: false,
  groupQuantity: 4,
} as const satisfies AvatarExampleProps

export const avatarExamplePresets = {
  playground: avatarPlaygroundArgs,
  image: { ...avatarPlaygroundArgs, content: "image" },
  text: { ...avatarPlaygroundArgs, content: "text" },
  icon: { ...avatarPlaygroundArgs, content: "icon" },
  primary: { ...avatarPlaygroundArgs, content: "text", style: "primary" },
  secondary: { ...avatarPlaygroundArgs, content: "text", style: "secondary" },
  muted: { ...avatarPlaygroundArgs, content: "text", style: "muted" },
  gradient: { ...avatarPlaygroundArgs, content: "text", style: "gradient" },
  full: { ...avatarPlaygroundArgs, content: "text", roundness: "full" },
  semiSquared: { ...avatarPlaygroundArgs, content: "text", roundness: "semiSquared" },
  online: { ...avatarPlaygroundArgs, status: "online" },
  away: { ...avatarPlaygroundArgs, status: "away" },
  busy: { ...avatarPlaygroundArgs, status: "busy" },
  services: { ...avatarPlaygroundArgs, services: true },
  borderSuccess: { ...avatarPlaygroundArgs, border: "success" },
  borderWarning: { ...avatarPlaygroundArgs, border: "warning" },
  borderError: { ...avatarPlaygroundArgs, border: "error" },
  borderBrand: { ...avatarPlaygroundArgs, border: "brand" },
  group: { ...avatarPlaygroundArgs, composition: "group", groupQuantity: 4 },
} as const satisfies Record<string, AvatarExampleProps>

const sizeClasses: Record<AvatarDisplaySize, string> = {
  16: "size-4", 20: "size-5", 24: "size-6", 28: "size-7",
  32: "size-8", 36: "size-9", 40: "size-10", 48: "size-12", 56: "size-14",
  64: "size-16", 72: "size-[72px]", 80: "size-20", 96: "size-24", 120: "size-[120px]",
}
const textClasses: Record<AvatarDisplaySize, string> = {
  16: "text-[6px]", 20: "text-[8px]", 24: "text-[9px]", 28: "text-[10px]",
  32: "text-[10px]", 36: "text-[11px]", 40: "text-xs", 48: "text-sm", 56: "text-sm",
  64: "text-base", 72: "text-base", 80: "text-lg", 96: "text-xl", 120: "text-2xl",
}
const iconClasses: Record<AvatarDisplaySize, string> = {
  16: "size-2", 20: "size-2.5", 24: "size-3", 28: "size-3",
  32: "size-3.5", 36: "size-4", 40: "size-4", 48: "size-5", 56: "size-6",
  64: "size-6", 72: "size-7", 80: "size-8", 96: "size-10", 120: "size-12",
}
const statusBadgePixels: Record<AvatarDisplaySize, number> = {
  16: 6, 20: 6, 24: 6, 28: 10, 32: 10, 36: 10, 40: 12,
  48: 16, 56: 16, 64: 20, 72: 20, 80: 20, 96: 28, 120: 28,
}
const serviceBadgePixels: Record<AvatarDisplaySize, number | null> = {
  16: null, 20: null, 24: null, 28: null, 32: null, 36: 16, 40: 16,
  48: 16, 56: 20, 64: 20, 72: 20, 80: 28, 96: 28, 120: 28,
}
const squaredRadiusClasses: Record<AvatarDisplaySize, { root: string; child: string }> = {
  16: { root: "rounded-[4px] after:rounded-[4px]", child: "rounded-[4px]" }, 20: { root: "rounded-[4px] after:rounded-[4px]", child: "rounded-[4px]" },
  24: { root: "rounded-[6px] after:rounded-[6px]", child: "rounded-[6px]" }, 28: { root: "rounded-[6px] after:rounded-[6px]", child: "rounded-[6px]" },
  32: { root: "rounded-[6px] after:rounded-[6px]", child: "rounded-[6px]" }, 36: { root: "rounded-[6px] after:rounded-[6px]", child: "rounded-[6px]" },
  40: { root: "rounded-[8px] after:rounded-[8px]", child: "rounded-[8px]" }, 48: { root: "rounded-[8px] after:rounded-[8px]", child: "rounded-[8px]" },
  56: { root: "rounded-[8px] after:rounded-[8px]", child: "rounded-[8px]" }, 64: { root: "rounded-[12px] after:rounded-[12px]", child: "rounded-[12px]" },
  72: { root: "rounded-[12px] after:rounded-[12px]", child: "rounded-[12px]" }, 80: { root: "rounded-[12px] after:rounded-[12px]", child: "rounded-[12px]" },
  96: { root: "rounded-[12px] after:rounded-[12px]", child: "rounded-[12px]" }, 120: { root: "rounded-[12px] after:rounded-[12px]", child: "rounded-[12px]" },
}

const fallbackStyles = {
  primary: "bg-primary/10 text-[var(--primary-default-foreground)]",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
  gradient: "bg-gradient-to-b from-primary/15 to-secondary/40 text-foreground",
} as const

const borderStyles = {
  default: "after:border-border",
  success: "after:border-[var(--success-default-border)] after:border-2",
  warning: "after:border-[var(--warning-default-border)] after:border-2",
  error: "after:border-[var(--error-default-border)] after:border-2",
  brand: "after:border-primary after:border-2",
  white: "after:border-white after:border-2",
} as const

const statusStyles = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-error",
} as const

function SingleAvatar({
  content = "image", style = "primary", roundness = "full", size = 80,
  initials = "FJ", status = "none", border = "default", services = false,
}: Omit<AvatarExampleProps, "composition" | "groupQuantity">) {
  const squared = roundness === "semiSquared"
  const radius = squared ? squaredRadiusClasses[size] : { root: "rounded-full after:rounded-full", child: "rounded-full" }
  const serviceSize = serviceBadgePixels[size]

  return (
    <Avatar className={cn(sizeClasses[size], radius.root, borderStyles[border])}>
      {content === "image" ? (
        <AvatarImage src="/avatar/profile.png" alt="Perfil de Fernanda Jiménez" className={radius.child} />
      ) : (
        <AvatarFallback className={cn(
          "font-heading font-semibold leading-none",
          textClasses[size], fallbackStyles[style], radius.child
        )}>
          {content === "icon" ? <UserRound aria-hidden className={iconClasses[size]} /> : initials}
        </AvatarFallback>
      )}
      {status !== "none" ? (
        <AvatarBadge aria-label={`Estado: ${status}`} className={statusStyles[status]} style={{ width: statusBadgePixels[size], height: statusBadgePixels[size] }} />
      ) : null}
      {services && serviceSize ? (
        <span className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 -space-x-2.5" aria-label="Servicios asociados">
          <AvatarBadge className="bg-accent text-accent-foreground" style={{ position: "static", width: serviceSize, height: serviceSize }}><Crown aria-hidden style={{ width: serviceSize >= 28 ? 16 : serviceSize >= 20 ? 12 : 10, height: serviceSize >= 28 ? 16 : serviceSize >= 20 ? 12 : 10 }} /></AvatarBadge>
          <AvatarBadge className="bg-accent text-accent-foreground" style={{ position: "static", width: serviceSize, height: serviceSize }}><Crown aria-hidden style={{ width: serviceSize >= 28 ? 16 : serviceSize >= 20 ? 12 : 10, height: serviceSize >= 28 ? 16 : serviceSize >= 20 ? 12 : 10 }} /></AvatarBadge>
          <AvatarBadge className="bg-secondary text-secondary-foreground" style={{ position: "static", width: serviceSize, height: serviceSize }}><span className="text-[9px] font-semibold leading-none">+6</span></AvatarBadge>
        </span>
      ) : null}
    </Avatar>
  )
}

export function AvatarExample({
  composition = "single", groupQuantity = 4, ...props
}: AvatarExampleProps) {
  if (composition === "group") {
    return (
      <AvatarGroup className="-space-x-1.5">
        {Array.from({ length: Math.min(groupQuantity, 3) }, (_, index) => (
          <Avatar key={index} size="sm">
            <AvatarFallback className="!text-[9px] font-semibold leading-none">{["FJ", "AM", "LC"][index]}</AvatarFallback>
          </Avatar>
        ))}
        {groupQuantity === 4 ? <AvatarGroupCount className="size-6 bg-secondary text-[9px] font-semibold leading-none text-secondary-foreground">+6</AvatarGroupCount> : null}
      </AvatarGroup>
    )
  }

  return <SingleAvatar {...props} />
}
