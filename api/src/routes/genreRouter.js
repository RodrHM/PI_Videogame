const express = require('express');
const {Genre} = require('../db.js')
const {getModel} = require('./controllers.js')

const genreRouter = express.Router()

genreRouter.get('/', async (req, res)=>{
    try {
        //=========================Logica
        const genre = await getModel(Genre)
        // const genre = await Genre.findAll()
        //==============================
        return res.send(genre)
    } catch (error) {
        return res.send(error.message)
        return res.send('Algo salio Mal')
    }
    
})



module.exports = genreRouter;