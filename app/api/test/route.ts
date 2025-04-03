// app/api/test/route.ts
import { NextResponse } from 'next/server'
import { poolPromise, sql } from '@/lib/db'

export async function GET() {
  try {
    const pool = await poolPromise
    const result = await pool.request().query('SELECT GETDATE() as fecha')
    return NextResponse.json({ success: true, fecha: result.recordset[0].fecha })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error })
  }
}
