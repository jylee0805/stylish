import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        homePage: "homePage.html",
        index: "index.html",
      },
    },
    outDir: "build",
  },
});
