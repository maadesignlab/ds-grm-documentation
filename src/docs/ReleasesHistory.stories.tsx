import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ReleasesHistory } from './ReleasesHistory';
import manifest from '../../design-system/release-manifest.json';

const meta = {
  title: 'Design System/Releases',
  component: ReleasesHistory,
  // Internal regression coverage; the public documentation lives in MDX.
  tags: ['!dev', '!autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ReleasesHistory>;
export default meta;
type Story = StoryObj<typeof meta>;
export const LocalReview: Story = {
  name: 'Revisión local',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByText('Componentes incluidos', { exact: true })[0]);
    for (const component of manifest.components) {
      const button = canvas.getByRole('button', { name: `Ver cambios de ${component.name}` });
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      const detail = canvas.getByRole('region', { name: `Cambios de ${component.name}` });
      await expect(detail).toHaveTextContent(`v${component.previousVersion} → v${component.version}`);
      for (const update of component.updates) await expect(detail).toHaveTextContent(update);
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Ver cambios de Toast' }));
    await expect(canvas.getByRole('region', { name: 'Cambios de Toast' })).toHaveTextContent('72 % →');
    await userEvent.click(canvas.getAllByText('Validación de cierre', { exact: true })[0]);
    await expect(canvas.getByText('Excepciones de marca pendientes · 28 casos')).toBeVisible();
    await expect(canvas.getByText('23 de septiembre de 2026', { exact: true })).toBeVisible();
  },
};
