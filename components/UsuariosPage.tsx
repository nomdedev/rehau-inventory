import React, { useState, useEffect } from "react";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "@/lib/api/usuarios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", password: "", rol: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState("admin"); // Cambiar dinámicamente según el usuario actual

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const handleGuardarUsuario = async () => {
    setIsLoading(true);
    try {
      if (usuarioEditando) {
        await updateUsuario(usuarioEditando.id, formData);
        toast.success("Usuario actualizado con éxito");
      } else {
        await createUsuario(formData);
        toast.success("Usuario creado con éxito");
      }
      setMostrarModal(false);
      cargarUsuarios();
    } catch (error) {
      toast.error("Error al guardar el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminarUsuario = async (id) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      setIsLoading(true);
      try {
        await deleteUsuario(id);
        toast.success("Usuario eliminado con éxito");
        cargarUsuarios();
      } catch (error) {
        toast.error("Error al eliminar el usuario");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <button onClick={() => setMostrarModal(true)} disabled={userRole !== "admin"}>
        Agregar Usuario
      </button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.rol}</td>
              <td>
                <button
                  onClick={() => {
                    setUsuarioEditando(usuario);
                    setMostrarModal(true);
                  }}
                  disabled={userRole !== "admin"}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminarUsuario(usuario.id)}
                  disabled={userRole !== "admin" || isLoading}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarModal && (
        <div className="modal">
          <h2>{usuarioEditando ? "Editar Usuario" : "Agregar Usuario"}</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <select
            value={formData.rol}
            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
          >
            <option value="">Seleccionar Rol</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <button onClick={handleGuardarUsuario}>Guardar</button>
          <button onClick={() => setMostrarModal(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
