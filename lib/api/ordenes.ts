import prisma from "@/lib/db"
import { logAccion } from "@/lib/api/auditoria"

export async function createOrden(data: {
  proveedor: string
  proyecto: string
  estado: string
  total: number
}) {
  const orden = await prisma.orden.create({ data })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "crear orden",
    modulo: "ordenes",
  })
  return orden
}
