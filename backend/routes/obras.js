const express = require('express');
const router = express.Router();
const { getObraDetails } = require('../controllers/obrasController');

// ...existing code...

// Endpoint para obtener detalles de una obra
router.get('/:id/detalles', async (req, res) => {
    try {
        const obraId = req.params.id;
        const detalles = await getObraDetails(obraId);
        res.status(200).json(detalles); // Asegúrate de enviar un código de estado 200
    } catch (error) {
        console.error(error); // Agregar logs para depuración
        res.status(500).json({ error: 'Error al obtener los detalles de la obra' });
    }
});

// ...existing code...

module.exports = router;
