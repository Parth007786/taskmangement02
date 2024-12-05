import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:6565",
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: "dist", // Ensure this is the folder Render expects
    emptyOutDir: true // Clears the output directory before building
  }
});
