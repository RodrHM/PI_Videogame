import axios from 'axios'
import { DELETE_VIDEOGAME_BY_ID, FILTER_CREATE, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAMES, GET_VIDEOGAME_BY_ID, ORDER_BY_ALPHABET_OR_RATING, PAGE_CHANGE, POST_NEW_VIDEOGAME, PUT_VIDEOGAME, SEARCH_VIDEOGAMES_BY_NAME } from './action-types'



export const getVideogames = ()=>{
    console.log('getVideogame')
    return (dispatch)=> {
        axios.get('http://localhost:3001/videogames')
        .then(
            data=> {
                console.log(data)
                return dispatch({
                    type:GET_VIDEOGAMES,
                    payload: [...data.data]
                })
            }
        )
    }
}

export const searchVideogameByName = (name)=>{
    // console.log('getVideogame')
    return (dispatch)=> {
        axios.get(`http://localhost:3001/videogames?search=${name}`)
        .then(
            data=> {
                return dispatch({
                    type:SEARCH_VIDEOGAMES_BY_NAME,
                    payload: [...data.data]
                })
            }
        )
    }
}

export const getVideogameById = (id)=>{
    // console.log('getVideogame')
    // if(!id) return {type:GET_VIDEOGAME_BY_ID, payload:{}}
    return (dispatch)=> {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then(
            data=> {
                console.log(data)
                return dispatch({
                    type:GET_VIDEOGAME_BY_ID,
                    payload: data.data
                })
            }
        )
    }
}

export const postNewVideogame = (body)=>{
    // console.log('getVideogame')
    console.log(body)
    return (dispatch)=> {
        axios.post(`http://localhost:3001/videogames`, body)
        .then(
            data=> {
                console.log(data.data.id)
                return dispatch({
                    type:POST_NEW_VIDEOGAME,
                    payload: data.data
                })
            }
        )
    }
}

export const pageChange = (num)=>{
    return {
        type: PAGE_CHANGE,
        payload: num
    }
}

export const getGenres = ()=>{
    // console.log('getVideogame')
    return (dispatch)=> {
        axios.get(`http://localhost:3001/genres`)
        .then(
            data=> {
                console.log(data)
                return dispatch({
                    type:GET_GENRES,
                    payload: data.data
                })
            }
        )
    }
}

export const getPlatforms = ()=>{
    // console.log('getVideogame')
    return (dispatch)=> {
        axios.get(`http://localhost:3001/platforms`)
        .then(
            data=> {
                console.log(data.data)
                return dispatch({
                    type:GET_PLATFORMS,
                    payload: data.data
                })
            }
        )
    }
}

export const filterCreate = (validateCreate)=>{
    return {
        type: FILTER_CREATE,
        payload: validateCreate
    }
}
export const orderByAlfabetOrRating = (AlphabetRating)=>{
    return {
        type: ORDER_BY_ALPHABET_OR_RATING,
        payload: AlphabetRating
    }
}

export const deleteVideogameById = (id)=>{
    // console.log('getVideogame')
    return (dispatch)=> {
        axios.delete(`http://localhost:3001/videogames/${id}`)
        .then(
            data=> {
                console.log(data.data)
                return dispatch({
                    type:DELETE_VIDEOGAME_BY_ID,
                    payload: id
                })
            }
        )
    }
}

export const putVideogame = (body, id)=>{
    // console.log('getVideogame')
    return (dispatch)=> {
        axios.put(`http://localhost:3001/videogames/${id}`, body)
        .then(
            data=> {
                console.log(data.data)
                return dispatch({
                    type:PUT_VIDEOGAME,
                    payload: data.data
                })
            }
        )
    }
}


// http://localhost:3001/videogames
// http://localhost:3001/videogames?name="..."
// http://localhost:3001/videogame/{idVideogame}
// http://localhost:3001/videogame/
// http://localhost:3001/genders

