import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  ({ url }) => url.pathname.startsWith('/'),
  new NetworkFirst({
    cacheName: 'weatherData',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 // 1 hour
      })
    ]
  })
)
