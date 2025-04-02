import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material.Dialog';
import { toast } from 'react-toastify';

function ObrasTable({ obras }) {
    const [detalles, setDetalles] = useState(null);
    const [error, setError] = useState(null);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    const handleVerObra = async (obraId) => {
        try {
            setError(null);
            const response = await axios.get(`/api/obras/${obraId}/detalles`);
            setDetalles(response.data);
            setMostrarDetalle(true);
            toast.success('Detalles de la obra cargados con éxito');
        } catch (error) {
            console.error('Error al obtener los detalles de la obra', error);
            setError('No se pudieron cargar los detalles de la obra.');
            toast.error('Error al cargar los detalles de la obra');
        }
    };

    const cerrarDetalle = () => {
        setMostrarDetalle(false);
        setDetalles(null);
    };

    return (
        <div>
            <table>
                {/* ...existing code... */}
                <tbody>
                    {obras.map((obra) => (
                        <tr key={obra.id}>
                            {/* ...existing code... */}
                            <td>
                                <button onClick={() => handleVerObra(obra.id)}>Ver detalles</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog open={mostrarDetalle} onClose={cerrarDetalle}>
                <div className="modal-content">
                    <h3>Detalles de la Obra</h3>
                    {detalles && (
                        <>
                            <p><strong>Nombre:</strong> {detalles.obra.nombre}</p>
                            <p><strong>Descripción:</strong> {detalles.obra.descripcion}</p>
                            <h4>Materiales</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalles.materiales.map((material) => (
                                        <tr key={material.id}>
                                            <td>{material.nombre}</td>
                                            <td>{material.cantidad}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h4>Herrajes</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalles.herrajes.map((herraje) => (
                                        <tr key={herraje.id}>
                                            <td>{herraje.nombre}</td>
                                            <td>{herraje.cantidad}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default ObrasTable;
