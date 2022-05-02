'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Método auxiliar para definir asociaciones.
     * Este método no forma parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamará a este método automáticamente.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comunidad, {
        foreignKey: 'usuario_id'
      });
    }
  }
  Usuario.init({
    nick: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    email: DataTypes.STRING,
    clave: DataTypes.STRING,
    discord: DataTypes.STRING,
    juego: DataTypes.STRING,
    administrador: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};