// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
        secure: false,
        timeout: 3600000,
        proxyTimeout: 3600000,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            if (req.headers.accept === "text/event-stream") {
              proxyReq.setHeader("Connection", "keep-alive");
            }
          });
        },
      },
    },
  },
});
