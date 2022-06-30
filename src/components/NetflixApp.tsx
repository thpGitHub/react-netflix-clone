import React from 'react'
import {useState, useEffect} from 'react'
import './Netflix.css'

import NetFlixRow from './NetFlixRow'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import NetflixFooter from './NetflixFooter'

import { getRandomType, getRandomId } from '../utils/helper'
import { clientApi } from '../utils/clientAPI'
import { API_KEY, LANG} from '../const'

import axios from 'axios'
import {AxiosResponse} from '../ts/interfaces/axiosResponse'

const NetflixApp = () => {
    const [headerMovie, setHeaderMovie] = useState<AxiosResponse>()
    const [type] = useState(getRandomType())
  
    const defaultMovieId = getRandomId(type)

    // const apiKey = '4fc7b001e8a107fe1fddc6b41ed0f4af'
   
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                // clientApi(`${type}${defaultMovieId}`)
                const response = await axios.get(
                    `https://api.themoviedb.org/3/${type}/${defaultMovieId}?api_key=${API_KEY}&language=${LANG}`,
                ) as AxiosResponse
                console.log('response', response)
                setHeaderMovie(response)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMovie()
    }, [])

    return (
        <div>
            <NetflixAppBar />
            {/* <NetflixHeader movie={''}/> */}
            <NetflixHeader movie={headerMovie?.data} type={type} />
            <NetFlixRow title="Films Netflix" />
            <NetFlixRow title="Séries Netflix" wideImage={false} />
            <NetflixFooter />
        </div>
    )
}

export default NetflixApp

// https://api.themoviedb.org/3/movie/550?api_key=8ee18f65008b7108b46834a1a60f55fc

