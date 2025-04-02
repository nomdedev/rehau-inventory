"use client"

import { useState } from "react"
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "@/lib/api/usuarios"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import useSWR from "swr"

export default function UsuariosPage() {
  const { data: usuarios, mutate } = useSWR("usuarios", getUsuarios)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [nombreInput, setNombreInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [rolSeleccionado, setRolSeleccionado] = useState("")
  const [usuarioEditando, setUsuarioEditando] = useState(null)

  const handleCrearUsuario = async () => {
    try {
      await createUsuario({
        nombre: nombreInput,
        password: passwordInput,
        rol: rolSeleccionado,
      })
      toast({
        title: "¡Usuario creado!",
        description: "El usuario fue creado correctamente.",
      })
      mutate()
      setMostrarModal(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear",
        description: "No se pudo crear el usuario.",
      })
    }
  }

  const handleEliminarUsuario = async (usuarioId) => {
    try {
      await deleteUsuario(usuarioId)
      toast({
        title: "¡Usuario eliminado!",
        description: "El usuario fue eliminado correctamente.",
      })
      mutate()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: "No se pudo eliminar el usuario.",
      })
    }
  }

  const handleEditarUsuario = async () => {
    try {
      await updateUsuario(usuarioEditando.id, {
        nombre: nombreInput,
        password: passwordInput,
        rol: rolSeleccionado,
      })
      toast({
        title: "¡Usuario actualizado!",
        description: "El usuario fue actualizado correctamente.",
      })
      mutate()
      setMostrarModal(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: "No se pudo actualizar el usuario.",
      })
    }
  }

  return (
    <div>
      <Button onClick={() => setMostrarModal(true)}>Crear Usuario</Button>
      <ul>
        {usuarios?.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.rol}
            <Button onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</Button>
            <Button
              onClick={() => {
                setUsuarioEditando(usuario)
                setNombreInput(usuario.nombre)
                setRolSeleccionado(usuario.rol)
                setMostrarModal(true)
              }}
            >
              Editar
            </Button>
          </li>
        ))}
      </ul>

      {mostrarModal && (
        <Dialog open={mostrarModal} onOpenChange={setMostrarModal}>
          <DialogContent>
            <DialogHeader>{usuarioEditando ? "Editar Usuario" : "Crear Usuario"}</DialogHeader>
            <Input
              placeholder="Nombre"
              value={nombreInput}
              onChange={(e) => setNombreInput(e.target.value)}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <select
              value={rolSeleccionado}
              onChange={(e) => setRolSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Admin</option>
              <option value="user">Usuario</option>
            </select>
            <Button onClick={usuarioEditando ? handleEditarUsuario : handleCrearUsuario}>
              {usuarioEditando ? "Actualizar" : "Crear"}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
