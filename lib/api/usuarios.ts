import prisma from "@/lib/db"
import { logAccion } from "@/lib/api/auditoria"

export async function getUsuarios() {
  return await prisma.usuario.findMany()
}

export async function createUsuario(data: {
  nombre: string
  password: string
  rol: string
}) {
  const usuario = await prisma.usuario.create({ data })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "crear usuario",
    modulo: "usuarios",
  })
  return usuario
}

export async function updateUsuario(id: number, data: {
  nombre?: string
  password?: string
  rol?: string
}) {
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

export async function deleteUsuario(id: number) {
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
