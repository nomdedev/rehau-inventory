# 🧩 Manual de Desarrollo – Rehau Inventory App

Este documento guía a cualquier desarrollador para instalar, correr, mantener y extender el sistema de gestión de inventario de perfiles Rehau. Está pensado para entornos de desarrollo locales usando **SQL Server Express** como base de datos y **Prisma** como ORM.

---

## 📁 Estructura del Proyecto

/app
  /dashboard
    /inventario
    /obras
    /ordenes
    /usuarios
    /auditoria
/components
  /ui
/lib
  /api      <-- Funciones que acceden a la base de datos
  /db.ts    <-- PrismaClient
/contexts
/prisma
  schema.prisma
.env.local

---

## 🧱 Requisitos previos

- Node.js ≥ 18.x
- SQL Server Express instalado (modo autenticación SQL habilitado)
- Cuenta `sa` habilitada o usuario personalizado
- Puerto TCP habilitado

---

## ⚙️ Instalación paso a paso

1. Clonar el proyecto

git clone https://github.com/nomdedev/inventario.app.git
cd inventario.app

2. Instalar dependencias

npm install

3. Configurar la conexión a la base de datos

Crear el archivo `.env.local`:

DATABASE_URL="sqlserver://localhost\SQLEXPRESS;database=rehau_inventory;user=sa;password=TU_CONTRASEÑA;trustServerCertificate=true"

> ⚠️ Reemplazar `TU_CONTRASEÑA` y adaptar `SQLEXPRESS` si usás otra instancia.

---

## 🧪 Migraciones de Prisma

1. Inicializar base de datos

npx prisma migrate dev --name init
npx prisma generate

---

## 📦 Modelos Prisma (`prisma/schema.prisma`)

Incluye:

- Usuario: nombre, contraseña, rol (admin/viewer)
- Inventario: código, descripción, largo, stock, ubicación, nivel
- Orden: proveedor, proyecto, total, estado
- Obra: nombre, cliente, dirección, fecha
- Movimiento: entradas/salidas de materiales por obra
- Auditoria: log de acciones (crear, editar, eliminar)

> Todos los modelos están ajustados para SQL Server (`@db.VarChar`, `@db.Float`, etc).

---

## 🧠 Flujo modular por componente

Usuarios: listado, creación, edición, eliminación, protección de admin  
Inventario: agregar, editar, visualizar QR  
Obras: gestión de obras y asignación de materiales  
Órdenes: creación y exportación a PDF  
Auditoría: historial de acciones  

---

## 📤 Lógica backend en `/lib/api/`

Cada módulo tiene su archivo de API (TS):

/lib/api/usuarios.ts  
/lib/api/inventario.ts  
/lib/api/obras.ts  
/lib/api/ordenes.ts  
/lib/api/auditoria.ts

---

## 🔐 Seguridad

- Acceso protegido por login
- Usuarios viewer no pueden modificar
- Admins pueden editar todo

---

## 📌 Cosas por hacer

- ✅ Autenticación básica
- ✅ Módulos funcionales conectados
- ⬜ PDF para remitos
- ⬜ Escaneo QR
- ⬜ Exportación Excel
- ⬜ Notificaciones por stock bajo

---

## 🧰 Scripts útiles

npm run dev       # Ejecutar en local  
npx prisma studio # Visualizar datos  
npx prisma db pull # Traer cambios desde base existente

---

## 🛠 Contacto

Dev: [tu nombre]  
Repo: github.com/nomdedev/inventario.app