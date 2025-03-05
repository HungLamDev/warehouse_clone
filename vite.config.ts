import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    https: false,
  },
  base: "./",
  plugins: [
    react(),
    //mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
      },
      includeAssets: [
        "**/*",
      ],
      manifest: {
        name: "Warehouse App",
        short_name: "Warehouse App",
        description: "Website description(Could be same with index.html file)",
        theme_color: "rgba(0, 0, 0, 0.5)",
        start_url: "/",
        display: "standalone",
        orientation: 'landscape',
        icons: [
          {
            src: "logo192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          // {
          //   src: "pwa-512x512.png",
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "any maskable",
          // },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});

