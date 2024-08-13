import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'Walkthrough',
            fileName: (format) => `walkthrough.${format}.js`,
        },
        rollupOptions: {
            // Ensure to externalize deps that shouldn't be bundled
            // into your library
            external: [],
            output: {
                globals: {
                    // Provide global variables to use in the UMD build
                    // for externalized deps
                },
            },
        },
    },
});
