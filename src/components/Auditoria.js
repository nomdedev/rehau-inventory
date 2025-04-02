import React, { useEffect, useState } from 'react';
import { getLogs } from '../api/auditoria';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auditoria = () => {
    const [logs, setLogs] = useState([]);
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [filtroModulo, setFiltroModulo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        cargarLogs();
    }, []);

    const cargarLogs = async () => {
        setIsLoading(true);
        try {
            const data = await getLogs();
            setLogs(data);
        } catch (error) {
            toast.error('Error al cargar los logs');
        } finally {
            setIsLoading(false);
        }
    };

    const logsFiltrados = logs.filter(
        (log) =>
            log.usuario.includes(filtroUsuario) &&
            log.modulo.includes(filtroModulo)
    );

    return (
        <div>
            <h1>Auditoría</h1>
            <div>
                <input
                    type="text"
                    placeholder="Filtrar por usuario"
                    value={filtroUsuario}
                    onChange={(e) => setFiltroUsuario(e.target.value)}
                    disabled={isLoading}
                />
                <input
                    type="text"
                    placeholder="Filtrar por módulo"
                    value={filtroModulo}
                    onChange={(e) => setFiltroModulo(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Acción</th>
                        <th>Módulo</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {logsFiltrados.map((log) => (
                        <tr key={log.id}>
                            <td>{log.usuario}</td>
                            <td>{log.accion}</td>
                            <td>{log.modulo}</td>
                            <td>{log.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Auditoria;