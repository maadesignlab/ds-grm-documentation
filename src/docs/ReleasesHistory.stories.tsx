import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ReleasesHistory } from './ReleasesHistory';
import manifest from '../../docs/releases/1.1.0/published-manifest.json';

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
  name: 'Historial de versiones',
  play: async ({ canvasElement }) => {
    const page = within(canvasElement);
    const upcoming = within(page.getByText('Versión 1.3.0').closest('details')!);
    await userEvent.click(upcoming.getByText('Componentes incluidos', { exact: true }));
    for (const name of ['Badge', 'Popover', 'Sheet', 'Drawer', 'Alert', 'Calendar', 'Card', 'Stepper']) {
      await userEvent.click(upcoming.getByRole('button', { name: `Ver cambios de ${name}` }));
      await expect(upcoming.getByRole('region', { name: new RegExp(`^Cambios de ${name} ·`) })).toHaveTextContent('v1.3.0');
    }
    await expect(upcoming.getByText('Última publicada')).toBeVisible();
    await expect(upcoming.getByText('cerrada-con novedades')).toBeVisible();
    await userEvent.click(upcoming.getByText('Validación de cierre', { exact: true }));
    for (const title of ['DS-130-01 · Gradientes de Reina Madre y Piel Sana', 'DS-130-07 · Instalación y estilos del consumidor']) {
      await expect(upcoming.getByText(title, { exact: true })).toBeVisible();
    }
    await expect(upcoming.getAllByText('Criterio de cierre:')).toHaveLength(7);
    await userEvent.click(page.getByText('Versión 1.2.0'));
    const minor = within(page.getByText('Versión 1.2.0').closest('details')!);
    await userEvent.click(minor.getByText('Componentes incluidos', { exact: true }));
    for (const name of ['Sheet', 'Item', 'Tabs', 'Popover', 'Combobox', 'Stepper']) {
      await userEvent.click(minor.getByRole('button', { name: `Ver cambios de ${name}` }));
      await expect(minor.getByRole('region', { name: new RegExp(`^Cambios de ${name} ·`) })).toHaveTextContent('v1.2.0');
    }
    await userEvent.click(minor.getByText('Inspector de Storybook · Nuevo'));
    await expect(minor.getByText(/Alt\+I fija/)).toBeVisible();
    await expect(page.getAllByText('Última publicada')).toHaveLength(1);
    await expect(minor.queryByText('Última publicada')).toBeNull();
    await expect(page.queryByText(/Preparación local|publicación pendiente|La aprobación de esta versión/)).toBeNull();
    await expect(page.getByText('Versión 1.1.1').closest('details')).not.toHaveAttribute('open');
    await userEvent.click(page.getByText('Versión 1.1.1'));
    const patch = within(page.getByText('Versión 1.1.1').closest('details')!);
    await userEvent.click(patch.getByText('Componentes incluidos', { exact: true }));
    for (const name of ['Sheet', 'Drawer']) {
      await userEvent.click(patch.getByRole('button', { name: `Ver cambios de ${name}` }));
      const detail = patch.getByRole('region', { name: new RegExp(`^Cambios de ${name} ·`) });
      await expect(detail).toHaveTextContent('v1.0.1 → v1.0.2');
      await expect(detail).toHaveTextContent('v1.1.1');
    }
    const canvas = within(page.getByText('Versión 1.1.0').closest('details')!);
    await expect(page.getByText('Versión 1.1.1')).toBeVisible();
    await userEvent.click(canvas.getByText('Versión 1.1.0'));
    await userEvent.click(canvas.getAllByText('Componentes incluidos', { exact: true })[0]);
    for (const component of manifest.components) {
      const button = canvas.getByRole('button', { name: `Ver cambios de ${component.name}` });
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      const detail = canvas.getByRole('region', { name: new RegExp(`^Cambios de ${component.name} ·`) });
      await expect(detail).toHaveTextContent(`v${component.previousVersion} → v${component.version}`);
      for (const update of component.updates) await expect(detail).toHaveTextContent(update);
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Ver cambios de Toast' }));
    await expect(canvas.getByRole('region', { name: 'Cambios de Toast · v1.1.0' })).toHaveTextContent('72 % →');
    await userEvent.click(canvas.getAllByText('Validación de cierre', { exact: true })[0]);
    await expect(canvas.getByText('Excepciones de marca pendientes · 28 casos')).toBeVisible();
    await expect(canvas.getAllByText('23 sep 2026', { exact: true }).find(element => !element.className.includes('sm:hidden'))!).toBeVisible();
  },
};
