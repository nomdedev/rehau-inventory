import React, { useEffect, useState } from 'react';
import { getObras, createObra } from '../api/obras';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Obras = () => {
    const [obras, setObras] = useState([]);
    const [modalNuevaObra, setModalNuevaObra] = useState(false);
    const [nuevaObra, setNuevaObra] = useState({ nombre: '', cliente: '', estado: '', fecha: '' });

    useEffect(() => {
        cargarObras();
    }, []);

    const cargarObras = async () => {
        const data = await getObras();
        setObras(data);
    };

    const handleCrearObra = async () => {
        await createObra(nuevaObra);
        toast.success('Obra creada con éxito');
        setModalNuevaObra(false);
        cargarObras();
    };

    return (
        <div>
            <h1>Obras</h1>
            <button onClick={() => setModalNuevaObra(true)}>Nueva Obra</button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {obras.map((obra) => (
                        <tr key={obra.id}>
                            <td>{obra.nombre}</td>
                            <td>{obra.cliente}</td>
                            <td>{obra.estado}</td>
                            <td>{obra.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalNuevaObra && (
                <div className="modal">
                    <h2>Nueva Obra</h2>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nuevaObra.nombre}
                        onChange={(e) => setNuevaObra({ ...nuevaObra, nombre: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Cliente"
                        value={nuevaObra.cliente}
                        onChange={(e) => setNuevaObra({ ...nuevaObra, cliente: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Estado"
                        value={nuevaObra.estado}
                        onChange={(e) => setNuevaObra({ ...nuevaObra, estado: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Fecha"
                        value={nuevaObra.fecha}
                        onChange={(e) => setNuevaObra({ ...nuevaObra, fecha: e.target.value })}
                    />
                    <button onClick={handleCrearObra}>Guardar</button>
                    <button onClick={() => setModalNuevaObra(false)}>Cancelar</button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Obras;