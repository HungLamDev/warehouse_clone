// vite.config.ts
import { defineConfig } from "file:///C:/Hung/kho/warehouse_LTH/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Hung/kho/warehouse_LTH/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { VitePWA } from "file:///C:/Hung/kho/warehouse_LTH/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  server: {
    host: true,
    https: false
  },
  base: "./",
  plugins: [
    react(),
    //mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png}"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      includeAssets: [
        "**/*"
      ],
      manifest: {
        name: "Warehouse App",
        short_name: "Warehouse App",
        description: "Website description(Could be same with index.html file)",
        theme_color: "rgba(0, 0, 0, 0.5)",
        start_url: "/",
        display: "standalone",
        orientation: "landscape",
        icons: [
          {
            src: "logo192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "logo512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
          // {
          //   src: "pwa-512x512.png",
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "any maskable",
          // },
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxIdW5nXFxcXGtob1xcXFx3YXJlaG91c2VfTFRIXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxIdW5nXFxcXGtob1xcXFx3YXJlaG91c2VfTFRIXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9IdW5nL2toby93YXJlaG91c2VfTFRIL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBodHRwczogZmFsc2UsXG4gIH0sXG4gIGJhc2U6IFwiLi9cIixcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgLy9ta2NlcnQoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxuICAgICAgd29ya2JveDoge1xuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwscG5nfSddLFxuICAgICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICAgIHNraXBXYWl0aW5nOiB0cnVlLFxuICAgICAgICBjbGllbnRzQ2xhaW06IHRydWUsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZUFzc2V0czogW1xuICAgICAgICBcIioqLypcIixcbiAgICAgIF0sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiBcIldhcmVob3VzZSBBcHBcIixcbiAgICAgICAgc2hvcnRfbmFtZTogXCJXYXJlaG91c2UgQXBwXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIldlYnNpdGUgZGVzY3JpcHRpb24oQ291bGQgYmUgc2FtZSB3aXRoIGluZGV4Lmh0bWwgZmlsZSlcIixcbiAgICAgICAgdGhlbWVfY29sb3I6IFwicmdiYSgwLCAwLCAwLCAwLjUpXCIsXG4gICAgICAgIHN0YXJ0X3VybDogXCIvXCIsXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICBvcmllbnRhdGlvbjogJ2xhbmRzY2FwZScsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiBcImxvZ28xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJsb2dvNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyB7XG4gICAgICAgICAgLy8gICBzcmM6IFwicHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgLy8gICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgLy8gICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIC8vICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcbiAgICAgICAgICAvLyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KTtcblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLG9CQUFvQjtBQUNsUyxPQUFPLFdBQVc7QUFFbEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyx3QkFBd0I7QUFBQSxRQUN2Qyx1QkFBdUI7QUFBQSxRQUN2QixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsV0FBVztBQUFBLFFBQ1gsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU9GO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
