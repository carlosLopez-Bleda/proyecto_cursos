const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Curso = require('./Curso'); // Relación con cursos

const Centro = sequelize.define('Centro', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false }
});

// Relación 1 Centro -> Muchos Cursos
Centro.hasMany(Curso, { foreignKey: 'centroId' });
Curso.belongsTo(Centro, { foreignKey: 'centroId' });

module.exports = Centro;
