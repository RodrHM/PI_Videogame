import './App.css';
import { Route } from "react-router-dom";

import Home from './components/Home/Home'
import Videogames from './components/Videogames/Videogames';
import VideogameDetails from './components/Videogame/VideogameDetails';
import Create from './components/Form/Create';
import TopNav from './components/TopNav/TopNav';


function App() {
  
  return (
    <div className="App">
      <Route path='/'>
        <nav id='HenryVideogames'>
        <TopNav/>
        </nav>
      </Route>
      <div >
        {/* ===================================== */}
        <Route path='/' exact>
          <Home></Home>
        </Route>
        {/* ===================================== */}
        <Route path={`/videogames`}>
          <Videogames></Videogames>
        </Route>
        {/* ===================================== */}
        <Route path='/videogame/:id'>
          <VideogameDetails></VideogameDetails>
        </Route>
        {/* ===================================== */}
        <Route path='/create'>
          <Create></Create>
        </Route>
        {/* ===================================== */}
      </div>
    </div>
  );
}

export default App;
