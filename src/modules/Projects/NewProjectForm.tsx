import React, { useState } from 'react';
import { prisma } from '../../prismaClient';
import { toast } from 'react-toastify'; // Importar toast para notificaciones.

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ isOpen, onClose, onProjectAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carga.

  const createObra = async (data: any) => {
    await prisma.obra.create({ data });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createObra({
        nombre: name,
        cliente: description,
        direccion: location,
        estado: 'Pendiente',
        fecha: new Date(),
      });
      toast.success('Proyecto creado con éxito');
      onProjectAdded(); // Actualizar la lista de obras.
      onClose(); // Cerrar el formulario.
      setName('');
      setDescription('');
      setLocation('');
    } catch (error) {
      toast.error('Error al crear el proyecto');
      console.error('Error al crear la obra:', error);
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
        <h2>Nueva Obra</h2>
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
            <label>Ubicación:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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

export default NewProjectForm;
