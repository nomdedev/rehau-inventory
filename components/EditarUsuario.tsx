import { useState } from "react"
import { updateUsuario } from "@/lib/api/usuarios"

export default function EditarUsuario({ usuario, onClose, onUsuarioActualizado }) {
  const [nuevoNombre, setNuevoNombre] = useState(usuario.nombre)
  const [nuevaPassword, setNuevaPassword] = useState("")
  const [nuevoRol, setNuevoRol] = useState(usuario.rol)

  const handleSave = async () => {
    await updateUsuario(usuario.id, {
      nombre: nuevoNombre,
      password: nuevaPassword,
      rol: nuevoRol,
    })
    onClose() // Cerrar el modal
    onUsuarioActualizado() // Actualizar la lista de usuarios
  }

  return (
    <div>
      <input
        type="text"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="password"
        value={nuevaPassword}
        onChange={(e) => setNuevaPassword(e.target.value)}
        placeholder="Nueva contraseña"
      />
      <select
        value={nuevoRol}
        onChange={(e) => setNuevoRol(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
      </select>
      <button onClick={handleSave}>Guardar cambios</button>
    </div>
  )
}