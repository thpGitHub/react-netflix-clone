import {
    getRandomIntInclusive,
    getRandomType,
    getRandomMovie,
    getRandomSerie,
    getRandomId,
} from '../helper'
import {TYPE_TV, TYPE_MOVIE} from '../../const'

test('should return random integer', () => {
    expect(getRandomIntInclusive(1, 5)).toBeGreaterThanOrEqual(1)
    expect(getRandomIntInclusive(1, 5)).toBeLessThanOrEqual(5)
})
test('should return random TYPE', () => {
    expect([TYPE_TV, TYPE_MOVIE]).toContain(getRandomType())
})
test('should return random movie', () => {
    expect([399566, 602734, 579047, 385128, 615658]).toContain(getRandomMovie())
})
test('should return random serie', () => {
    expect([71446, 60574, 1399, 66732]).toContain(getRandomSerie())
})
test('should return random serie or random movie', () => {
    const serieId = [71446, 60574, 1399, 66732]
    const movieId = [399566, 602734, 579047, 385128, 615658]
    expect(serieId).toContain(getRandomId(TYPE_TV))
    expect(movieId).toContain(getRandomId(TYPE_MOVIE))
})
