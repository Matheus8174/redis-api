import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    clearMocks: true,
    dir: 'tests/modules',
    name: 'end2end-tests',
    watch: false,
    setupFiles: 'tests/vite.setup.ts'
  }
});
