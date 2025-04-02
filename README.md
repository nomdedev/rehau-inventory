# Rehau Inventory

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   DATABASE_URL="sqlserver://sa:mps1887@localhost:1433/rehau_inventory?encrypt=false&trustServerCertificate=true"
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Genera el cliente de Prisma:
   ```
   npx prisma generate
   ```

4. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```
   npx prisma migrate dev --name init
   ```

## Ejecución

1. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

2. Accede a la aplicación en `http://localhost:3000`.

## Endpoints

- **Usuarios**
  - `GET /api/usuarios`: Obtener todos los usuarios.
  - `GET /api/usuarios/[id]`: Obtener un usuario por ID.
  - `POST /api/usuarios`: Crear un nuevo usuario.
  - `PUT /api/usuarios/[id]`: Actualizar un usuario.
  - `DELETE /api/usuarios/[id]`: Eliminar un usuario.

- **Inventario**, **Obras**, **Órdenes**, etc.: Similar a los endpoints de usuarios.
