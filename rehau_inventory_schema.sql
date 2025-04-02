USE rehau_inventory;
GO

CREATE TABLE usuarios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  password NVARCHAR(100) NOT NULL,
  rol NVARCHAR(50) NOT NULL
);
-- Agregá el resto si querés las demás tablas (te las paso cuando quieras)
