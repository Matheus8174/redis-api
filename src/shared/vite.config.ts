import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    clearMocks: true,
    watch: false,
    dir: 'src/shared',
    name: 'shared-module-tests'
  }
});
