import prisma from "@/lib/db"

export async function createOrden(data) {
  return prisma.orden.create({ data })
}
