import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent } from 'storybook/test';
import { TypographyTable } from './TypographyTable';

const meta = {
  title: 'Foundations/Typography',
  component: TypographyTable,
  // Internal regression coverage; the public documentation lives in MDX.
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'padded' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Ver CSS', { exact: true }));
    const code = canvas.getByLabelText('Código CSS para exportar');
    await expect(code).toBeVisible();
    await expect(code).toHaveTextContent('--type-heading-lg-font-size: 24px');
    await expect(code).toHaveTextContent('.type-components-button-base');
    await expect(code).toHaveTextContent('.type-body-lg-sans-regular');
    await expect(code).toHaveTextContent('var(--brand-font-heading)');
  },
} satisfies Meta<typeof TypographyTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const FamiliesAndSizes: Story = { name: 'Familias y tamaños' };
