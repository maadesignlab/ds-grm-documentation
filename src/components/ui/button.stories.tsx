import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Loader2, Plus } from "lucide-react"

import { Button } from "./button"

type ButtonMode = "text" | "icon"
type ContentPlacement = "none" | "left" | "right"
type ButtonStoryState = "normal" | "loading" | "disabled"
type ButtonTextSize = "default" | "xs" | "sm" | "lg"
type ButtonIconSize = "icon" | "icon-xs" | "icon-sm"
type IconRoundness = "semiSquared" | "full"

type ButtonStoryArgs = ComponentProps<typeof Button> & {
  buttonMode: ButtonMode
  state: ButtonStoryState
}

type ButtonTextArgs = ButtonStoryArgs & {
  buttonMode: "text"
  contentPlacement: ContentPlacement
  size: ButtonTextSize
}

type ButtonIconArgs = ButtonStoryArgs & {
  buttonMode: "icon"
  contentPlacement?: never
  size: ButtonIconSize
  roundness: IconRoundness
}

const textSizes: ButtonTextSize[] = ["default", "xs", "sm", "lg"]
const iconSizes: ButtonIconSize[] = ["icon", "icon-xs", "icon-sm"]
const iconClassBySize: Record<ButtonIconSize, string> = {
  icon: "size-4",
  "icon-xs": "size-4",
  "icon-sm": "size-4",
}
const textIconClassBySize: Record<ButtonTextSize, "size-4"> = {
  default: "size-4",
  xs: "size-4",
  sm: "size-4",
  lg: "size-4",
}

const createMarker = (state: ButtonStoryState, iconClass: string) => {
  if (state === "loading") {
    return <Loader2 className={`${iconClass} animate-spin`} aria-hidden />
  }

  return <Plus className={iconClass} aria-hidden />
}

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    buttonMode: "text",
    state: "normal",
    variant: "default",
    size: "default",
    children: "Button",
    disabled: false,
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-24",
    },
  },
  argTypes: {
    buttonMode: { table: { disable: true } },
    variant: {
      table: { category: "Estilo" },
      control: "inline-radio",
      options: ["default", "secondary", "brand-neutral", "outline", "ghost", "link", "success", "warning", "destructive"],
      name: "Estilo",
    },
    children: {
      table: { category: "Contenido" },
      control: "text",
    },
    state: {
      name: "Estado",
      table: { category: "Estado" },
      control: "inline-radio",
      options: ["normal", "loading", "disabled"],
    },
    asChild: { control: false, table: { disable: true } },
    className: { control: false, table: { disable: true } },
    onClick: { control: false, table: { disable: true } },
  },
} satisfies Meta<ButtonStoryArgs>

export default meta

type StoryText = StoryObj<ButtonTextArgs>
type StoryIcon = StoryObj<ButtonIconArgs>

const renderTextButton: StoryText["render"] = (args) => {
  const { buttonMode: _buttonMode, contentPlacement, state, disabled, size, children, ...buttonProps } = args
  void _buttonMode

  const isLoading = state === "loading"
  const isDisabled = state === "disabled" || isLoading || disabled
  const safeSize = textSizes.includes(size as ButtonTextSize) ? size : "default"
  const safePlacement = contentPlacement || "none"

  const marker = createMarker(state, textIconClassBySize[safeSize as ButtonTextSize])

  return (
    <Button
      {...buttonProps}
      disabled={isDisabled}
      size={safeSize}
      aria-busy={isLoading || undefined}
      className="w-fit"
    >
      {safePlacement === "left" && (
        <span aria-hidden="true" className="inline-flex size-4 items-center justify-center shrink-0">
          {marker}
        </span>
      )}
      {children}
      {safePlacement === "right" && (
        <span aria-hidden="true" className="inline-flex size-4 items-center justify-center shrink-0">
          {marker}
        </span>
      )}
    </Button>
  )
}

const renderIconButton: StoryIcon["render"] = (args) => {
  const { buttonMode: _buttonMode, state, disabled, size, roundness, ...buttonProps } = args
  void _buttonMode

  const isLoading = state === "loading"
  const isDisabled = state === "disabled" || isLoading || disabled
  const safeSize = iconSizes.includes(size as ButtonIconSize) ? size : "icon"
  const marker = createMarker(state, iconClassBySize[safeSize])

  return (
    <Button
      {...buttonProps}
      size={safeSize}
      disabled={isDisabled}
      aria-label={buttonProps["aria-label"] ?? "Button icono"}
      aria-busy={isLoading || undefined}
      className={roundness === "full" ? "rounded-full" : undefined}
    >
      <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center">
        {marker}
      </span>
    </Button>
  )
}

export const Texto: StoryText = {
  args: {
    buttonMode: "text",
    state: "normal",
    size: "default",
    contentPlacement: "left",
    variant: "default",
    children: "Ver más",
  },
  argTypes: {
    size: {
      table: { category: "Tamaño" },
      control: "inline-radio",
      options: textSizes,
      name: "Tamaño",
    },
    contentPlacement: {
      table: { category: "Modo Texto" },
      control: "radio",
      options: ["none", "left", "right"],
      name: "Contenido",
      description: "Ícono/loader a izquierda o derecha del texto.",
    },
    children: {
      table: { category: "Contenido" },
      control: "text",
    },
    buttonMode: { table: { disable: true } },
  },
  render: renderTextButton,
  parameters: {
    layout: "centered",
  },
}

export const Icono: StoryIcon = {
  args: {
    buttonMode: "icon",
    state: "normal",
    size: "icon",
    roundness: "semiSquared",
    variant: "default",
  },
  argTypes: {
    size: {
      table: { category: "Tamaño" },
      control: "inline-radio",
      options: iconSizes,
      name: "Tamaño",
    },
    roundness: {
      table: { category: "Forma" },
      control: "inline-radio",
      options: ["semiSquared", "full"],
      name: "Redondez",
    },
    contentPlacement: { table: { disable: true } },
    children: { table: { disable: true } },
    buttonMode: { table: { disable: true } },
  },
  render: renderIconButton,
  parameters: {
    layout: "centered",
  },
}
