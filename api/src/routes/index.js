const { Router } = require('express');
const { useInflection } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require('./videogamesRouter')
const videogameRouter = require('./videogameRouter')
const genreRouter = require('./genreRouter');
const platformRuter = require('./platformRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter)
router.use('/videogame', videogameRouter)
router.use('/genres', genreRouter)
router.use('/platforms', platformRuter)



module.exports = router;
