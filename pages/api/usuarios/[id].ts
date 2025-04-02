import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    return res.status(200).json(usuario);
  }

  if (req.method === 'PUT') {
    const { nombre, email, password, rol } = req.body;
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, email, password, rol },
    });
    return res.status(200).json(usuarioActualizado);
  }

  if (req.method === 'DELETE') {
    await prisma.usuario.delete({ where: { id: Number(id) } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
