import React, { useState, useEffect } from 'react';
import { prisma } from '../../prismaClient';

interface AssignMaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: { id: number; nombre: string };
}

const AssignMaterialsModal: React.FC<AssignMaterialsModalProps> = ({ isOpen, onClose, project }) => {
  const [inventory, setInventory] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [quantity, setQuantity] = useState<number | ''>('');

  const fetchInventory = async () => {
    try {
      const productos = await prisma.inventario.findMany();
      setInventory(productos);
    } catch (error) {
      console.error('Error al cargar el inventario:', error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchInventory();
  }, [isOpen]);

  const handleAssignMaterial = async () => {
    if (!selectedMaterial || quantity === '' || quantity <= 0) {
      alert('Selecciona un material y una cantidad válida.');
      return;
    }

    if (quantity > selectedMaterial.cantidad) {
      alert('La cantidad asignada no puede ser mayor al stock disponible.');
      return;
    }

    try {
      // Registrar el movimiento en la tabla Movimiento.
      await prisma.movimiento.create({
        data: {
          productoId: selectedMaterial.id,
          obraId: project.id,
          cantidad: -quantity,
          descripcion: `Asignación de ${quantity} unidades a la obra ${project.nombre}`,
        },
      });

      // Actualizar el stock en la tabla Inventario.
      await prisma.inventario.update({
        where: { id: selectedMaterial.id },
        data: { cantidad: selectedMaterial.cantidad - quantity },
      });

      alert('Material asignado con éxito.');
      onClose();
    } catch (error) {
      console.error('Error al asignar el material:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Asignar Materiales a {project.nombre}</h2>
        <div>
          <label>Material:</label>
          <select
            value={selectedMaterial?.id || ''}
            onChange={(e) =>
              setSelectedMaterial(inventory.find((item) => item.id === Number(e.target.value)))
            }
          >
            <option value="" disabled>
              Selecciona un material
            </option>
            {inventory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre} (Stock: {item.cantidad})
              </option>
            ))}
          </select>
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
        <button onClick={handleAssignMaterial}>Asignar</button>
      </div>
    </div>
  );
};

export default AssignMaterialsModal;
