const Centro = require('../models/Centro');

const obtenerCentros = async (req, res) => {
    const centros = await Centro.find().populate('cursos');
    res.json(centros);
};

const crearCentro = async (req, res) => {
    const nuevoCentro = new Centro(req.body);
    await nuevoCentro.save();
    res.status(201).json(nuevoCentro);
};

module.exports = { obtenerCentros, crearCentro };
