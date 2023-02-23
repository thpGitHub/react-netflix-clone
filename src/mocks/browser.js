import { setupWorker } from 'msw'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)

worker.start()

// worker.start({
//     serviceWorker: {
//       options: {
//         // Narrow the scope of the Service Worker to intercept requests
//         // only from pages under this path.
//         scope: '/product'
//       }
//     }
//   })