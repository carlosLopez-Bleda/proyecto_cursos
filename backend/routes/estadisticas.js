const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Alumno = require('../models/Alumno');
const Curso = require('../models/Curso');
const Centro = require('../models/Centro');

// Obtener estadísticas generales
router.get('/', async (req, res) => {
    try {
        const totalAlumnos = await Alumno.count();
        const totalCursos = await Curso.count();

        // Encontrar el centro con más alumnos
        const centroMasAlumnos = await Centro.findOne({
            attributes: ['id', 'nombre'],
            include: [{
                model: Curso,
                attributes: [],
                include: [{
                    model: Alumno,
                    attributes: []
                }]
            }],
            group: ['Centro.id'],
            order: [[Curso, Alumno, 'id', 'DESC']]
        });

        res.json({
            totalAlumnos,
            totalCursos,
            centroMasAlumnos: centroMasAlumnos ? centroMasAlumnos.nombre : 'No disponible'
        });

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
    }
});

module.exports = router;
