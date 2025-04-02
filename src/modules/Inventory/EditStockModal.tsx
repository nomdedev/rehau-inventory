import React, { useState } from 'react';
import { prisma } from '../../prismaClient';

interface EditStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: { id: number; nombre: string; cantidad: number };
  onStockUpdated: () => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({ isOpen, onClose, product, onStockUpdated }) => {
  const [newStock, setNewStock] = useState<number | ''>(product.cantidad);

  const handleSave = async () => {
    if (newStock === '') return;

    try {
      const difference = newStock - product.cantidad;

      // Actualizar el stock en la tabla Inventario.
      await prisma.inventario.update({
        where: { id: product.id },
        data: { cantidad: newStock },
      });

      // Registrar el movimiento en la tabla Movimiento.
      await prisma.movimiento.create({
        data: {
          productoId: product.id,
          cantidad: difference,
          descripcion: `Actualización de stock para ${product.nombre}`,
        },
      });

      onStockUpdated(); // Actualizar la lista de inventario en la UI.
      onClose();
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Editar Stock</h2>
        <p>Producto: {product.nombre}</p>
        <div>
          <label>Nuevo Stock:</label>
          <input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(Number(e.target.value))}
            required
          />
        </div>
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default EditStockModal;
