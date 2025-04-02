import React, { useState } from 'react';
import { prisma } from '../../prismaClient';

interface NewInventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewInventoryForm: React.FC<NewInventoryFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await prisma.inventario.create({
        data: {
          nombre: name,
          descripcion: description,
          cantidad: quantity || 0,
          precio: price || 0,
        },
      });
      onClose(); // Cerrar el formulario después de guardar.
      setName('');
      setDescription('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error al crear el perfil de inventario:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Agregar Nuevo Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default NewInventoryForm;
