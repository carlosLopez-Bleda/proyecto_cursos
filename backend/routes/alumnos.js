const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');
const Curso = require('../models/Curso'); // Importamos el modelo de Curso

// Obtener todos los alumnos con el nombre del curso al que están matriculados
router.get('/', async (req, res) => {
    try {
        const alumnos = await Alumno.findAll({
            include: { model: Curso, attributes: ['nombre'] } // Incluir el curso y mostrar solo el nombre
        });
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los alumnos', error: error.message });
    }
});

// Crear un nuevo alumno
router.post('/', async (req, res) => {
    try {
        const nuevoAlumno = await Alumno.create(req.body);
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el alumno', error: error.message });
    }
});

// Matricular un alumno en un curso
router.put('/:id/matricular', async (req, res) => {
    try {
        const { cursoId } = req.body;
        const alumno = await Alumno.findByPk(req.params.id);

        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        // Verificar si el curso existe
        const curso = await Curso.findByPk(cursoId);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Asignar cursoId al alumno y guardar
        alumno.cursoId = cursoId;
        await alumno.save();

        res.json({ message: 'Alumno matriculado correctamente', alumno });
    } catch (error) {
        res.status(500).json({ message: 'Error al matricular alumno', error: error.message });
    }
});

// Asignar una nota a un alumno
router.put('/:id/nota', async (req, res) => {
    try {
        const { nota } = req.body;
        const alumno = await Alumno.findByPk(req.params.id);

        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        // Asignar nota y guardar
        alumno.nota = nota;
        await alumno.save();

        res.json({ message: 'Nota asignada correctamente', alumno });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar la nota', error: error.message });
    }
});

// Actualizar un alumno
router.put('/:id', async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id);
        if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });

        await alumno.update(req.body);
        res.json(alumno);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el alumno', error: error.message });
    }
});

// Eliminar un alumno
router.delete('/:id', async (req, res) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id);
        if (!alumno) return res.status(404).json({ message: 'Alumno no encontrado' });

        await alumno.destroy();
        res.json({ message: 'Alumno eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el alumno', error: error.message });
    }
});

module.exports = router;
