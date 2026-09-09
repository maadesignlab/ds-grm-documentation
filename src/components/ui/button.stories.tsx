import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ButtonIconExample, type ButtonIconExampleProps, type ButtonIconSize, ButtonTextExample, type ButtonTextExampleProps, type ButtonTextSize } from "./button-example"

const textSizes: ButtonTextSize[] = ["default", "xs", "sm", "lg"]
const iconSizes: ButtonIconSize[] = ["icon", "icon-xs", "icon-sm"]
const meta = {
  title: "Components/Button",
  component: ButtonTextExample,
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
} satisfies Meta<ButtonTextExampleProps & { buttonMode?: "text" | "icon" }>

export default meta

type StoryText = StoryObj<ButtonTextExampleProps & { buttonMode?: "text" }>
type StoryIcon = StoryObj<ButtonIconExampleProps & { buttonMode?: "icon" }>

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
  render: ({ buttonMode: _buttonMode, ...args }) => {
    void _buttonMode
    return <ButtonTextExample {...args} />
  },
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
    buttonMode: { table: { disable: true } },
  },
  render: ({ buttonMode: _buttonMode, ...args }) => {
    void _buttonMode
    return <ButtonIconExample {...args} />
  },
  parameters: {
    layout: "centered",
  },
}
