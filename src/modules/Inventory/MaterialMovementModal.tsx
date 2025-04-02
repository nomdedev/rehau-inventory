import React, { useState } from 'react';
import { prisma } from '../../prismaClient';

interface MaterialMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: { id: number; nombre: string; cantidad: number };
  type: 'entrada' | 'salida';
  onMovementCompleted: () => void;
}

const MaterialMovementModal: React.FC<MaterialMovementModalProps> = ({ isOpen, onClose, product, type, onMovementCompleted }) => {
  const [quantity, setQuantity] = useState<number | ''>('');

  const handleSave = async () => {
    if (quantity === '' || quantity <= 0) {
      alert('Ingresa una cantidad válida.');
      return;
    }

    if (type === 'salida' && quantity > product.cantidad) {
      alert('La cantidad de salida no puede ser mayor al stock disponible.');
      return;
    }

    try {
      const newStock = type === 'entrada' ? product.cantidad + quantity : product.cantidad - quantity;

      // Actualizar el stock en la tabla Inventario.
      await prisma.inventario.update({
        where: { id: product.id },
        data: { cantidad: newStock },
      });

      // Registrar el movimiento en la tabla Movimiento.
      await prisma.movimiento.create({
        data: {
          productoId: product.id,
          cantidad: type === 'entrada' ? quantity : -quantity,
          descripcion: `${type === 'entrada' ? 'Entrada' : 'Salida'} de ${quantity} unidades para ${product.nombre}`,
          fecha: new Date(),
        },
      });

      alert('Movimiento registrado con éxito.');
      onMovementCompleted(); // Actualizar la lista de inventario.
      onClose();
    } catch (error) {
      console.error('Error al registrar el movimiento:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{type === 'entrada' ? 'Entrada de Material' : 'Salida de Material'}</h2>
        <p>Producto: {product.nombre}</p>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>
        <button onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
};

export default MaterialMovementModal;
