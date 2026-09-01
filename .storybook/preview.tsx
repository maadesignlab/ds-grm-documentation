import type { Preview } from '@storybook/nextjs-vite'
import { addons } from 'storybook/preview-api'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/kantumruy-pro'
import '@fontsource-variable/plus-jakarta-sans'
import '../src/styles/globals.css'

const STORAGE_KEY = 'ds-brand-theme'
const AVAILABLE_BRANDS = ['grm-global', 'reina-madre', 'maria-linda', 'piel-sana'] as const
type BrandTheme = (typeof AVAILABLE_BRANDS)[number]
type GlobalsUpdatedPayload = { globals?: { brandTheme?: unknown } }

const isBrandTheme = (value: unknown): value is BrandTheme =>
  typeof value === 'string' && AVAILABLE_BRANDS.includes(value as BrandTheme)

const applyBrandTheme = (brand: BrandTheme) => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', brand)
  try {
    localStorage.setItem(STORAGE_KEY, brand)
  } catch {
    // Intentionally ignore storage errors (private mode / quotas / blocked storage).
  }
}

const channel = addons.getChannel()
channel.on(GLOBALS_UPDATED, ({ globals }: GlobalsUpdatedPayload) => {
  if (isBrandTheme(globals?.brandTheme)) {
    applyBrandTheme(globals.brandTheme)
  }
})

const preview: Preview = {
  initialGlobals: {
    brandTheme: 'grm-global',
  },
  globalTypes: {
    brandTheme: {
      name: 'Marca',
      description: 'Marca activa para los tokens globales',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'grm-global', title: 'GRM Global' },
          { value: 'reina-madre', title: 'Reina Madre' },
          { value: 'maria-linda', title: 'María Linda' },
          { value: 'piel-sana', title: 'Piel Sana' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const globalBrand = context.globals?.brandTheme
      const storedBrand =
        typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
      const selectedBrand = isBrandTheme(globalBrand)
        ? globalBrand
        : isBrandTheme(storedBrand)
          ? storedBrand
          : 'grm-global'
      applyBrandTheme(selectedBrand)

      return story()
    },
  ],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        locales: 'es',
        order: ['Design System', ['Introducción', 'Releases'], 'Foundations', ['Tokens', 'Tipografía', 'Iconos'], 'Components'],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
