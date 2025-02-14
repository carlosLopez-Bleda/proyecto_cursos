const Curso = require('../models/Curso');

const obtenerCursos = async (req, res) => {
    const cursos = await Curso.find();
    res.json(cursos);
};

const crearCurso = async (req, res) => {
    const nuevoCurso = new Curso(req.body);
    await nuevoCurso.save();
    res.status(201).json(nuevoCurso);
};

module.exports = { obtenerCursos, crearCurso };
