import React, { useEffect, useState } from 'react';
import { getInventario, createItemInventario, updateStock } from '../api/inventario';
import { ToastContainer, toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import 'react-toastify/dist/ReactToastify.css';

const Inventario = () => {
    const [materiales, setMateriales] = useState([]);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState({ abierto: false, id: null });
    const [modalQR, setModalQR] = useState({ abierto: false, codigo: '' });
    const [nuevoMaterial, setNuevoMaterial] = useState({ codigo: '', descripcion: '', stock: '', ubicacion: '' });
    const [nuevoStock, setNuevoStock] = useState('');

    useEffect(() => {
        cargarInventario();
    }, []);

    const cargarInventario = async () => {
        const data = await getInventario();
        setMateriales(data);
    };

    const handleAgregar = async () => {
        await createItemInventario(nuevoMaterial);
        toast.success('Material agregado con éxito');
        setModalAgregar(false);
        cargarInventario();
    };

    const handleEditarStock = async () => {
        await updateStock(modalEditar.id, nuevoStock);
        toast.success('Stock actualizado con éxito');
        setModalEditar({ abierto: false, id: null });
        cargarInventario();
    };

    const handleCopiarCodigo = () => {
        navigator.clipboard.writeText(modalQR.codigo);
        toast.success('Código copiado al portapapeles');
    };

    const handleImprimirQR = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<div style="text-align: center; margin-top: 50px;">
            <QRCode value="${modalQR.codigo}" />
            <p>${modalQR.codigo}</p>
        </div>`);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div>
            <h1>Inventario</h1>
            <button onClick={() => setModalAgregar(true)}>Agregar Nuevo Perfil</button>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materiales.map((material) => (
                        <tr key={material.id}>
                            <td>{material.codigo}</td>
                            <td>{material.descripcion}</td>
                            <td>{material.stock}</td>
                            <td>{material.ubicacion}</td>
                            <td>
                                <button onClick={() => setModalEditar({ abierto: true, id: material.id })}>
                                    Editar Stock
                                </button>
                                <button onClick={() => setModalQR({ abierto: true, codigo: material.codigo })}>
                                    Ver QR
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAgregar && (
                <div className="modal">
                    <h2>Agregar Nuevo Material</h2>
                    <input
                        type="text"
                        placeholder="Código"
                        value={nuevoMaterial.codigo}
                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, codigo: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={nuevoMaterial.descripcion}
                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, descripcion: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={nuevoMaterial.stock}
                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, stock: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Ubicación"
                        value={nuevoMaterial.ubicacion}
                        onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, ubicacion: e.target.value })}
                    />
                    <button onClick={handleAgregar}>Guardar</button>
                    <button onClick={() => setModalAgregar(false)}>Cancelar</button>
                </div>
            )}

            {modalEditar.abierto && (
                <div className="modal">
                    <h2>Editar Stock</h2>
                    <input
                        type="number"
                        placeholder="Nuevo Stock"
                        value={nuevoStock}
                        onChange={(e) => setNuevoStock(e.target.value })}
                    />
                    <button onClick={handleEditarStock}>Guardar</button>
                    <button onClick={() => setModalEditar({ abierto: false, id: null })}>Cancelar</button>
                </div>
            )}

            {modalQR.abierto && (
                <div className="modal">
                    <h2>Código QR</h2>
                    <QRCode value={modalQR.codigo} />
                    <p>{modalQR.codigo}</p>
                    <button onClick={handleCopiarCodigo}>Copiar Código</button>
                    <button onClick={handleImprimirQR}>Imprimir QR</button>
                    <button onClick={() => setModalQR({ abierto: false, codigo: '' })}>Cerrar</button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Inventario;
