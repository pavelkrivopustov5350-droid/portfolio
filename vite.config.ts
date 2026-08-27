import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// База './' — чтобы сборка одинаково работала и на своём домене,
// и в подпапке (GitHub Pages), и просто открытая с диска через сервер.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
