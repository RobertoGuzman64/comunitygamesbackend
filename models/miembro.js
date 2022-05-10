'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Miembro extends Model {
    /**
     * Método auxiliar para definir asociaciones.
     * Este método no forma parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamará a este método automáticamente.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Comunidad, {
        foreignKey: 'comunidad_id'
      });
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id'
      });
      this.hasMany(models.Mensaje, {
        foreignKey: 'miembro_id'
      });
    }
    
  }
  Miembro.init({
    comunidad_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    nick: DataTypes.STRING,
    avatar: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Miembro',
  });
  return Miembro;
};