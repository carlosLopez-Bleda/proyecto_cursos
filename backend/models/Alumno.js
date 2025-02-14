const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Curso = require('./Curso'); // Relación con curso

const Alumno = sequelize.define('Alumno', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true }, // Asegura que permita valores nulos
    edad: { type: DataTypes.INTEGER, allowNull: false },
    aprobado: { type: DataTypes.BOOLEAN, defaultValue: false }
});

// Relación 1 Curso -> Muchos Alumnos
Curso.hasMany(Alumno, { foreignKey: 'cursoId' });
Alumno.belongsTo(Curso, { foreignKey: 'cursoId' });

module.exports = Alumno;
