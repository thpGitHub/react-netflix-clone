const sampleMovie = {
  adult: false,
  backdrop_path: '/kbOB9DGl8qwhDRcXOmXfmcmadeD.jpg',
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 18,
      name: 'Drame',
    },
    {
      id: 53,
      name: 'Thriller',
    },
  ],
  homepage: 'https://www.netflix.com/title/81028975',
  id: 645886,
  imdb_id: 'tt11233960',
  original_language: 'en',
  original_title: 'The Unforgivable',
  overview:
    "Libérée de prison, une femme condamnée pour meurtre réintègre une société qui refuse de la pardonner et cherche la petite sœur qu'elle a été forcée d'abandonner.",
  popularity: 159.489,
  poster_path: '/gPQM1zqqsm6Lw1tHF41BwbmOkya.jpg',
  production_companies: [
    {
      id: 3281,
      logo_path: '/8tMybAieh64uzvm8knSjXOFX8Qc.png',
      name: 'GK Films',
      origin_country: 'GB',
    },
    {
      id: 4258,
      logo_path: null,
      name: 'Fortis Films',
      origin_country: 'US',
    },
    {
      id: 44225,
      logo_path: null,
      name: 'Construction Film',
      origin_country: 'DE',
    },
    {
      id: 20267,
      logo_path: '/s5T4CKFY9rRd6Utbm14nuaAU6Hu.png',
      name: 'Red Production Company',
      origin_country: 'GB',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'GB',
      name: 'United Kingdom',
    },
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2021-11-24',
  revenue: 0,
  runtime: 112,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: '',
  title: 'Impardonnable',
  video: false,
  vote_average: 7.6,
  vote_count: 203,
}
const bookmark = {
  uid: '21ad0bd836b90d08f4cf640b4c298e7c',
  movies: [123456],
  series: [71446, 116450, 63639, 127700],
}

const resultsMovies = {results: [{...sampleMovie}]}
export {sampleMovie, resultsMovies, bookmark}
