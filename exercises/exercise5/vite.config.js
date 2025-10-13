import { defineConfig } from "vite";
import { resolve } from "path";

import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  rollupOptions: {
    input: {
      index: resolve(__dirname, "index.html"),
      newProperty: resolve(__dirname, "new-property.html"),
    },
  },
});
