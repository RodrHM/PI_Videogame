const { DataTypes } = require('sequelize')


module.exports = (sequelize)=>{

    sequelize.define('Genre', {
        id: {
            type: DataTypes.INTEGER,    //auto increental
            primaryKey: true,
            // autoIncrement: true
        },
        genre: {
            type: DataTypes.STRING      //Esto sera un arr de Strings
        },
        // genre_description: {        //Opcional
        //     type: DataTypes.TEXT        
        // }
    },
    {
        timestamps: false
    });
};





