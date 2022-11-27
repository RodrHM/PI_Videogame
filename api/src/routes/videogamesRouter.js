const express = require('express')
const {Op} = require('sequelize')
const { getModel, getVideogames, getVideogamesByName, postVideogame, updateVideogame, deleteVideogame } = require('./controllers')

const {Videogame} = require('../db.js')
const videogamesRouter = express.Router();

videogamesRouter.get('/', async (req, res)=>{
    try {
        const { search } = req.query;
        
        let videogames = null;
        if(!search){
            videogames = await getVideogames(Videogame)
        } 
        else{
            videogames = await getVideogamesByName(Videogame, search)
        }

        return res.json(videogames) 
        
    } catch (error) {
        
        return res.status(404).send(error.message)
    }
});

videogamesRouter.post('/', async (req, res)=>{
    try {
        const { name, description, platforms, released, rating, genres, background_image } = req.body;

        const newVideogame = await postVideogame( name, description, platforms, released, rating, genres, background_image );
      
        return res.json(newVideogame)
    } catch (error) {
        return res.status(404).send(error.message)
    }
});

videogamesRouter.put('/:id', async (req, res)=>{        // Talves cambiar a la ruta /videogame/:id
    try {
        const { id } = req.params
        
        const { name, description, platforms, released, rating, genres, background_image } = req.body;

        const update_videogame = await updateVideogame(id, name, description, platforms, released, rating, genres, background_image)
        
        return res.json(update_videogame)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

videogamesRouter.delete('/:id', async (req, res)=>{     // Talves cambiar a la ruta /videogame/:id
    try {
        const { id } = req.params
        const delete_videogame = await deleteVideogame(id)
        return res.json(delete_videogame)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = videogamesRouter;