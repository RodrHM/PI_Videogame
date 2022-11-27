import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { deleteVideogameById } from '../../redux/actions';
import star_icon from '../../images/star_icon.png'

const DivTarget = styled.div`

height: 8.5em;   
width:  14em;
margin-top: 1em;
margin-bottom: 3em;

display: flex;


img{
    position: absolute;
    border-radius: 2em;
    height: 8.5em;   
    width:  14em;
    color: #999;
    
    background-color: #3e3f46;
}

#back_card{
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;

    color: #999;
    position: absolute;
    
    background-color: #2e3133;

    width: 14em;
    height: 9em;
    border-radius: 2em;

    transform: translateY(2em);
    transition: 1s;

    div p{
        margin: 0;
    }
    div .rating{
        background-image: url(${star_icon});
        background-size: 1.4em;
        background-repeat: no-repeat;
        background-position: 4.5em;
    }
}

:hover #back_card{
    transition: 1s;
    transform: translateY(-5em) scale(1.1);
    
}

.delete{
    background-color: #3e3f46;
    position: absolute;

    height: 2em;
    width: 2em;

    transform: translateY(-.3em) translateX(-.3em);

    border:none;
    border-radius: 100%;
    
    transition: 1s;
    cursor: pointer;
    font-weight: bold;
    color: aliceblue;
}
.delete:hover{
    font-size:1em;
    background-color: #c4b31f;
    box-shadow: 0 0 10px #7633c2, 0 0 40px #7633c2, 0 0 80px #7633c2;
    color: #7633c2;
}
`
// background-image: url(${background_image});
const Card = ({id, name, genres, background_image, rating})=>{

    // console.log(genres)
    const strGenres = genres ? genres.map(g=>g.genre).join(', ') : null
    // las dimenciones (height, width) son ejemplos
    // babkgroound-image: url(${url})
    
    const dispatch = useDispatch()
    const deleteHandlet = ()=>{
        dispatch(deleteVideogameById(id))
    }


    return(
        <DivTarget >
            <Link to={`/videogame/${id}`}>
                <div id='back_card'>
                    <p className='genres'>{strGenres?strGenres:'No Tiene Genero'}</p>
                    <div>
                        <p className='name'>{name}</p>
                        <div>
                            <p className='rating'>{rating}</p>
                        </div>
                    </div>
                </div>
                <img src={background_image} alt="No tiene img" id='front_card'/>
            </Link>
            {id.length === 36? <input type="button" value="X" className='delete' onClick={deleteHandlet}/>: null}
            
        </DivTarget>
    )
}

export default Card;
