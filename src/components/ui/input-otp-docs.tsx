"use client"

import { InputOTPExample, inputOTPExamplePresets, type InputOTPExampleProps } from "./input-otp-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof inputOTPExamplePresets
function Example({ preset }: { preset: Preset }) { return <InputOTPExample {...inputOTPExamplePresets[preset] as InputOTPExampleProps} /> }

export function InputOTPStyles() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Default" value="InputOTPGroup"><Example preset="default" /></Card><Card title="Separator" value="InputOTPSeparator"><Example preset="separator" /></Card></div>
}

export function InputOTPSlots() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="4 slots" value="maxLength=4"><Example preset="four" /></Card><Card title="5 slots" value="maxLength=5"><Example preset="five" /></Card><Card title="6 slots" value="maxLength=6"><Example preset="six" /></Card><Card title="6 slots · pares" value="2-2-2"><Example preset="pairs" /></Card></div>
}

export function InputOTPStates() {
  return <div className="not-prose grid gap-3 lg:grid-cols-3"><Card title="Default" value="status=default"><Example preset="default" /></Card><Card title="Error" value="aria-invalid=true"><Example preset="error" /></Card><Card title="Disabled" value="disabled=true"><Example preset="disabled" /></Card></div>
}

export function InputOTPProgress() {
  return <div className="not-prose grid gap-3 lg:grid-cols-3"><Card title="Empty" value="value=&quot;&quot;"><Example preset="empty" /></Card><Card title="Partial" value="defaultValue=123"><Example preset="partial" /></Card><Card title="Filled" value="defaultValue=1234"><Example preset="filled" /></Card></div>
}

const anatomy = [
  ["InputOTP", "OTPInput", "Entrada accesible, valor, patrón y longitud"],
  ["InputOTPGroup", "div", "Agrupa slots contiguos"],
  ["InputOTPSlot", "OTPInputContext", "Representa carácter, selección y caret"],
  ["InputOTPSeparator", "role=separator", "Divide grupos mediante MinusIcon"],
] as const
const geometry = [
  ["Slot", "size-9", "36 × 36px", "--card / --input"],
  ["Texto", "text-sm", "14px / 20px", "--foreground"],
  ["Radio", "rounded-lg", "8px en extremos", "--radius-md"],
  ["Focus", "ring-3", "3px", "--ring / 50%"],
] as const
const api = [
  ["maxLength", "number", "requerido", "Cantidad máxima de dígitos y slots compuestos"],
  ["value / onChange", "string / callback", "—", "Modo controlado de input-otp"],
  ["pattern", "string", "—", "REGEXP_ONLY_DIGITS en la composición de referencia"],
  ["disabled", "boolean", "false", "Deshabilita entrada y reduce opacidad"],
  ["aria-invalid", "boolean", "false", "Expone estado inválido y tokens destructivos"],
] as const

export function InputOTPSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Anatomía oficial</h3><Table columns={["Componente", "Base", "Función"]} rows={anatomy} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tamaño y tokens</h3><Table columns={["Elemento", "Tailwind", "Valor", "Token"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API pública</h3><Table columns={["Propiedad", "Tipo", "Default", "Función"]} rows={api} /></section></div>
}
