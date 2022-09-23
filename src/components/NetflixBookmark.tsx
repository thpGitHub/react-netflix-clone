import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import NetflixAppBar from './NetflixAppBar'
import NetflixHeader from './NetflixHeader'
import {useFetchData} from '../utils/hooks'
import {clientApi, clientNetflix} from '../utils/clientAPI'
import {TYPE_MOVIE} from '../const'

interface IProps {
    logout: () => void
    authUser: any
}

const NetflixBookmark = ({logout, authUser}: IProps) => {
    const {data, execute, setData} = useFetchData()
    const {data: headerMovie, execute: executeHeader} = useFetchData()
    const idDefault = 749274

    useEffect(() => {
        setData(authUser)
    }, [authUser, setData])

    useEffect(() => {
        // const data = authUser

        execute(clientNetflix('bookmark', {data: authUser, method: 'POST'}))
    }, [authUser, execute])

    useEffect(() => {
        const id = data?.bookmark?.movies[0] ?? idDefault
        console.log('id in 3em useEffect === ', id)

        executeHeader(clientApi(`${TYPE_MOVIE}/${id}`))
    }, [data, executeHeader])

    return (
        <>
            <NetflixAppBar logout={logout} />
            <NetflixHeader
                movie={headerMovie?.data}
                type={TYPE_MOVIE}
                // authUser={authUser}
                authUser={data}
            />
            {/* <div className="row">
                <h2>Films favoris</h2>
                <div className="row__posters">
                    {data?.bookmark.movies.map(id => {
                        return (
                            <Card
                                key={id}
                                id={id}
                                type={TYPE_MOVIE}
                                watermark={true}
                                wideImage={true}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="row">
                <h2>Séries favorites</h2>
                <div className="row__posters">
                    {data?.bookmark.series.map(id => {
                        return <Card key={id} id={id} type={TYPE_TV} />
                    })}
                </div>
            </div> */}
        </>
    )
}

// const Card = ({id, type, watermark, wideImage}: any) => {
//     const {data, execute} = useFetchData()
//     const [image, setImage] = React.useState<any>('')
  
//     React.useEffect(() => {
//       execute(clientApi(`${type}/${id}`))
//     }, [execute, id, type])
  
//     React.useEffect(() => {
//       const buildImagePath = (data: any) => {
//         const image = wideImage ? data?.backdrop_path : data?.poster_path
//         return image ? `${imagePath400}${image}` : null
//       }
//       setImage(buildImagePath(data?.data))
//     }, [data, wideImage])
  
//     const watermarkClass = watermark ? 'watermarked' : ''
//     return (
//       <Link key={id} to={`/${type}/${id}`}>
//         <div className={`row__poster row__posterLarge ${watermarkClass}`}>
//           <img src={image} alt={data?.name} />
//         </div>
//       </Link>
//     )
//   }
export default NetflixBookmark
