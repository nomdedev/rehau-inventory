## 🔗 Conexión con Base de Datos (PostgreSQL + Prisma)

La aplicación está preparada para conectarse a una base de datos PostgreSQL usando Prisma como ORM.

---

### 1. Instalar dependencias

```bash
npm install prisma @prisma/client
```

### 2. Configurar la conexión

Asegúrate de tener un archivo `.env` en la raíz del proyecto con la variable `DATABASE_URL` configurada. Ejemplo:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
```

### 3. Generar el cliente de Prisma

Ejecuta el siguiente comando para generar el cliente de Prisma:

```bash
npx prisma generate
```

### 4. Migrar el esquema a la base de datos

Aplica las migraciones a la base de datos con el siguiente comando:

```bash
npx prisma migrate dev --name init
```

### 5. Verificar la conexión

Puedes verificar la conexión a la base de datos ejecutando el siguiente comando:

```bash
npx prisma db pull
```

Esto sincronizará el esquema de la base de datos con el archivo `schema.prisma`.
