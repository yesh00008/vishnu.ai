import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/vishnu.ai/' : '/',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api/github-models': {
        target: 'https://models.github.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github-models/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add GitHub token from environment
            const token = process.env.VITE_GITHUB_TOKEN;
            if (token) {
              proxyReq.setHeader('Authorization', `Bearer ${token}`);
            }
          });
        }
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
