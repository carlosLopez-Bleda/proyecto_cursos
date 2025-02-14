const Alumno = require('../models/Alumno');

const obtenerAlumnos = async (req, res) => {
    const alumnos = await Alumno.find().populate('curso');
    res.json(alumnos);
};

const crearAlumno = async (req, res) => {
    const nuevoAlumno = new Alumno(req.body);
    await nuevoAlumno.save();
    res.status(201).json(nuevoAlumno);
};

module.exports = { obtenerAlumnos, crearAlumno };
