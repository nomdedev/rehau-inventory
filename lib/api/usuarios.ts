import prisma from "@/lib/db"
import { logAccion } from "@/lib/api/auditoria"

export async function getUsuarios() {
  const response = await fetch("/api/usuarios")
  if (!response.ok) {
    throw new Error("Error al obtener los usuarios")
  }
  return response.json()
}

export async function createUsuario(data) {
  return prisma.usuario.create({ data })
}

export async function updateUsuario(id, data) {
  const usuario = await prisma.usuario.update({
    where: { id },
    data,
  })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "editar usuario",
    modulo: "usuarios",
  })
  return usuario
}

export async function deleteUsuario(id) {
  const usuario = await prisma.usuario.delete({
    where: { id },
  })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "eliminar usuario",
    modulo: "usuarios",
  })
  return usuario
}
