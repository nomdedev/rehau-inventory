import React, { useState, useEffect } from 'react';
import NewUserForm from './NewUserForm';
import EditUserModal from './EditUserModal';
import { prisma } from '../../prismaClient';
import { addAuditLog } from '../../utils/auditLog'; // Importar la función de auditoría.

const UsersModule: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const usuarios = await prisma.usuario.findMany();
      setUsers(usuarios);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: number) => {
    if (userId === 1) {
      alert('El usuario admin no puede ser eliminado.');
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;

    try {
      const user = users.find((u) => u.id === userId);
      await prisma.usuario.delete({
        where: { id: userId },
      });

      await addAuditLog('Usuarios', 'eliminar', `Usuario eliminado: ${user.nombre}`); // Registrar en auditoría.
      fetchUsers(); // Actualizar la lista de usuarios.
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <NewUserForm onUserAdded={fetchUsers} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nombre} - {user.rol}
            <button onClick={() => handleEditClick(user)}>Editar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          user={selectedUser}
          onUserUpdated={fetchUsers}
        />
      )}
    </div>
  );
};

export default UsersModule;
