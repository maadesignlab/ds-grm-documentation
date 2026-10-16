import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpacingGallery } from "./SpacingGallery"
const meta = { title: "Foundations/Espaciado", component: SpacingGallery, tags: ["!autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof SpacingGallery>
export default meta
type Story = StoryObj<typeof meta>
export const Escala: Story = { name: "Escala visual", tags: ["!dev"] }
