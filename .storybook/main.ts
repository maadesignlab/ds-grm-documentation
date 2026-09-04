import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: ["date-fns", "embla-carousel-react", "input-otp", "react-day-picker", "react-day-picker/locale"]
      }
    });
  }
};
export default config;
