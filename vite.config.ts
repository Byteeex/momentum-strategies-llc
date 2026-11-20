import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  build: {
    outDir: "dist/react",
    emptyOutDir: true,
    lib: {
      entry: "src/main.tsx",
      name: "MomentumHoverLinks",
      formats: ["es"],
      fileName: "hover-links",
      cssFileName: "hover-links",
    },
  },
});
