import {TYPE_TV, TYPE_MOVIE} from '../const'

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Math.random() génère un nombre aléatoire entre 0 (inclus) et 1 (exclusif).
 * Math.random() < 0.5 sera évaluée à true ou false avec une probabilité de 50%.
 */
export function getRandomType(): 'tv' | 'movie' {
  // return [TYPE_TV, TYPE_MOVIE][getRandomIntInclusive(0, 1)]
  // return ['tv', 'movie'][getRandomIntInclusive(0, 1)]
    return Math.random() < 0.5 ? 'tv' : 'movie';
  
}
export function getRandomMovie() {
  const moviesIds = [399566, 602734, 579047, 385128, 615658]
  return moviesIds[getRandomIntInclusive(0, moviesIds.length - 1)]
}
export function getRandomSerie() {
  const tvIds = [71446, 60574, 1399, 66732]
  return tvIds[getRandomIntInclusive(0, tvIds.length - 1)]
}
export function getRandomId(type = TYPE_MOVIE) {
  return type === TYPE_TV ? getRandomSerie() : getRandomMovie()
}

export function sleep(howTimeToSleep: number) {
  return new Promise(resolve => setTimeout(resolve, howTimeToSleep))
}