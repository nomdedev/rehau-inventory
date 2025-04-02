import prisma from "@/lib/db"
import { logAccion } from "@/lib/api/auditoria"

export async function getInventario() {
  return await prisma.inventario.findMany()
}

export async function getItemInventario(id: number) {
  return await prisma.inventario.findUnique({ where: { id } })
}

export async function createItemInventario(data: {
  codigo: string
  descripcion: string
  largo: number
  stock: number
  stockMinimo: number
  nivel: string
  ubicacion: string
}) {
  const item = await prisma.inventario.create({ data })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "crear material",
    modulo: "inventario",
  })
  return item
}

export async function updateStock(id: number, stock: number) {
  const item = await prisma.inventario.update({
    where: { id },
    data: { stock },
  })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "actualizar stock",
    modulo: "inventario",
  })
  return item
}
