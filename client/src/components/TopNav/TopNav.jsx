import { Link, Route } from "react-router-dom";

import './TopNav.css'



const TopNav = ()=>{

    return(
        <div id="topNav">
            <h1>Videogames</h1>
            <div>
                <Route path='/' exact>
                    <a href="https://github.com/RodrHM">
                        <input type="button" value="" className="redes github"/>
                    </a>
                    <a href="https://www.linkedin.com/in/rodrigo-martinez-b6183b217/">
                        <input type="button" value="" className="redes linkedin"/>
                    </a>
                </Route>
                <Route path='/videogames'>
                    <Link to='/'>
                        <button id='toHome' className="neonButton">Home</button>
                    </Link>
                    <Link to="/create">
                        <button id="toCreate" className="neonButton">Create Videogame</button>
                    </Link>
                </Route>
                <Route path='/create' >
                    <Link to='/videogames'>
                        <button id="tovideogames" className="neonButton">Back</button>
                    </Link>
                </Route>
                <Route path='/videogame/:id' >
                    <Link to='/videogames'>
                        <button id="tovideogames" className="neonButton">Back</button>
                    </Link>
                </Route>
                {/* <div id='nightMode'>
                    <button >ON/OFF</button>
                </div> */}
            </div>
        </div>
    )
}





export default TopNav;



