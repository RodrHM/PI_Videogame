import './Create.css'
import './inputCheckBox.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, getPlatforms, getVideogameById, postNewVideogame, putVideogame } from "../../redux/actions"
// import InputCheckBox from './InputCheckBox'



// Ruta de creación de videojuegos: debe contener

// [X] Un formulario controlado con JavaScript con los siguientes campos:
// // Nombre
// // Descripción
// // Fecha de lanzamiento
// // Rating
// [X] Posibilidad de seleccionar/agregar varios géneros
// [X] Posibilidad de seleccionar/agregar varias plataformas
// [x] Botón/Opción para crear un nuevo videojuego

// function errors(state){
//     if(state.name.length>15) throw new Error('Demaciado largo Max 15 caracteres')

// }


const Create = (props)=>{
    console.log(props)
    console.log(window.location.search.split('=').at(-1))
    const id = window.location.search.split('=').at(-1)
    console.log(id)

    const dispatch = useDispatch()
    // const postNewVideogame = dispatch(postNewVideogame())
    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms())
        if(id) dispatch(getVideogameById(id))
    },[])
    const allGenres = useSelector(state => state.allGenres)
    // console.log(allGenres)
    const allPlatforms = useSelector(state => state.allPlatforms)
    // console.log(allPlatforms)
    const videogameDetails = useSelector(state => state.videogameDetails)
    console.log(videogameDetails)


    let [form, setForm] = useState({
        name:'',
        description:'',
        platforms:[],
        genres:[],
        released:'',
        rating:'',
        background_image:''
    })

    let [error, setError] = useState({
        name:'',
        description:'',
        platforms:[],
        genres:[],
        released:'',
        rating:'',
        background_image:''
    })
    console.log(form)
// {name, description, platforms}

