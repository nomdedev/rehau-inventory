import { useState } from 'react';

export default function UsuarioForm({ onSubmit, initialData = {} }) {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState(initialData.rol || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, email, password, rol });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={rol} onChange={(e) => setRol(e.target.value)} required>
        <option value="">Seleccionar Rol</option>
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
}
