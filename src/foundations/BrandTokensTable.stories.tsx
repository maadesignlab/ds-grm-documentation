import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent } from 'storybook/test';
import { BrandTokensTable } from './BrandTokensTable';
import tokenChanges from './token-changes.json';

const meta = {
  title: 'Foundations/Tokens',
  component: BrandTokensTable,
  // Internal regression coverage; the public documentation lives in MDX.
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'padded' },
  play: async ({ canvasElement, globals }) => {
    const canvas = within(canvasElement);
    const brand = globals.brandTheme as keyof typeof tokenChanges.tokens;
    const newCount = Object.values(tokenChanges.tokens[brand]).filter(token => token.status === 'new').length;
    await expect(await canvas.findByRole('heading', { name: 'Cambios en v1.1.0' })).toBeVisible();
    await expect(canvas.getAllByText('Nuevo · v1.1.0')).toHaveLength(newCount);
    await expect(canvas.getByText('--table-header-background')).toBeVisible();
    await userEvent.click(canvas.getAllByText('Ver CSS', { exact: true })[0]);
    const cssPreview = canvas.getByLabelText('Código CSS para exportar');
    const completeCss = cssPreview.textContent;
    await expect(canvas.getAllByRole('button', { name: 'Copiar CSS' })).toHaveLength(1);
    for (const section of ['--primary:', '--brand-font', '--slateGray-50:', '--background-brand-gradient-light-1:', '.brand-background::before']) {
      await expect(cssPreview).toHaveTextContent(section);
    }
    const detail = canvas.getAllByText('Ver cambio')[0];
    await userEvent.click(detail);
    await expect(detail.closest('details')).toHaveAttribute('open');
    await expect(within(detail.closest('details')!).getByRole('img', { name: /Color anterior:/ })).toBeVisible();
    await expect(within(detail.closest('details')!).getByText(/Antes \(1.0.0\)/)).toBeVisible();
    const updatedFilter = canvas.getByRole('button', { name: /Solo actualizados/ });
    await userEvent.click(updatedFilter);
    await expect(updatedFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(cssPreview.textContent).toBe(completeCss);
    await expect(canvas.queryByText('Nuevo · v1.1.0')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('heading', { name: 'Extra Colors' })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /Todos \(/ }));
    await expect(canvas.getAllByText('Nuevo · v1.1.0')).toHaveLength(newCount);
  },
} satisfies Meta<typeof BrandTokensTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const GRMGlobal: Story = { name: 'Cambios · GRM Global', globals: { brandTheme: 'grm-global' } };
export const ReinaMadre: Story = { name: 'Cambios · Reina Madre', globals: { brandTheme: 'reina-madre' } };
export const MariaLinda: Story = { name: 'Cambios · María Linda', globals: { brandTheme: 'maria-linda' } };
export const PielSana: Story = { name: 'Cambios · Piel Sana', globals: { brandTheme: 'piel-sana' } };
