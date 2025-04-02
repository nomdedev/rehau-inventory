import React, { useState } from 'react';
import { createUsuario } from '../../api/usuarios'; // Importar la función de la API para crear usuario.
import { addAuditLog } from '../../utils/auditLog'; // Importar la función de auditoría.
import { toast } from 'react-toastify'; // Importar toast para notificaciones.

interface NewUserFormProps {
  onUserAdded: () => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carga.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createUsuario({
        nombre: name,
        password: password,
        rol: role,
      });
      toast.success('Usuario creado con éxito');
      onUserAdded(); // Notificar al componente padre.
      setName('');
      setPassword('');
      setRole('');
    } catch (error) {
      toast.error('Error al crear el usuario');
      console.error('Error al crear el usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rol:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Crear Usuario'}
      </button>
    </form>
  );
};

export default NewUserForm;
