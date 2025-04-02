import prisma from "@/lib/db"
import { logAccion } from "@/lib/api/auditoria"

export async function getObras() {
  return await prisma.obra.findMany()
}

export async function createObra(data: {
  nombre: string
  cliente: string
  direccion: string
  estado: string
  fecha: Date
}) {
  const obra = await prisma.obra.create({ data })
  await logAccion({
    usuario: "nombreUsuarioActual", // Reemplazar con el usuario actual
    accion: "crear obra",
    modulo: "obras",
  })
  return obra
}

import prisma from '../prisma';

export async function getObra(id: string) {
    try {
        const obra = await prisma.obra.findUnique({
            where: { id },
            include: {
                materiales: true,
                herrajes: true,
            },
        });
        if (!obra) {
            throw new Error('Obra no encontrada');
        }
        return obra;
    } catch (error) {
        console.error('Error al obtener la obra:', error);
        throw error;
    }
}
