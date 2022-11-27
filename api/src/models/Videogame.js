const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,    // Cambiar por otro metodo para verificar que no choque con un id de videojuego
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {   //fecha_de_lanzamiento 
      type: DataTypes.DATEONLY,       // Es un string de una fecha
      defaultValue: DataTypes.NOW     // verificar si esto anda bien
                                      // Sino agerar un get() para modificar el dato usando DataTypes.NOW
    },              
    rating: {                 
      type: DataTypes.FLOAT,    //verificar si es el mejor para recivir un num
      defaultValue: 0,            // Maximo 10.00
    },
    // platforms: {             
    //   type: DataTypes.STRING, // Recive un arr ==> Verificar si esta bien
    //   allowNull: false        // hacer un get() y modificar para que sea un arr de str con los nombre de las plataformas
    // },
    background_image: {
      type: DataTypes.STRING,
      defaultValue:'https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/02/17105257/game-ratings-featured.jpg'
    }
  },{
    timestamps: false
  });
};
