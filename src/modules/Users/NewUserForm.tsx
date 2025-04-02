import React, { useState } from 'react';
import { prisma } from '../../prismaClient';
import { addAuditLog } from '../../utils/auditLog'; // Importar la función de auditoría.

interface NewUserFormProps {
  onUserAdded: () => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await prisma.usuario.create({
        data: {
          nombre: name,
          contraseña: password,
          rol: role,
        },
      });

      await addAuditLog('Usuarios', 'crear', `Usuario creado: ${name}`); // Registrar en auditoría.
      onUserAdded(); // Notificar al componente padre para recargar la lista de usuarios.
      setName('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
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
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default NewUserForm;
