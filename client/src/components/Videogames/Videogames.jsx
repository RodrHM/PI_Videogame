import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, searchVideogameByName } from "../../redux/actions";
import { useEffect, useState } from "react";

import './Videogames.css'
import PageNav from "./PageNav";
import OrderFilterBar from "./OrderFilterBar";
import Cubo from '../Cubo/Cubo'
import Loading from '../Loading/Loading'


const Videogames = (props)=>{

    //LLamar a la api guardarlo en Store (redux) y enviarlo a #videogames
    const dispatch = useDispatch();
    let videogames = useSelector(state => state.videogames)
    let pageState = useSelector(state => state.pageState)

    let [update, setUpdate] = useState({
        page: 15,
        search: ''
    })
    useEffect(()=>{
            dispatch(getVideogames())
            // props.getVideogames()
            console.log('Peticion getVideogames')
            console.log(props)
    },[])

    useEffect(()=>{
        setUpdate({...update, page:pageState*15})
    },[pageState])

    const inputHandler = ({target})=>{
        setUpdate({...update, search:target.value})
    }
    const searchHandler = ()=>{
        dispatch(searchVideogameByName(update.search))
        // props.searchVideogameByName(update.search)
        console.log(update)
        setUpdate({...update, search:''})
    }
    
    return(
        <div>
            <nav id="navVideogame">

            </nav>
            <br />
            <div className="barVideogame">
                <div id="searchBar">
                    <input 
                        type='text' 
                        onChange={inputHandler} 
                        value = {update.search}
                        placeholder='Search By Name'
                        />
                    <button onClick={searchHandler}></button>
                </div>
                <OrderFilterBar/>
            </div>
            <br />
            <div className="barVideogame">
                {videogames.length>15?<PageNav/>:null}
                {/* <PageNav/> */}
                {/* 15 juegos por pagina */}
            </div>
            <br />
            {/* ================= Display ================= */}
            <div id="displayVideogames"> 
                {/* Mostrar todos los videojuegos */}
                {
                    videogames.length?
                    videogames.slice(update.page-15, update.page).map(
                        dataVideogame => <Card
                            id = {dataVideogame.id}
                            name = {dataVideogame.name}
                            rating = {dataVideogame.rating}
                            genres = {dataVideogame.Genres}
                            background_image = {dataVideogame.background_image}
                            key={dataVideogame.id}
                        />
                    )
                    :
                    <div className="displayLoading">
                        <Cubo/>
                        <Loading/>
                    </div>
                }
            </div>
            {/* ================= Display ================= */}
        </div>
    )
}

export default Videogames
// export default Videogames;