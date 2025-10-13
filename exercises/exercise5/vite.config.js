import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
