import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { env } from "process"
 
export default defineConfig({
  define: {
    'process.env.HC_V2_BACKEND_BASE_URL': JSON.stringify(env.HC_V2_BACKEND_BASE_URL)
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/hc-v2-front/",
})