const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno');

// Matricular alumno en un curso
router.post('/', async (req, res) => {
    try {
        const { alumnoId, cursoId } = req.body;

        if (!alumnoId || !cursoId) {
            return res.status(400).json({ message: 'AlumnoId y CursoId son requeridos' });
        }

        const alumno = await Alumno.findByPk(alumnoId);
        if (!alumno) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        alumno.cursoId = cursoId;
        await alumno.save();

        res.json({ message: 'Alumno matriculado correctamente', alumno });
    } catch (error) {
        res.status(500).json({ message: 'Error al matricular alumno', error: error.message });
    }
});

module.exports = router;
