import {Link} from "react-router-dom"
import './Home.css'
import Cubo from "../Cubo/Cubo";

const Home = ()=>{

    return(
        <div id="home">
            <Link to='/videogames'>
                <div id="pressStart"></div>
            </Link>
            <Cubo/>
        </div>
    )
}

export default Home;