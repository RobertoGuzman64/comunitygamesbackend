'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comunidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Miembro, {
        foreignKey: 'comunidad_id'
      });
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id'
      });
      this.belongsTo(models.Miembro, {
        foreignKey: 'miembro_id'
      });
    }
  }
  Comunidad.init({
    usuario_id: DataTypes.INTEGER,
    miembro_id: DataTypes.INTEGER,
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