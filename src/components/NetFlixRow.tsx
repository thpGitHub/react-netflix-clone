import React from 'react'
// ** Const **
import {TYPE_MOVIE} from '../const'
// ** MUI **
import {Alert, AlertTitle, CircularProgress} from '@mui/material'
// ** Utils **
import {clientApi} from '../utils/clientAPI'
import {useFetchData} from '../utils/hooks'

const NetFlixRow = ({
    title = '',
    wideImage = true,
    type = TYPE_MOVIE,
    param,
    filter = 'populaire',
    watermark = false,
}) => {
    const {data, error, status, execute} = useFetchData()
    
    const image = wideImage ? 'images/sample-poster.jpg' : 'images/sample.jpg'

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                <img
                    className="row__poster row__posterLarge"
                    src={image}
                    alt=""
                />
                <img
                    className="row__poster row__posterLarge"
                    src={image}
                    alt=""
                />
                <img
                    className="row__poster row__posterLarge"
                    src={image}
                    alt=""
                />
                <img
                    className="row__poster row__posterLarge"
                    src={image}
                    alt=""
                />
            </div>
        </div>
    )
}

export default NetFlixRow
