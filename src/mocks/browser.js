import { setupWorker } from 'msw'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)

// worker.start() 

worker.start({ onUnhandledRequest: 'bypass' });

// worker.start({
//     serviceWorker: {
//       url: '/mockServiceWorker.js',
//       options: {
//         scope: '/',
//         // exclude the image.tmdb.org domain from being intercepted by MSW
//         exclude: [
//           'https://image.tmdb.org/*'
//         ]
//       }
//     }
//   });