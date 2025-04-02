const Obra = require('../models/Obra');
const Material = require('../models/Material');
const Herraje = require('../models/Herraje');

// ...existing code...

// Función para obtener los detalles de una obra
async function getObraDetails(obraId) {
    try {
        const obra = await Obra.findById(obraId).populate('materiales').populate('herrajes');
        if (!obra) {
            throw new Error('Obra no encontrada');
        }
        return {
            obra,
            materiales: obra.materiales || [], // Asegúrate de manejar valores nulos
            herrajes: obra.herrajes || [],
        };
    } catch (error) {
        console.error(error); // Agregar logs para depuración
        throw new Error('Error al obtener los detalles de la obra');
    }
}

// ...existing code...

module.exports = {
    // ...existing code...
    getObraDetails,
};
