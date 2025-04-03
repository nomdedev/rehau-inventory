// lib/db.ts

import sql from 'mssql';

const config = {
  user: 'sa',
  password: 'mps1887',
  server: 'localhost',
  database: 'mpsInventory',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('Error al conectar con SQL Server:', err);
    throw err;
  }
}

export { sql };

