import prisma from "@/lib/db"

export async function logAccion(data: {
  usuario: string
  accion: string
  modulo: string
}) {
  return await prisma.auditoria.create({
    data: {
      ...data,
      fecha: new Date(),
    },
  })
}

export async function getLogs() {
  return await prisma.auditoria.findMany({
    orderBy: { fecha: "desc" },
  })
}
