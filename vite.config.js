import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
})


// {
//   "version": 2,
//   "builds": [{ "src": "server.js", "use": "@vercel/node" }],
//   "routes": [{ "src": "/(.*)", "dest": "server.js" }]
// }