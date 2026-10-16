"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const AnchorContext = React.createContext<{
  anchor: HTMLElement | null
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>
} | null>(null)

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null)
  const value = React.useMemo(() => ({ anchor, setAnchor }), [anchor])
  return <AnchorContext.Provider value={value}><PopoverPrimitive.Root data-slot="popover" {...props} /></AnchorContext.Provider>
}

function PopoverAnchor({ asChild = false, ref, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const context = React.useContext(AnchorContext)
  const setAnchor = context?.setAnchor
  const anchorRef = React.useCallback((element: HTMLDivElement | null) => {
    setAnchor?.(element)
    const cleanup = typeof ref === "function" ? ref(element) : undefined
    if (ref && typeof ref !== "function") ref.current = element
    return () => {
      setAnchor?.(null)
      if (typeof cleanup === "function") cleanup()
      else if (typeof ref === "function") ref(null)
      else if (ref) ref.current = null
    }
  }, [ref, setAnchor])
  if (!context) throw new Error("PopoverAnchor must be inside Popover")
  const Comp = asChild ? Slot.Root : "div"
  return <Comp data-slot="popover-anchor" ref={anchorRef} {...props} />
}

function PopoverTrigger({ asChild = false, children, render, ...props }: PopoverPrimitive.Trigger.Props & { asChild?: boolean }) {
  if (asChild && render) throw new Error("Use either asChild or render on PopoverTrigger, not both")
  if (asChild && (!React.isValidElement(children) || children.type === React.Fragment)) {
    throw new Error("PopoverTrigger asChild requires one non-Fragment React element")
  }
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} render={asChild ? children as React.ReactElement : render}>{asChild ? undefined : children}</PopoverPrimitive.Trigger>
}

type FocusTarget = PopoverPrimitive.Popup.Props["initialFocus"]
// The compatibility event is cancelable; Base UI still owns focus timing and movement.
function compatibilityFocus(handler: ((event: Event) => void) | undefined, target: FocusTarget, name: string): FocusTarget {
  if (!handler) return target
  return (interaction) => {
    const event = new Event(name, { cancelable: true })
    handler(event)
    if (event.defaultPrevented) return false
    return typeof target === "function" ? target(interaction) : target && typeof target === "object" ? target.current : target ?? true
  }
}

function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, container, anchor, collisionPadding, onOpenAutoFocus, onCloseAutoFocus, initialFocus, finalFocus, ...props }: PopoverPrimitive.Popup.Props & { container?: PopoverPrimitive.Portal.Props["container"]; onOpenAutoFocus?: (event: Event) => void; onCloseAutoFocus?: (event: Event) => void } & Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "anchor" | "collisionPadding">) {
  const context = React.useContext(AnchorContext)
  return (
    <PopoverPrimitive.Portal container={container}>
      <PopoverPrimitive.Positioner anchor={anchor !== undefined ? anchor : context?.anchor ?? undefined} collisionPadding={collisionPadding} align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className="isolate z-50">
        <PopoverPrimitive.Popup initialFocus={compatibilityFocus(onOpenAutoFocus, initialFocus, "openAutoFocus")} finalFocus={compatibilityFocus(onCloseAutoFocus, finalFocus, "closeAutoFocus")} data-slot="popover-content" className={cn("z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 font-sans text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)} {...props} />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-header" className={cn("flex flex-col gap-0.5 text-sm", className)} {...props} />
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return <PopoverPrimitive.Title data-slot="popover-title" className={cn("font-medium", className)} {...props} />
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return <PopoverPrimitive.Description data-slot="popover-description" className={cn("text-muted-foreground", className)} {...props} />
}

export { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger }
