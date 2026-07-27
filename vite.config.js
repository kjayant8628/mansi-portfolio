import { resolve } from 'path';
import { defineConfig } from 'vite';

// Lightweight, framework-free Vite setup.
// Two static HTML entry points:
//   /index.html         -> homepage
//   /case-study.html     -> single dynamic template for ALL projects,
//                           rendered client-side from /src/data/projects/*.js
//
// Adding a new project never adds a new HTML page — see README.md.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        caseStudy: resolve(__dirname, 'case-study.html')
      }
    }
  }
});
