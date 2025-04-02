import React, { useState, useEffect } from 'react';

interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'operador' | 'visualizador';
}

const FormUsuario: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formData, setFormData] = useState<Usuario>({ nombre: '', email: '', password: '', rol: 'visualizador' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch('/api/usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      setError('Error al cargar usuarios');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/usuarios/${formData.id}` : '/api/usuarios';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al guardar usuario');
      await fetchUsuarios();
      setFormData({ nombre: '', email: '', password: '', rol: 'visualizador' });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setFormData(usuario);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
      await fetchUsuarios();
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Usuarios</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="input"
          required={!isEditing}
        />
        <select
          value={formData.rol}
          onChange={(e) => setFormData({ ...formData, rol: e.target.value as Usuario['rol'] })}
          className="select"
        >
          <option value="admin">Admin</option>
          <option value="operador">Operador</option>
          <option value="visualizador">Visualizador</option>
        </select>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>
                <button onClick={() => handleEdit(usuario)} className="btn btn-secondary mr-2">
                  Editar
                </button>
                <button onClick={() => handleDelete(usuario.id!)} className="btn btn-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormUsuario;
