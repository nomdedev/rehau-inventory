import { prisma } from '../prisma';

// ...existing code...

export const createUsuario = async (data) => {
    return await prisma.usuario.create({
        data,
    });
};

export const getUsuarios = async () => {
    return await prisma.usuario.findMany();
};
