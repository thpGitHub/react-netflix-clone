import React from 'react'

const NetFlixRow = ({title = '', wideImage = true}) => {
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
