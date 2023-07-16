import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    testTimeout: 50000,
    clearMocks: true,
    watch: false,
    dir: 'src/modules',
    name: 'unit-tests',
    setupFiles: 'vite.setup.ts'
  }
});
