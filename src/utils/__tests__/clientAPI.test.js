import {clientAuth} from '../clientAPI'
import {server, rest} from '../../mocks'
// import {nanoid} from 'nanoid'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test.todo('should return random integer')