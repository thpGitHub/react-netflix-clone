import { setupWorker } from 'msw'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)

// worker.start() 

/**
 * tells MSW to bypass any requests that do not match one of the defined request handlers.
 * cancel the warnings in the console.
 */
worker.start({ onUnhandledRequest: 'bypass' });
