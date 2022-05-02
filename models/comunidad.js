'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comunidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comunidad.init({
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    genero: DataTypes.STRING,
    fecha: DataTypes.DATE,
    popularidad: DataTypes.FLOAT,
    descripcion: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'comunidad',
  });
  return comunidad;
};