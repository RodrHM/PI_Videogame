const express = require('express')

const {Videogame} = require('../db.js')
const { getVideogameById } = require('./controllers')
const videogameRouter = express.Router();

videogameRouter.get('/:idVideogame', async (req, res)=>{
    try {
        const { idVideogame } = req.params;

        const findVideogame = await getVideogameById(idVideogame);

        return res.status(200).json(findVideogame)
    } catch (error) {
        return res.status(404).send(error.message)
    }
});

module.exports = videogameRouter;