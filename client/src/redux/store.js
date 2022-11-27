// import { createStore } from 'redux'
import rootReducer from './reducer'

// Esto es para conectarlo con la extencion de chrome
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
   composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;




