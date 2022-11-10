import React, {useState} from 'react'
import { useMovie, useSearchMovie } from '../utils/hooksMovies'
import { useParams } from 'react-router-dom'
import { TYPE_MOVIE } from '../const'

const NetflixSearch = () => {
  /*
  * {query: 'batman'}
  */
  const {query:slug}: any = useParams()
  console.log('slug', slug);
  /*
  *  https://api.themoviedb.org/3/search/multi?api_key=<SECRET KEY>&language=en-US&page=1&include_adult=false&query=batman
  * data === [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  */
  const data = useSearchMovie(slug)
  console.log('data === ', data);
  
  const defaultMovie = useMovie(TYPE_MOVIE, 785752)
  console.log('defaultMovie === ', defaultMovie)
  const headerMovie = data?.[0] ?? defaultMovie
  console.log('headerMovie === ', headerMovie);
  
  

  return (
    <div style={{color: "white"}}>NetflixSearch</div>
  )
}

export default NetflixSearch

/**
 * exemple first object in data: 
 * 
adult: false
backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg"
genre_ids: (3) [80, 9648, 53]
id: 414906
media_type:"movie"
original_language: "en"
original_title: "The Batman"
overview: "Durant les deux années passées à arpenter les rues en tant que Batman, Bruce Wayne s'est aventuré au cœur des ténèbres de Gotham City. Disposant de seulement quelques alliés de confiance au sein du monde corrompu qu'est l'élite de la ville, le justicier solitaire s'est imposé comme l'unique incarnation de la vengeance parmi ses concitoyens. Lorsqu'un meurtrier s'en prend aux plus grandes personnalités de Gotham à l'aide de machinations sadiques, le plus grand détective du monde se lance dans une enquête dans la pègre en suivant des indices mystérieux, croisant ainsi Selina Kyle, alias Catwoman, Oswald Cobblepot, alias le Pingouin, Carmine Falcone et Edward Nashton, alias le Sphinx. Alors que les pistes et les plans du criminel s'éclaircissent, Batman doit tisser de nouveaux liens, démasquer le coupable et rétablir la justice à Gotham City, depuis trop longtemps empoisonnée par l'abus de pouvoir et la corruption."
popularity: 500.335
poster_path: "/t9JGg10CW1DzXEdWL54ewkUko6N.jpg"
release_date: "2022-03-01"
title: "The Batman"
video: false
vote_average: 7.7
vote_count: 6690
 */

/**
 * exemple defaultMovie
config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
data:
    adult: false
    backdrop_path: "/oM7AstNYo6eSkgAieXvsIxTPPDv.jpg"
    belongs_to_collection: null
    budget: 0
    genres: [{…}]
    homepage: ""
    id: 785752
    imdb_id: "tt5563324"
    original_language: "en"
    original_title: "Intrusion"
    overview: "Un couple qui vient de s'installer dans une petite ville est victime d'un cambriolage. Traumatisée, l'épouse     commence à soupçonner son entourage."popularity: 23.408
    poster_path: "/o6ozTBflWXlBje0uxJv4m6s4HTq.jpg"
    production_companies: (3) [{…}, {…}, {…}]
    production_countries: [{…}]
    release_date: "2021-09-22"
    revenue: 0
    runtime: 93
    spoken_languages: [{…}]
    status: "Released"
    tagline: "Les petites villes les plus tranquilles cachent parfois les plus noirs secrets..."
    title: "L'Intrusion"
    video: false
    vote_average: 6.02
    vote_count: 520
    [[Prototype]]: Object
headers: {access-control-allow-origin: '*', access-control-expose-headers: '*', alt-svc: 'h3=":443"; ma=86400', cache-control: 'public, max-age=28800', content-encoding: 'br', …}
request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
status: 200
statusText: ""
 */