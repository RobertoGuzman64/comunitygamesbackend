'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amigo extends Model {
    /**
     * Método auxiliar para definir asociaciones.
     * Este método no forma parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamará a este método automáticamente.
     */
    static associate(models) {
      // define association here
    }
  }
  Amigo.init({
    motivo: DataTypes.TEXT,
    fecha: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Amigo',
  });
  return Amigo;
};