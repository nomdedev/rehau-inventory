import { prisma } from '../prismaClient';

export const addAuditLog = async (module: string, action: string, description: string) => {
  try {
    await prisma.auditoria.create({
      data: {
        modulo: module,
        accion: action,
        descripcion: description,
        fecha: new Date(),
      },
    });
  } catch (error) {
    console.error('Error al registrar en la auditoría:', error);
  }
};
