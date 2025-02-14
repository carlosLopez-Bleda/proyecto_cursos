const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso'); // Importamos el modelo
const Alumno = require('../models/Alumno');
const { Sequelize } = require('sequelize'); // Asegúrate de importar Sequelize
const sequelize = require('../config/database'); // Importar la conexión a la BD
// Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.findAll();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos', error: error.message });
    }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
    try {
        const nuevoCurso = await Curso.create(req.body);
        res.status(201).json(nuevoCurso);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error: error.message });
    }
});

// Actualizar un curso
router.put('/:id', async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        await curso.update(req.body);
        res.json(curso);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el curso', error: error.message });
    }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });

        await curso.destroy();
        res.json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el curso', error: error.message });
    }
});
router.get('/notas-medias', async (req, res) => {
    try {
        const cursos = await Curso.findAll({
            attributes: [
                'nombre',
                [sequelize.fn('AVG', sequelize.col('Alumnos.nota')), 'notaMedia']
            ],
            include: [{
                model: Alumno,
                attributes: []
            }],
            group: ['Curso.id'],
            raw: true // 🔹 Asegura que devuelva un objeto limpio
        });

        // 🔹 Evitar valores `null` en notaMedia
        const cursosConNotas = cursos.map(curso => ({
            nombre: curso.nombre,
            notaMedia: curso.notaMedia ?? 0
        }));

        res.json(cursosConNotas);
    } catch (error) {
        console.error('❌ Error en notas-medias:', error);
        res.status(500).json({ message: 'Error al obtener las notas medias', error: error.message });
    }
});


module.exports = router;
