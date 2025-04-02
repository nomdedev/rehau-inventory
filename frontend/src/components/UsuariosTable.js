import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
} from "@/lib/api/usuarios";
import Dialog from '@mui/material/Dialog';

function UsuariosTable({ usuarios, actualizarUsuarios }) {
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [modoEditar, setModoEditar] = useState(null);
    const [formData, setFormData] = useState({});
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleEditar = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModoEditar(usuario.id);
        setFormData({ ...usuario });
        setMostrarModal(true);
    };

    const handleGuardar = async () => {
        try {
            await updateUsuario(modoEditar, formData);
            actualizarUsuarios();
            toast.success('Usuario actualizado con éxito');
            setMostrarModal(false);
            setUsuarioSeleccionado(null);
            setModoEditar(null);
        } catch (error) {
            console.error('Error al actualizar el usuario', error);
            toast.error('Error al actualizar el usuario');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setUsuarioSeleccionado(null);
        setModoEditar(null);
    };

    const handleEliminar = async (id) => {
        try {
            await deleteUsuario(id);
            toast.success('Usuario eliminado con éxito');
            actualizarUsuarios();
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
            toast.error('Error al eliminar el usuario');
        }
    };

    return (
        <div>
            <table>
                {/* ...existing code... */}
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            {/* ...existing code... */}
                            <td>
                                <button onClick={() => handleEditar(usuario)}>Editar</button>
                                <button onClick={() => handleEliminar(usuario.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog open={mostrarModal} onClose={cerrarModal}>
                <div className="modal-content">
                    <h3>Editar Usuario</h3>
                    <form>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre || ''}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="button" onClick={handleGuardar}>
                            Guardar
                        </button>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}

export default UsuariosTable;