const axios = require('axios')
const {Op} = require('sequelize')
const {Genre, Videogame, Platform} = require('../db.js');    // Despues agregar platforms
const {genres} = require('../../genres.json')
const {platforms} = require('../../platforms.json')

console.log('Controllers')

const key = '99685df1c92c462dad724e128601dc2b';

try { 
    const postGenrePlatform = async ()=>{
        const valuesGenre = await axios.get(`https://api.rawg.io/api/genres?key=${key}`)
        // console.log(valuesGenre)
        const promisesGenre = valuesGenre.data.results.map( ele => Genre.create({ genre: ele.name, id: ele.id }) );
        // const promisesGenre = genres.map( ele => Genre.create({ genre: ele.name, id: ele.id }) );
        await Promise.all(promisesGenre)


        // const promisesPlatform = valuePlatform.map( ele => Platform.create({ platform:ele.name}))
        const promisesPlatform = platforms.map( ele => Platform.create({ platform:ele.name, id: ele.id}))
        await Promise.all(promisesPlatform)
        
    }
    postGenrePlatform()
    console.log('generos de videojuegos cargados')
} catch (error) {
    console.log('Hubo un error al cargar los datos')
    console.log(error.message)
}


module.exports = {
      //=========================================================================================================
    getModel: async (model)=>{
        const findModel = await model.findAll()
        return findModel;
    },//=========================================================================================================
    getVideogames: async (model, page=1)=>{

        let dataArray = []

        while (dataArray.length !== 5) {
            dataArray.push(axios.get(`https://api.rawg.io/api/games?key=${key}&page=${page}`))
            page++;
        }
        // console.log(dataArray)
        let count = 0;
        const promisesArray = await Promise.all(dataArray)

        dataArray = []                           //=======================================
        // console.log(promisesArray)
        promisesArray.forEach(
            videogames => { 
                // console.log(videogames.data.results)
                videogames.data.results.forEach(
                    async vg => {
                        const genres = vg.genres.map( g => {return {genre:g.name}})

                        const values = {
                            id: vg.id,
                            name: vg.name,
                            rating: vg.rating,
                            Genres:genres,
                            background_image: vg.background_image
                        }
                        // console.log(values)
                        count++
                        dataArray.push(values)
                        // await model.create(values);
                    }
                )
            }
        )
        // console.log(dataArray)                
        console.log('Esta trallendo ' + count + ' juegos')
        const findModel = await model.findAll({
            include: {
                model:Genre,
                attributes:['genre'],
                through: {
                    attributes: []
                  }
            }
        })
        return [...findModel, ...dataArray];

    },//=========================================================================================================
    getVideogamesByName: async (model, name)=>{
        const data = await axios.get(`https://api.rawg.io/api/games?search=${name}&&key=${key}`)

        let videogamesByName = data.data.results.map(
             videogame => {
                const genres = videogame.genres.map( g => {return {genre:g.name}})
                console.log(genres)
                const values = {
                    id: videogame.id,
                    name: videogame.name,
                    rating: videogame.rating,
                    Genres:genres,
                    background_image: videogame.background_image
                }
                return values;
            }
        )
        // console.log(videogamesByName)
        // console.log('Esta trallendo ' + videogamesByName.length + ' juegos')
        // await Promise.all(videogamesByName)

        const findModel = await model.findAll({
            where:{
                name:{[Op.substring]: name}
            }
        })

        const search_find = [...findModel, ...videogamesByName]
        if(!search_find.length) throw new Error('Nombre no encontrado')
        return search_find.slice(0,15);
        
    },//=========================================================================================================
    postVideogame: async ( name, description, platforms, released, rating, genres, background_image )=>{
        if(!name || !description || !platforms || !platforms.length) throw new Error('Faltan datos importantes')

        let videogameValues = {name, description}
        if(rating) videogameValues.rating = rating;
        if(released) videogameValues.released = released;
        if(background_image) videogameValues.background_image = background_image;

        const newVideogame = await Videogame.create(videogameValues)

        await newVideogame.setPlatforms(platforms)

        if(genres) await newVideogame.setGenres(genres)
        // await newVideogame.setPlatforms([2]);
        // await newVideogame.setGenres([1,5,6,3]);
        return newVideogame
    },//=========================================================================================================
    getVideogameById: async (id)=>{
        if(id.length === 36) {
            // const values = await Videogame.findByPk(id, { paranoid: false });
            console.log(id)
            const values = await Videogame.findOne({
                where:{id},
                include: [
                    {
                        model: Genre,
                        attributes: ['genre', 'id'],
                        through: {
                          attributes: []
                        }
                    },
                    {
                        model: Platform,
                        attributes: ['platform', 'id'],
                        through: {
                          attributes: []
                        }
                    }
                ]
            });
            if(!values) throw new Error('Videojuego no encontrado')
            return values
        }
        try {
            const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
            
            const platforms = data.platforms.map(
                        ({platform}) => {return {platform: platform.name}}
                    );
            const genres = data.genres.map(
                obj => {return {genre: obj.name}}
            )
                    console.log(platforms)
            const values = {
                id:id,
                name: data.name,
                description: data.description ? data.description : 'No tiene description' ,
                Platforms: platforms.length !== 0 ? platforms : 'Informacion no encontrada',
                released: data.released,
                rating: data.rating,
                Genres: genres.length !== 0 ? genres :'Informacion no encontrada',
                background_image: data.background_image,
            }
            // console.log(values)
            return values;
        } catch (error) {
            throw new Error(error.message)
        }
        
    },//=========================================================================================================
    updateVideogame: async ( id, name, description, platforms, released, rating, genres, background_image )=>{
        if(!id) throw new Error('Falta ID')
        const validate = await Videogame.findByPk(id, { paranoid: false })      // <========
        if(!validate) throw new Error('ID no encontrado')
        let obj = {id, name, description, platforms, released, rating, genres, background_image}
        
        if(!Object.keys(obj).length) throw new Error('No hay ningun dato para actualizar')
        
        const update_videogame = await Videogame.findByPk(id)       // Reemplazable
        
        if(name) update_videogame.name = name;
        if(rating) update_videogame.rating = rating;
        if(released) update_videogame.released = released;
        if(description) update_videogame.description = description;
        if(background_image) update_videogame.background_image = background_image;
        
        if(platforms) await update_videogame.setPlatforms(platforms)
        if(genres) await update_videogame.setGenres(genres)
        
        await update_videogame.save()
        return update_videogame
    },//=========================================================================================================
    deleteVideogame: async(id)=>{       
        if(!id) throw new Error('Falta ID')
        const validate = await Videogame.findByPk(id, { paranoid: false })
        if(!validate) throw new Error('ID no encontrado')

        await Videogame.destroy({
            where: { id }
        })
        return validate;
    },//=========================================================================================================
}



        // const data = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=${page}`)       //====================

        // const promises = data.data.results.map(
        //     async videogame => {
        //         // const platforms = videogame.platforms.map(
        //         //     obj => obj.platform.name
        //         // );
        //         const values = {
        //             name: videogame.name,
        //             description: videogame.description ? videogame.description : 'No tiene description' ,
        //             platforms: 'info no relevante',      //platforms.join(', '),
        //             background_image: videogame.background_image
        //         }
        //         return model.create(values);
        //     }
        // )
        // const findModel = await model.findAll({})                                                     //======================
        // return findModel;