import React, { useState } from 'react';
import { prisma } from '../../prismaClient';
import { toast } from 'react-toastify'; // Importar toast para notificaciones.

interface NewInventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewInventoryForm: React.FC<NewInventoryFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carga.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createItemInventario({
        codigo: name,
        descripcion: description,
        largo: 0,
        stock: quantity || 0,
        stockMinimo: 0,
        nivel: 'A',
        ubicacion: 'Almacén',
      });
      toast.success('Material creado con éxito');
      onClose(); // Cerrar el formulario.
      setName('');
      setDescription('');
      setQuantity('');
    } catch (error) {
      toast.error('Error al crear el material');
      console.error('Error al crear el material:', error);
    } finally {
      setIsLoading(false);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewInventoryForm;
