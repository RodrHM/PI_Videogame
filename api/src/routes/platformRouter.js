const express = require('express');
const {Platform} = require('../db.js')
const { getModel } = require('./controllers');

const platformRuter = express.Router()

platformRuter.get('/', async (req, res)=>{
    try {
        const platforms = await getModel(Platform)
        res.json(platforms)
    } catch (error) {
        return res.send(error.message)
    }
})



module.exports = platformRuter;