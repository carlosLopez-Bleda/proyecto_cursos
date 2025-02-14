const express = require('express');
const router = express.Router();
const Centro = require('../models/Centro');

// Obtener todos los centros
router.get('/', async (req, res) => {
    try {
        const centros = await Centro.findAll();
        res.json(centros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los centros', error: error.message });
    }
});

// Crear un nuevo centro
router.post('/', async (req, res) => {
    try {
        const nuevoCentro = await Centro.create(req.body);
        res.status(201).json(nuevoCentro);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el centro', error: error.message });
    }
});

// Actualizar un centro
router.put('/:id', async (req, res) => {
    try {
        const centro = await Centro.findByPk(req.params.id);
        if (!centro) return res.status(404).json({ message: 'Centro no encontrado' });

        await centro.update(req.body);
        res.json(centro);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el centro', error: error.message });
    }
});

// Eliminar un centro
router.delete('/:id', async (req, res) => {
    try {
        const centro = await Centro.findByPk(req.params.id);
        if (!centro) return res.status(404).json({ message: 'Centro no encontrado' });

        await centro.destroy();
        res.json({ message: 'Centro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el centro', error: error.message });
    }
});

module.exports = router;
