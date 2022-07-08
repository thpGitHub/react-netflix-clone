import React from 'react'
import Skeleton from '@mui/material/Skeleton'

interface IProps {
    nbElements?: number
    title: string
    wideImage: boolean
}

const RowSkeleton = ({
    nbElements = 20,
    title = 'film',
    wideImage = true,
}: IProps) => {
    const postersSkeletons = []

    for (let i = 0; i < nbElements; i++) {
        postersSkeletons.push(
            <div key={i} className={`row__poster row__posterLarge`}>
                <Skeleton
                    variant="rectangular"
                    width={wideImage ? 400 : 166}
                    height={wideImage ? 225 : 250}
                />
            </div>,
        )
    }

    return (
        <div className="row" style={{backgroundColor: '#1C2833'}}>
            <h2>{title}</h2>
            <div className="row__posters">
               {postersSkeletons}
            </div>
        </div>
    )
}

export default RowSkeleton
