'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
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
      this.belongsTo(models.Miembro,{
        foreignKey: 'miembro_id'
      });
      this.belongsTo(models.Amigo,{
        foreignKey: 'amigo_id'
      });
    }
  }
  Mensaje.init({
    comunidad_id: DataTypes.INTEGER,
    miembro_id: DataTypes.INTEGER,
    amigo_id: DataTypes.INTEGER,
    mensaje: DataTypes.TEXT,
    fecha: DataTypes.DATE,
    hora: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Mensaje',
  });
  return Mensaje;
};



// usuario_id = creador de el mensaje (fk)
// pribado_id = (fk)
// comunidad_id = (fk)
// es_pribado = booleano