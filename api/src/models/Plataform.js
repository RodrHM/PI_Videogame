const { DataTypes } = require('sequelize')


module.exports = (sequelize)=>{

    sequelize.define('Platform', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            // autoIncrement: true
        },
        platform: {
            type: DataTypes.STRING      //Esto sera un arr de Strings
        },
    },
    {
        timestamps: false
    });
};
