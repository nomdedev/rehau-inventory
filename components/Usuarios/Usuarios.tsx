import { useState, useEffect } from 'react';
import { Dialog } from 'shadcn/ui';
import { createUsuario, getUsuarios } from '../../lib/api';
import { toast } from 'react-toastify';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', contraseña: '', rol: '' });

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            toast.error('Error al cargar usuarios');
        }
    };

    const handleNuevoUsuario = async () => {
        setIsLoading(true);
        try {
            await createUsuario(formData);
            toast.success('Usuario creado con éxito');
            fetchUsuarios();
            setIsDialogOpen(false);
        } catch (error) {
            toast.error('Error al crear usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={() => setIsDialogOpen(true)}>Nuevo Usuario</button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleNuevoUsuario();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={formData.contraseña}
                        onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                        required
                    />
                    <select
                        value={formData.rol}
                        onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar rol</option>
                        <option value="admin">Admin</option>
                        <option value="user">Usuario</option>
                    </select>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                </form>
            </Dialog>
            {/* Renderizar lista de usuarios */}
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>{usuario.nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Usuarios;
