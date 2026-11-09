import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * CSP aplicada só no build de produção. Em desenvolvimento o Vite usa
 * scripts inline (HMR), então a política quebraria o servidor local.
 * `style-src` precisa de 'unsafe-inline' por causa de atributos `style`
 * pontuais no JSX; não há HTML de usuário nem innerHTML.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

function cspDeProducao(): Plugin {
  return {
    name: 'fisiohelp-csp',
    apply: 'build',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'meta',
            attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
            injectTo: 'head-prepend',
          },
        ],
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'pwa-180.png', 'pwa-192.png', 'pwa-512.png', 'maskable-512.png'],
      manifest: {
        name: 'Fisiohelp — Calculadoras e curvas de ventilação mecânica',
        short_name: 'Fisiohelp',
        description:
          'Calculadoras e curvas de ventilação mecânica para fisioterapeutas intensivistas e cardiorrespiratórios.',
        lang: 'pt-BR',
        theme_color: '#3E7C6B',
        background_color: '#F6F4EF',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: 'index.html',
      },
      devOptions: {
        enabled: false,
      },
    }),
    cspDeProducao(),
  ],
})
