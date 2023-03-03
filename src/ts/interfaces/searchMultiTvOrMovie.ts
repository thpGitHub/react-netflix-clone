export type MovieOrTV = {
    adult: boolean
    backdrop_path: string
    id: number
    name?: string
    title?: string
    original_language: string
    original_name?: string
    overview: string
    poster_path: string
    media_type: 'tv' | 'movie'
    genre_ids: number[]
    popularity: number
    first_air_date?: string
    release_date?: string
    vote_average: number
    vote_count: number
    origin_country?: string[]
}

export type MutltiTvOrMovie = {
    page: number
    results: MovieOrTV[]
    total_pages: number
    total_results: number
}
