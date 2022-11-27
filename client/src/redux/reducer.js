import { DELETE_VIDEOGAME_BY_ID, FILTER_CREATE, GET_GENRES, GET_PLATFORMS, GET_VIDEOGAMES, GET_VIDEOGAME_BY_ID, ORDER_BY_ALPHABET_OR_RATING, PAGE_CHANGE, POST_NEW_VIDEOGAME, SEARCH_VIDEOGAMES_BY_NAME } from "./action-types"



const initialState = {
    videogames: [],
    copyVideogames:[],
    videogameDetails:{},
    nightMode:false,
    pageState:1,
    allGenres: [],
    allPlatforms: []
}


const rootReducer = (state=initialState, {type, payload})=>{
    console.log('Estoy en Reducers')
    switch(type){
        case GET_VIDEOGAMES:
            console.log(type)
            return{
                ...state, 
                pageState:1,
                videogameDetails:{},
                copyVideogames: payload,
                videogames: payload
            }
        case SEARCH_VIDEOGAMES_BY_NAME:
            console.log(type)
            console.log(payload)
            return{
                ...state, 
                pageState:1,
                copyVideogames: payload,
                videogames: payload
            }
        case GET_VIDEOGAME_BY_ID:
            console.log(type)
            return{
                ...state, 
                videogameDetails: payload
            }
        case POST_NEW_VIDEOGAME:
            console.log(type)
            return{
                ...state, 
                videogameDetails: payload,
                copyVideogames: [...[payload], ...state.copyVideogames],
                videogames: [...[payload], ...state.videogames]
            }
        case PAGE_CHANGE:
            console.log(type)
            return {
                ...state,
                pageState: payload
            }
        case GET_GENRES:
            console.log(type)
            return{
                ...state,
                allGenres: payload
            }
        case GET_PLATFORMS:
            console.log(type)
            return{
                ...state,
                allPlatforms: payload
            }
        case FILTER_CREATE:
            console.log(type)
            let objFilter;
            if(payload === 'All') objFilter = state.copyVideogames;
            if(payload === 'created') objFilter = state.copyVideogames.filter(v=>v.id.toString().length === 36)
            if(payload === 'notCreated') objFilter = state.copyVideogames.filter(v=>v.id.toString().length !== 36)
            return{
                ...state,
                videogames: objFilter
            }
        case ORDER_BY_ALPHABET_OR_RATING:
            console.log(type)

            let objOrder= [];
            if(payload === 'a-z') objOrder = state.copyVideogames;
            if(payload === 'a-z ↓') {
                let objVideogames = {}
                state.videogames.forEach(v=> objVideogames[v.name.toLowerCase()]=v)
                let arrName = state.videogames.map(v=>v.name.toLowerCase()).sort()
                arrName.forEach(n=> objOrder.push(objVideogames[n]))
                // console.log(arrName)
            }
            if(payload === 'a-z ↑') {
                let objVideogames = {}
                state.videogames.forEach(v=> objVideogames[v.name.toLowerCase()]=v)
                let arrName = state.videogames.map(v=>v.name.toLowerCase()).sort().reverse()
                arrName.forEach(n=> objOrder.push(objVideogames[n]))
                // console.log(objVideogames)
                // console.log(arrName)
                // console.log(objOrder)
            }

            if(payload === 'Rating') objOrder = state.copyVideogames;
            if(payload === 'Rating ↓'){
                objOrder = mergeSort(state.videogames).reverse()
                console.log(objOrder)
            }
            if(payload === 'Rating ↑'){
                objOrder = mergeSort(state.videogames)
                console.log(objOrder)
            }

            
            return{
                ...state,
                videogames: objOrder
            }
        case DELETE_VIDEOGAME_BY_ID:
            console.log(type)
            
            return {
                ...state,
                videogames: state.videogames.filter(v=> v.id!==payload)
            }
        default:
            console.log('Estoy en default')
            return {...state}
    }
};
export default rootReducer;



function mergeSort(array) {
    let arr = [];
    let mid = Math.round(array.length/2);
  
    let left = array.slice(0,mid);            //Partir el array a la mitad
    let right = array.slice(mid,array.length);
  
    if(left.length > 1){ left = mergeSort(left)}      //dividirlos hasta que queden separados de a uno
    if(right.length > 1){ right = mergeSort(right)}
    
    while(left.length !== 0 && right.length !== 0){       //ordenar todo en la variable arr
      if(left[0].rating < right[0].rating){ arr.push(left.shift(0)); }
                        else{ arr.push(right.shift(0)); }
    }
    
    return [...arr, ...left, ...right];         //unimos todo lo que quede
  }