useEffect(()=>{
    if(id){
        setForm({
            name:videogameDetails.name,
            description:videogameDetails.description,
            platforms:[],
            genres:[],
            released:videogameDetails.released,
            rating:videogameDetails.rating,
            background_image:videogameDetails.background_image
        })
    }
},[])

    console.log(form)

    const nameHandler = ({target})=>{
        try {
            if(target.value.length>20) throw new Error('Demaciado largo, Max 20 caracteres')
            // errors(form)

            setForm({...form, name:target.value})
            setError({...error, name:''})
        } catch (err) {
            setError({...error, name:err.message})
            // alert(error.message)
        }
    }
    
    const descriptionHandler = ({target})=>{
        try {
            // if(target.value.length>255) throw new Error('Max 255 caracteres')
            setForm({...form, description:target.value})
        } catch (err) {
            alert(err.message)
        }
    }
    
    const releasedHandler = ({target})=>{
        setForm({...form, released:target.value})
    }
    
    const ratingHandler = ({target})=>{
        try {
            if(parseInt(target.value)<0 || parseInt(target.value)>5) throw new Error('Calificacion invalida')
            if(target.value.length>4) throw new Error('Maximo 3 digitos')
            setForm({...form, rating:target.value})
            setError({...error, rating:null})
        } catch (err) {
            setError({...error, rating:err.message})
        }
    }
    
    const background_imageHandler = ({target})=>{
        try {
            // const img = document.querySelector('div.right.image div img')
            setForm({...form, background_image:target.value})
            // console.log(img)
        } catch (err) {
            
        }
    }

    const genresHandler = (id)=>{
        
        if(!form.genres.includes(id)) {
            const newGenre = [...form.genres, id]
            // console.log(id)
            setForm({...form, genres:newGenre}) 
        }
        else {
            const newGenre = form.genres.filter(g => g!==id)
            // console.log(id)
            setForm({...form, genres:newGenre}) 
        }
    }
    const platformsHandler = (id)=>{
        if(!form.platforms.includes(id)) {
            const newPlatforms = [...form.platforms, id]
            // console.log(newPlatforms)
            setForm({...form, platforms:newPlatforms}) 
        }
        else {
            const newPlatforms = form.platforms.filter(p => p!==id)
            // console.log(newPlatforms)
            setForm({...form, platforms:newPlatforms}) 
        }
    }

    const submitHandler = async e => {
        e.preventDefault()
        try {
            // console.log(props)
            if(!form.name || !form.description || !form.platforms.length) throw new Error('Fala info obligatoria (Nombre, Platforms y/o Descripcion)')
            // if(!form.name) throw new Error('Falta nombre')
            // if(!form.description) throw new Error('Falta descripcion')
            // if(!form.platforms.length) throw new Error('Falta platforms')

            const regexDate = /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/
            
            if(form.released.length) {
                const dateOk = regexDate.test(form.released)
                if(!dateOk) throw new Error('Fecha invalida')
            }

            if(id) dispatch(putVideogame(form, id))
            else dispatch(postNewVideogame(form))
            // props.postNewVideogame(form)
            alert('Todo OK')
        } catch (error) {
            alert(error.message)
        }
      }

    return(
        <div id='content'>
            <nav>
                
                <h1>{id?`id: ${id}`:'Create Videogame'}</h1>
            </nav>
            <form onSubmit={submitHandler} method="post" id='form'>
                <div>
                    <div className={error.name?'locker error':'locker'}>
                        <input
                            type="text"
                            name="name"
                            onChange={nameHandler}
                            value={form.name}
                            placeholder='name'
                            
                        />
                        {/* {form.error.length?console.log('error'):console.log('not Error')} */}
                        <label>Nombre*:</label>
                        <i></i>
                        {error.name?<p>{error.name}</p>:console.log('not Error')}
                    </div>
                    <br/>
                    <div className='locker'>
                        <input
                            type="text" // datetime  week
                            name="released"
                            onChange={releasedHandler}
                            value={form.released}
                            placeholder='YYYY-MM-DD'
                        />
                        <label >Fecha de lanzamiento</label>
                        <i></i>
                    </div>
                    <br/>
                    <div className={error.rating?'locker error':'locker'}>
                        <input
                            type="text"
                            name="rating"
                            onChange={ratingHandler}
                            value={form.rating}
                            placeholder='0 a 5.00'
                        />
                        <label >Rating</label>
                        <i></i>
                        {error.rating?<p>{error.rating}</p>:console.log('not Error')}
                    </div>
                    <br/>
                    <div id="form4">
                        <div className='genres_platforms'>
                            <h3>Genres: </h3>
                            {
                                allGenres.map(
                                    g => <div className='inputCheckBox' key={`${g.id}${g.genre}`}>
                                        <input 
                                        type="checkbox" 
                                        name={g.genre} 
                                        id={g.id+g.genre} 
                                        value={g.id} 
                                        onClick={()=>genresHandler(g.id)}
                                        />
                                        <label htmlFor={g.id+g.genre}>{g.genre}</label>
                                    </div>
                                )
                            }
                        </div>
                        <div className='genres_platforms'>
                            <h3>Platforms*: </h3>
                            {
                                allPlatforms.map(
                                    p => <div className='inputCheckBox' key={`${p.id}${p.platform}`}>
                                        <input 
                                        type="checkbox" 
                                        name={p.platform} 
                                        id={p.id+p.platform} 
                                        value={p.id} 
                                        onClick={()=>platformsHandler(p.id)}
                                        />
                                        <label htmlFor={p.id+p.platform}>{p.platform}</label>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className='right image'>
                        <div>
                            <img src={form.background_image?form.background_image:''} alt="Imagen No Cargada" />
                        </div>
                        <label >URL: </label>
                        <input
                            type="text"
                            name="background_image"
                            onChange={background_imageHandler}
                            value={form.background_image}
                            placeholder='https://XXXXXX.jpg'
                        />
                    </div>
                    <br />
                    <div className='right discription'>
                        <label >Descripción*: </label>
                        <textarea name="description" 
                        id="Descripción" 
                        cols="30" 
                        rows="10"
                        placeholder='description'
                        onChange={descriptionHandler}
                        value={form.description}
                        ></textarea>
                    </div>
                <input type="submit" value={id?'UPDATE':'SAVE'} id='saveGame'/>
                </div>
            </form>
        </div>
    )
}

export default Create