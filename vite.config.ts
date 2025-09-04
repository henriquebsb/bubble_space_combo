import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        format: "iife" // 👈 bundle as an IIFE script instead of ES module
      }
    }
  }
});