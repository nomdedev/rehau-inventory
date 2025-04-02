import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
      if (!usuario) return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
      return new Response(JSON.stringify(usuario), { status: 200 });
    }

    const usuarios = await prisma.usuario.findMany();
    return new Response(JSON.stringify(usuarios), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener usuarios' }), { status: 500 });
  }
}

export async function GET() {
    return NextResponse.json({ message: 'GET usuarios' });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const nuevoUsuario = await prisma.usuario.create({ data });
    return new Response(JSON.stringify(nuevoUsuario), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al crear usuario' }), { status: 500 });
  }
}

export async function POST(request: Request) {
    const body = await request.json();
    return NextResponse.json({ message: 'POST usuarios', data: body });
}
