import { useEffect } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { getVideogameById } from "../../redux/actions"
import { Link } from "react-router-dom";

import './VideogameDetails.css'


const Videogame = ()=>{
    const dispatch = useDispatch()
    const videogameDetails = useSelector(state => state.videogameDetails);
    useEffect(()=>{
        const id = window.location.pathname.split('/').at(-1)
        console.log(id)
        dispatch(getVideogameById(id))
    },[])

    const stgGenres = videogameDetails.Genres ? videogameDetails.Genres.map(g=>g.genre).join(', ') : null
    const stgPlatforms = videogameDetails.Platforms ? videogameDetails.Platforms.map(p=>p.platform).join(', ') : null
    
    return(
        <div id="details">
            <div id="info">
                {videogameDetails.id && videogameDetails.id.length === 36?
                <Link to={`/create?edit=${videogameDetails.id}`}>
                    <input type="button" value="" className="editButton"/> 
                </Link> 
                : null}
                <h1>{videogameDetails.name}</h1>
                <p>Generos: {stgGenres}</p>
                <p>Plataformas: {stgPlatforms}</p>
                {/* {console.log(videogameDetails)} */}
                <p>Rating: {videogameDetails.rating}</p>
                <p>Fecha de lanzamiento: {videogameDetails.released}</p>
            </div>
            <div id='img'>
                <div>
                    <img src={videogameDetails.background_image} alt="No tiene imagen" />
                </div>
            </div>
            <div id="description">
                <div>
                    <p>Descripcion: </p>
                    <div dangerouslySetInnerHTML={{ __html: videogameDetails.description }} />
                </div>
            </div>
        </div>
    )
}

export default Videogame