import { setupServer } from 'msw/node'
// import { handlers } from './handlers'
import { handlers_for_run_tests } from './handlers_for_run_tests'

// const server = setupServer(...handlers)
const server = setupServer(...handlers_for_run_tests)

export * from 'msw'
export {server}