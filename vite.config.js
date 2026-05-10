import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Plugin que escanea public/fotos/ y expone la lista de imágenes
function photosPlugin() {
  const photosDir = path.resolve(process.cwd(), 'public/fotos')

  function getPhotoList() {
    if (!fs.existsSync(photosDir)) {
      fs.mkdirSync(photosDir, { recursive: true })
      return []
    }
    return fs.readdirSync(photosDir)
      .filter(f => /\.(jpg|jpeg|png|webp|gif|bmp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(f => `/fotos/${f}`)
  }

  return {
    name: 'photos-folder-plugin',

    // En modo dev: endpoint /api/photos que lista las fotos en tiempo real
    configureServer(server) {
      server.middlewares.use('/api/photos', (_req, res) => {
        const photos = getPhotoList()
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(JSON.stringify(photos))
      })
    },

    // Al inicio del build: genera photos.json en public/ para que Vite lo copie a dist/
    buildStart() {
      const photos = getPhotoList()
      const publicJson = path.resolve(process.cwd(), 'public', 'photos.json')
      fs.writeFileSync(publicJson, JSON.stringify(photos))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), photosPlugin()],
})
