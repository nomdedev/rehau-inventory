import { deleteUsuario } from "@/lib/api/usuarios"

export default function ListaUsuarios({ usuarios, onUsuarioEliminado }) {
  const handleDelete = async (usuarioId) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      await deleteUsuario(usuarioId)
      onUsuarioEliminado() // Refrescar la tabla de usuarios
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.rol}</td>
            <td>
              <button onClick={() => handleDelete(usuario.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}