import React, { useState, useEffect } from 'react';
import NewProjectForm from './NewProjectForm';
import AssignMaterialsModal from './AssignMaterialsModal';

const ProjectsModule: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [isNewFormOpen, setNewFormOpen] = useState(false);
  const [isAssignMaterialsModalOpen, setAssignMaterialsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const fetchProjects = async () => {
    try {
      const obras = await prisma.obra.findMany();
      setProjects(obras);
    } catch (error) {
      console.error('Error al cargar las obras:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenNewForm = () => {
    setNewFormOpen(true);
  };

  const handleCloseNewForm = () => {
    setNewFormOpen(false);
  };

  const handleOpenAssignMaterialsModal = (project: any) => {
    setSelectedProject(project);
    setAssignMaterialsModalOpen(true);
  };

  const handleCloseAssignMaterialsModal = () => {
    setAssignMaterialsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <h1>Gestión de Obras</h1>
      <button onClick={handleOpenNewForm}>Nueva Obra</button>
      <NewProjectForm isOpen={isNewFormOpen} onClose={handleCloseNewForm} onProjectAdded={fetchProjects} />
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.nombre}
            <button onClick={() => handleOpenAssignMaterialsModal(project)}>Asignar Materiales</button>
          </li>
        ))}
      </ul>
      {selectedProject && (
        <AssignMaterialsModal
          isOpen={isAssignMaterialsModalOpen}
          onClose={handleCloseAssignMaterialsModal}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectsModule;
