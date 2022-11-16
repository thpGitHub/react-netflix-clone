import {getRandomIntInclusive, getRandomType} from '../helper'
import {TYPE_TV, TYPE_MOVIE} from '../../const'

test('should return random integer', () => {
    expect(getRandomIntInclusive(1, 5)).toBeGreaterThanOrEqual(1)
    expect(getRandomIntInclusive(1, 5)).toBeLessThanOrEqual(5)
})
test('should return random TYPE', () => {
    expect([TYPE_TV, TYPE_MOVIE]).toContain(getRandomType())
    // expect(getRandomIntInclusive(1,5)).toBeLessThanOrEqual(5)
})
