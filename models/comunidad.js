'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comunidad extends Model {
    /**
     * Método auxiliar para definir asociaciones.
     * Este método no forma parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamará a este método automáticamente.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Miembro,{
        foreignKey: 'comunidad_id'
      });
      this.hasMany(models.Mensaje,{
        foreignKey: 'comunidad_id'
      });
    }
  }
  Comunidad.init({
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    genero: DataTypes.STRING,
    fecha: DataTypes.DATE,
    popularidad: DataTypes.FLOAT,
    descripcion: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Comunidad',
  });
  return Comunidad;
};