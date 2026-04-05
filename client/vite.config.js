import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const devApiOrigin = env.VITE_DEV_API_ORIGIN || 'http://localhost:5001'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': devApiOrigin,
      },
    },
  }
})
