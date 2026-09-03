"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

export type ToastData = {
  showClose?: boolean
  showIcon?: boolean
}

const toast = ToastPrimitive.createToastManager<ToastData>()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-50 mx-auto w-auto max-w-[356px] outline-none sm:right-4 sm:left-auto sm:mx-0 sm:w-full",
        className
      )}
      {...props}
    />
  )
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom rounded-2xl border border-border bg-card text-foreground shadow-[0_4px_12px_rgb(0_0_0/10%)] will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[compact]:!h-[54px]",
        "data-[type=success]:border-[var(--success-light-border)] data-[type=success]:bg-[var(--success-light)] data-[type=success]:text-[var(--success-light-foreground)]",
        "data-[type=warning]:border-[var(--warning-light-border)] data-[type=warning]:bg-[var(--warning-light)] data-[type=warning]:text-[var(--warning-light-foreground)]",
        "data-[type=error]:border-[var(--error-light-border)] data-[type=error]:bg-[var(--error-light)] data-[type=error]:text-[var(--error-light-foreground)]",
        "data-[type=info]:border-[var(--info-light-border)] data-[type=info]:bg-[var(--info-light)] data-[type=info]:text-[var(--info-light-foreground)]",
        "data-[type=brand-neutral]:bg-background data-[type=neutral]:bg-card",
        "[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
        "h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        className
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return <ToastPrimitive.Content data-slot="toast-content" className={cn("flex min-h-[52px] items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100", className)} {...props} />
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return <ToastPrimitive.Title data-slot="toast-title" className={cn("!m-0 !border-0 !p-0 !text-[13px] !leading-[19.5px] !font-medium", className)} {...props} />
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return <ToastPrimitive.Description data-slot="toast-description" className={cn("!m-0 !p-0 !text-xs !leading-[18px] text-current/72", className)} {...props} />
}

function ToastAction({ className, render = <Button variant="outline" size="sm" />, ...props }: ToastPrimitive.Action.Props) {
  return <ToastPrimitive.Action data-slot="toast-action" render={render} className={cn("shrink-0", className)} {...props} />
}

function ToastClose({ className, children, render = <Button variant="ghost" size="icon-sm" />, ...props }: ToastPrimitive.Close.Props) {
  return <ToastPrimitive.Close data-slot="toast-close" aria-label="Cerrar notificación" render={render} className={cn("relative shrink-0 text-current/72 after:absolute after:-inset-2 after:content-[''] hover:text-current", className)} {...props}>{children ?? <XIcon aria-hidden="true" />}</ToastPrimitive.Close>
}

function ToastIcon({ type }: { type: string | undefined }) {
  const icons: Record<string, React.ReactNode> = {
    success: <CircleCheckIcon />,
    info: <InfoIcon />,
    warning: <TriangleAlertIcon />,
    error: <CircleXIcon />,
    loading: <Loader2Icon className="animate-spin" />,
    "brand-neutral": <CircleCheckIcon />,
    neutral: <CircleCheckIcon />,
  }
  const icon = type ? icons[type] : null
  return icon ? <span data-slot="toast-icon" className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4">{icon}</span> : null
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager<ToastData>()
  return toasts.map(toastItem => (
    <Toast key={toastItem.id} toast={toastItem} data-compact={!toastItem.description && !toastItem.actionProps && !toastItem.data?.showClose ? "" : undefined}>
      <ToastContent>
        {toastItem.data?.showIcon !== false && <ToastIcon type={toastItem.type} />}
        <div className="flex min-w-0 flex-1 flex-col gap-1"><ToastTitle /><ToastDescription /></div>
        <ToastAction />
        {toastItem.data?.showClose && <ToastClose />}
      </ToastContent>
    </Toast>
  ))
}

function Toaster({ children, toastManager = toast, ...props }: ToastPrimitive.Provider.Props) {
  return <ToastProvider toastManager={toastManager} {...props}>{children}<ToastPortal><ToastViewport><ToastList /></ToastViewport></ToastPortal></ToastProvider>
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export { Toaster, Toast, ToastAction, ToastClose, ToastContent, ToastDescription, ToastIcon, ToastList, ToastPortal, ToastProvider, ToastTitle, ToastViewport, createToastManager, toast, useToastManager }
