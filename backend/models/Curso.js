const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curso = sequelize.define('Curso', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    fecha_importacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    nivel: { type: DataTypes.STRING, allowNull: false },
    lugar: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Curso;