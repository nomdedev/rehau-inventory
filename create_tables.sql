-- Tabla: Usuario
CREATE TABLE Usuario (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  email NVARCHAR(100) NOT NULL UNIQUE,
  password NVARCHAR(100) NOT NULL,
  rol NVARCHAR(50) NOT NULL -- 'admin', 'operador', 'visualizador'
);

-- Tabla: Obra
CREATE TABLE Obra (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  cliente NVARCHAR(100),
  direccion NVARCHAR(200),
  estado NVARCHAR(50),
  fechaInicio DATETIME NOT NULL,
  fechaFin DATETIME NULL
);

-- Tabla: Inventario
CREATE TABLE Inventario (
  id INT IDENTITY(1,1) PRIMARY KEY,
  codigo NVARCHAR(50) NOT NULL UNIQUE,
  descripcion NVARCHAR(200),
  cantidad INT NOT NULL,
  reservado INT DEFAULT 0,
  ubicacion NVARCHAR(100),
  fechaIngreso DATETIME DEFAULT GETDATE(),
  obraId INT NULL,
  CONSTRAINT FK_Inventario_Obra FOREIGN KEY (obraId) REFERENCES Obra(id)
);

-- Tabla: Orden
CREATE TABLE Orden (
  id INT IDENTITY(1,1) PRIMARY KEY,
  fecha DATETIME DEFAULT GETDATE(),
  proveedor NVARCHAR(100),
  estado NVARCHAR(50), -- 'Pendiente', 'Completada'
  usuarioId INT NOT NULL,
  CONSTRAINT FK_Orden_Usuario FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

-- Tabla: OrdenItem
CREATE TABLE OrdenItem (
  id INT IDENTITY(1,1) PRIMARY KEY,
  ordenId INT NOT NULL,
  materialId INT NOT NULL,
  cantidad INT NOT NULL,
  CONSTRAINT FK_OrdenItem_Orden FOREIGN KEY (ordenId) REFERENCES Orden(id),
  CONSTRAINT FK_OrdenItem_Material FOREIGN KEY (materialId) REFERENCES Inventario(id)
);

-- Tabla: Auditoria
CREATE TABLE Auditoria (
  id INT IDENTITY(1,1) PRIMARY KEY,
  usuarioId INT NOT NULL,
  accion NVARCHAR(100),
  modulo NVARCHAR(100),
  descripcion NVARCHAR(255),
  fecha DATETIME DEFAULT GETDATE(),
  CONSTRAINT FK_Auditoria_Usuario FOREIGN KEY (usuarioId) REFERENCES Usuario(id)
);

-- Asegurate de ejecutar esto en la base de datos `mpsInventory` en SQL Server.
-- Luego, desde Prisma podés usar `npx prisma introspect` para generar automáticamente el schema.
