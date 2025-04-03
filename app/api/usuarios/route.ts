// app/api/usuarios/route.ts
import { NextResponse } from 'next/server';
import { getConnection, sql } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Usuario');
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { nombre, email, password, rol } = await req.json();

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('nombre', sql.VarChar, nombre)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .input('rol', sql.VarChar, rol)
      .query(
        'INSERT INTO Usuario (nombre, email, password, rol) VALUES (@nombre, @email, @password, @rol)'
      );

    return NextResponse.json({ message: 'Usuario creado' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
  }
}
