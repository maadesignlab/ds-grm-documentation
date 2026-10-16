import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ShadowGallery } from "./ShadowGallery"
const meta = { title: "Foundations/Sombras", component: ShadowGallery, tags: ["!autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof ShadowGallery>
export default meta
type Story = StoryObj<typeof meta>
export const Escala: Story = { name: "Escala visual", tags: ["!dev"] }
