# 📘 Rehau Inventory App – Guía de Dinámica Funcional

Este documento explica cómo funciona cada módulo de la aplicación web, qué hace cada botón, cómo se conecta con la base de datos y cómo reconstruir todo el sistema desde Vercel usando un solo prompt.

---

## 📁 Estructura del Proyecto

- `/app/dashboard/*`: Contiene cada módulo (usuarios, inventario, obras, órdenes, auditoría)
- `/components`: Contiene los componentes reutilizables y UI (modales, inputs, tablas)
- `/lib/api/`: Lógica de conexión a la base de datos con Prisma para cada módulo
- `/prisma/schema.prisma`: Define los modelos y estructura SQL Server
- `.env.local`: Configuración de conexión a la base

---

## 🔐 Autenticación

- El login requiere nombre de usuario y contraseña
- El usuario "admin" (contraseña "mps.1887") tiene privilegios para ver y editar todo
- Usuarios con rol "viewer" solo pueden visualizar

---

## 🔁 Módulos y Funcionalidades

### 👤 Usuarios

- Ver listado de usuarios
- **Agregar**: abre modal con campos para nombre, contraseña y rol (admin/viewer)
- **Editar**: carga datos en el modal y permite modificar
- **Eliminar**: muestra confirmación antes de borrar y actualiza la tabla

### 📦 Inventario

- Ver listado de materiales (código, descripción, largo, stock, etc.)
- **Agregar perfil**: abre formulario completo y guarda en la base
- **Editar stock**: botón que abre input/modificador de cantidad
- **QR**: genera y muestra código QR de cada material

### 🏗 Obras

- Ver listado de proyectos
- **Agregar proyecto**: abre otra página o modal con campos (nombre, cliente, dirección, estado, fecha)
- **Ver detalles**: muestra información completa, materiales asignados y su estado

### 🧾 Órdenes

- Listado de órdenes con proveedor, proyecto, total y estado
- **Nueva orden**: abre modal con formulario
- Botones para imprimir o exportar (pendientes)

### 🕵️ Auditoría

- Muestra el historial completo de acciones realizadas por los usuarios
- Incluye filtros por módulo o usuario

---

## 🛠 Prompt para reconstrucción completa en Vercel

Usar este prompt en v0.dev o Copilot para generar nuevamente la app:

```
Quiero crear una aplicación web de inventario de perfiles PVC para Rehau, usando Next.js, Prisma y SQL Server Express. 
La app debe incluir autenticación con rol de administrador y visualizador. 
Cada módulo (usuarios, inventario, obras, órdenes, auditoría) debe tener un dashboard donde se pueda:

- Listar elementos
- Agregar nuevos elementos (con modales)
- Editar elementos (con campos prellenados)
- Eliminar elementos (con confirmación)
- Ver detalles (abrir nueva vista o modal)

Cada botón debe estar conectado con lógica funcional real. 
Al guardar debe actualizar la lista y mostrar toasts de confirmación o error. 
Usar shadcn/ui para los componentes. 
Conectar todo a SQL Server Express usando Prisma. 
El usuario admin debe poder gestionar los demás usuarios y sus privilegios. 
Exportar boletas en PDF o códigos QR es una funcionalidad futura.

Configurar todo para que funcione en Vercel con variables de entorno, postinstall de Prisma y autenticación básica.
```

---

## ⚙️ Cómo iniciar el proyecto localmente

1. Clonar repo
2. Instalar dependencias `npm install`
3. Crear `.env.local` con:
```
DATABASE_URL="sqlserver://localhost\SQLEXPRESS;database=rehau_inventory;user=sa;password=mps.1887;trustServerCertificate=true"
```
4. Correr Prisma
```
npx prisma migrate dev --name init
npx prisma generate
```
5. Iniciar app
```
npm run dev
```

---

## ✅ Estado del proyecto

- Funcionalidad visual conectada a la lógica
- Conexión a base SQL Server Express
- Diseño modular y extensible
- Listo para desplegar o seguir desarrollando

---

## 📌 Repositorio

https://github.com/nomdedev/rehau-inventory