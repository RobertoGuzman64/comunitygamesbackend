'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Miembro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Comunidad, {
        foreignKey: 'comunidad_id'
      });
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id'
      });
    }
  }
  Miembro.init({
    usuario_id: DataTypes.INTEGER,
    comunidad_id: DataTypes.INTEGER,
    motivo: DataTypes.TEXT,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Miembro',
  });
  return Miembro;
};