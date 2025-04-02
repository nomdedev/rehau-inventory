import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  }

  if (req.method === 'POST') {
    const { nombre, email, password, rol } = req.body;
    const nuevoUsuario = await prisma.usuario.create({
      data: { nombre, email, password, rol },
    });
    return res.status(201).json(nuevoUsuario);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
