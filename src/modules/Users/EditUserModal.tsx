import React, { useState } from 'react';
import { prisma } from '../../prismaClient';
import { addAuditLog } from '../../utils/auditLog'; // Importar la función de auditoría.

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: number; nombre: string; contraseña: string; rol: string };
  onUserUpdated: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onUserUpdated }) => {
  const [name, setName] = useState(user.nombre);
  const [password, setPassword] = useState(user.contraseña);
  const [role, setRole] = useState(user.rol);

  const handleSave = async () => {
    try {
      await prisma.usuario.update({
        where: { id: user.id },
        data: {
          nombre: name,
          contraseña: password,
          rol: role,
        },
      });

      await addAuditLog('Usuarios', 'editar', `Usuario editado: ${name}`); // Registrar en auditoría.
      onUserUpdated(); // Notificar al componente padre para recargar la lista de usuarios.
      onClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Editar Usuario</h2>
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
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default EditUserModal;
