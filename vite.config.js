import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      // Single entry: only build the main index.html
      input: resolve(__dirname, "index.html"),
    },
  },
});
