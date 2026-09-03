"use client"

import * as React from "react"

import { Button } from "./button"
import {
  Toaster,
  ToastList,
  ToastProvider,
  ToastViewport,
  createToastManager,
  type ToastData,
} from "./toast"

export type ToastStatus = "success" | "warning" | "error" | "info" | "brand-neutral" | "neutral"
export type ToastBehavior = "standard" | "promise" | "stack"

export type ToastExampleProps = {
  status?: ToastStatus
  text?: string
  showIcon?: boolean
  showDescription?: boolean
  showAction?: boolean
  showClose?: boolean
  behavior?: ToastBehavior
  preview?: boolean
}

export function ToastExample({ status = "success", text = "Datos actualizados", showIcon = true, showDescription = false, showAction = false, showClose = false, behavior = "standard", preview = false }: ToastExampleProps) {
  const manager = React.useMemo(() => createToastManager<ToastData>(), [])

  const addToast = React.useCallback((title = text, type = status) => {
    let id = ""
    id = manager.add({
      title,
      type,
      timeout: 0,
      description: showDescription ? "Los cambios se guardaron correctamente." : undefined,
      actionProps: showAction ? { children: "Deshacer", onClick: () => manager.close(id) } : undefined,
      data: { showIcon, showClose },
    })
    return id
  }, [manager, showAction, showClose, showDescription, showIcon, status, text])

  const showToast = React.useCallback(() => {
    if (behavior === "stack") {
      addToast("Primer cambio")
      addToast("Segundo cambio")
      addToast("Datos actualizados")
      return
    }
    if (behavior === "promise") {
      void manager.promise(new Promise(resolve => window.setTimeout(() => resolve(true), 700)), {
        loading: { title: "Actualizando datos", type: "loading", timeout: 0, data: { showIcon, showClose } },
        success: { title: text, type: "success", timeout: 0, data: { showIcon, showClose } },
        error: { title: "No fue posible actualizar", type: "error", timeout: 0, data: { showIcon, showClose } },
      })
      return
    }
    addToast()
  }, [addToast, behavior, manager, showClose, showIcon, text])

  React.useEffect(() => {
    if (preview) addToast()
    return () => manager.close()
  }, [addToast, manager, preview])

  if (preview) {
    return (
      <div className="relative h-28 w-full min-w-[356px] overflow-hidden">
        <ToastProvider toastManager={manager} timeout={0}>
          <ToastViewport className="!absolute !top-1/2 !right-auto !bottom-auto !left-1/2 !m-0 !h-[76px] !w-[356px] !max-w-none -translate-x-1/2 -translate-y-1/2">
            <ToastList />
          </ToastViewport>
        </ToastProvider>
      </div>
    )
  }

  return <><Button onClick={showToast}>Mostrar notificación</Button><Toaster toastManager={manager} timeout={0} /></>
}
