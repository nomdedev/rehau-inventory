import { useState } from "react"
import { createUsuario, getUsuarios, deleteUsuario } from "@/lib/api/usuarios"
import { toast } from "@/components/ui/use-toast"
import useSWR from "swr"

export default function NuevoUsuario({ onClose, onUsuarioCreado }) {
  const [nombreInput, setNombreInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [rolSeleccionado, setRolSeleccionado] = useState("")
  const { data: usuarios, mutate } = useSWR("usuarios", getUsuarios)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createUsuario({
        nombre: nombreInput,
        password: passwordInput,
        rol: rolSeleccionado,
      })
      toast({
        title: "¡Acción realizada!",
        description: "El usuario fue creado correctamente.",
      })
      mutate() // Refrescar los datos automáticamente
      onClose() // Cerrar el modal
      onUsuarioCreado() // Actualizar la lista de usuarios
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear",
        description: "No se pudo guardar el nuevo usuario.",
      })
    }
  }

  const handleDelete = async (usuarioId) => {
    try {
      await deleteUsuario(usuarioId)
      toast({
        title: "¡Usuario eliminado!",
        description: "El usuario fue eliminado correctamente.",
      })
      mutate() // Refrescar los datos automáticamente
      // Alternativamente, actualizar el estado local manualmente:
      // setUsuarios((prev) => prev.filter((u) => u.id !== usuarioId))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: "No se pudo eliminar el usuario.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombreInput}
        onChange={(e) => setNombreInput(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Contraseña"
      />
      <select
        value={rolSeleccionado}
        onChange={(e) => setRolSeleccionado(e.target.value)}
      >
        <option value="">Seleccionar rol</option>
        <option value="admin">Admin</option>
        <option value="user">Usuario</option>
      </select>
      <button type="submit">Guardar</button>
    </form>
  )
}