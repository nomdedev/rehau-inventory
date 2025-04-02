import React, { useEffect, useState } from 'react';
import { getOrdenes, createOrden } from '../api/ordenes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ordenes = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [modalNuevaOrden, setModalNuevaOrden] = useState(false);
    const [nuevaOrden, setNuevaOrden] = useState({ proveedor: '', proyecto: '', estado: '', total: '' });

    useEffect(() => {
        cargarOrdenes();
    }, []);

    const cargarOrdenes = async () => {
        try {
            const data = await getOrdenes();
            setOrdenes(data);
        } catch (error) {
            toast.error('Error al cargar las órdenes');
        }
    };

    const handleCrearOrden = async () => {
        try {
            await createOrden(nuevaOrden);
            toast.success('Orden creada con éxito');
            setModalNuevaOrden(false);
            cargarOrdenes();
        } catch (error) {
            toast.error('Error al crear la orden');
        }
    };

    return (
        <div>
            <h1>Órdenes</h1>
            <button onClick={() => setModalNuevaOrden(true)}>Nueva Orden</button>
            <table>
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Proyecto</th>
                        <th>Estado</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map((orden) => (
                        <tr key={orden.id}>
                            <td>{orden.proveedor}</td>
                            <td>{orden.proyecto}</td>
                            <td>{orden.estado}</td>
                            <td>{orden.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalNuevaOrden && (
                <div className="modal">
                    <h2>Nueva Orden</h2>
                    <input
                        type="text"
                        placeholder="Proveedor"
                        value={nuevaOrden.proveedor}
                        onChange={(e) => setNuevaOrden({ ...nuevaOrden, proveedor: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Proyecto"
                        value={nuevaOrden.proyecto}
                        onChange={(e) => setNuevaOrden({ ...nuevaOrden, proyecto: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Estado"
                        value={nuevaOrden.estado}
                        onChange={(e) => setNuevaOrden({ ...nuevaOrden, estado: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Total"
                        value={nuevaOrden.total}
                        onChange={(e) => setNuevaOrden({ ...nuevaOrden, total: e.target.value })}
                    />
                    <button onClick={handleCrearOrden}>Guardar</button>
                    <button onClick={() => setModalNuevaOrden(false)}>Cancelar</button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Ordenes;