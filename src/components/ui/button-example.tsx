import type { ComponentProps } from "react"
import { Loader2, Plus } from "lucide-react"

import { Button } from "./button"

export type ButtonState = "normal" | "loading" | "disabled"
export type ButtonTextSize = "default" | "xs" | "sm" | "lg"
export type ButtonIconSize = "icon" | "icon-xs" | "icon-sm"
export type ButtonContentPlacement = "none" | "left" | "right"
export type ButtonIconRoundness = "semiSquared" | "full"

type SharedButtonProps = Omit<ComponentProps<typeof Button>, "size">

export type ButtonTextExampleProps = SharedButtonProps & {
  state?: ButtonState
  size?: ButtonTextSize
  contentPlacement?: ButtonContentPlacement
}

export type ButtonIconExampleProps = Omit<SharedButtonProps, "children"> & {
  state?: ButtonState
  size?: ButtonIconSize
  roundness?: ButtonIconRoundness
}

function Marker({ loading }: { loading: boolean }) {
  return loading ? <Loader2 className="animate-spin" aria-hidden /> : <Plus aria-hidden />
}

export function ButtonTextExample({ state = "normal", size = "default", contentPlacement = "none", disabled, children = "Button", ...props }: ButtonTextExampleProps) {
  const loading = state === "loading"
  const marker = <span aria-hidden className="inline-flex size-4 shrink-0 items-center justify-center"><Marker loading={loading} /></span>

  return (
    <Button {...props} size={size} disabled={state === "disabled" || loading || disabled} aria-busy={loading || undefined} className="w-fit">
      {contentPlacement === "left" && marker}
      {children}
      {contentPlacement === "right" && marker}
    </Button>
  )
}

export function ButtonIconExample({ state = "normal", size = "icon", roundness = "semiSquared", disabled, ...props }: ButtonIconExampleProps) {
  const loading = state === "loading"

  return (
    <Button {...props} size={size} disabled={state === "disabled" || loading || disabled} aria-label={props["aria-label"] ?? "Button icono"} aria-busy={loading || undefined} className={roundness === "full" ? "rounded-full" : undefined}>
      <span aria-hidden className="inline-flex shrink-0 items-center justify-center"><Marker loading={loading} /></span>
    </Button>
  )
}
