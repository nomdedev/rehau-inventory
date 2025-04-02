import React, { useState } from 'react';
import { prisma } from '../../prismaClient';

interface NewProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ isOpen, onClose, onProjectAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await prisma.obra.create({
        data: {
          nombre: name,
          descripcion: description,
          ubicacion: location,
        },
      });
      onProjectAdded(); // Actualizar la lista de obras.
      onClose(); // Cerrar el formulario.
      alert('Obra creada con éxito'); // Mostrar un toast de éxito.
      setName('');
      setDescription('');
      setLocation('');
    } catch (error) {
      console.error('Error al crear la obra:', error);
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
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectForm;
