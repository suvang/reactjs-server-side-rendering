import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
  },

  server: {
    allowedHosts: [
      "my-app.com", // Allow a specific hostname
      ".mydomain.net", // Allow a domain and all its subdomains
      "frontend_web",
      ".pinggy.link", // Useful for Docker container names
    ],
  },
});
