import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BorderGallery } from "./BorderGallery"
const meta = { title: "Foundations/Bordes", component: BorderGallery, tags: ["!autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof BorderGallery>
export default meta
type Story = StoryObj<typeof meta>
export const Escala: Story = { name: "Muestras de bordes", tags: ["!dev"] }
