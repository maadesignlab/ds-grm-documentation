import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
export default defineConfig({
  optimizeDeps: { include: ["react", "react-dom", "react-dom/client", "@base-ui/react/drawer", "react-day-picker", "react-day-picker/locale"] },
  resolve: { dedupe: ['react', 'react-dom'], alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  test: {
    include: ['tests/compatibility/*.test.tsx'],
    browser: { enabled: true, headless: true, provider: playwright({}), instances: [{ browser: 'chromium' }] },
  },
})
