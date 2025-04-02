import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json({ message: `GET usuario con ID ${id}` });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(params.id) },
      data,
    });
    return new Response(JSON.stringify(usuarioActualizado), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al actualizar usuario' }), { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.usuario.delete({ where: { id: Number(params.id) } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al eliminar usuario' }), { status: 500 });
  }
}
