"use client"

import React, { useState, useEffect } from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ClipboardList, Building } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { inventory, orders, projects } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { createUsuario, updateUsuario, deleteUsuario, getUsuarios } from "@/lib/api/usuarios";
import { createItemInventario, updateStock, createObra, createOrden } from "@/lib/api";

export default function DashboardPage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession(authOptions);
      if (!sessionData) {
        redirect("/login");
      } else {
        setSession(sessionData);
      }
    };
    fetchSession();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "", role: "viewer" });
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState(""); // "inventario", "obra", "orden"

  if (!session) {
    return null; // Renderiza nada mientras se verifica la sesión
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const openCreateModal = () => {
    setIsEditMode(false);
    setFormData({ username: "", password: "", role: "viewer" });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setFormData({ username: user.username, password: "", role: user.role });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await updateUsuario(selectedUser.id, formData);
        toast({ title: "Usuario actualizado", description: "El usuario fue actualizado exitosamente." });
      } else {
        if (!formData.username || !formData.password) {
          toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
          return;
        }
        await createUsuario(formData);
        toast({ title: "Usuario creado", description: "El usuario fue creado exitosamente." });
      }
      setIsModalOpen(false);
      await getUsuarios(); // Actualizar lista
    } catch (error) {
      toast({ title: "Error", description: "No se pudo guardar el usuario.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUsuario(id);
        toast({ title: "Usuario eliminado", description: "El usuario fue eliminado exitosamente." });
        await getUsuarios(); // Actualizar lista
      } catch (error) {
        toast({ title: "Error", description: "No se pudo eliminar el usuario.", variant: "destructive" });
      }
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleSaveModal = async () => {
    setIsLoading(true);
    try {
      if (modalType === "inventario") {
        if (!formData.nombre || !formData.stock) {
          toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
          return;
        }
        await createItemInventario({ nombre: formData.nombre, stock: parseInt(formData.stock, 10) });
        toast({ title: "Perfil agregado", description: "El perfil fue agregado exitosamente." });
      } else if (modalType === "obra") {
        if (!formData.nombre || !formData.direccion) {
          toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
          return;
        }
        await createObra({ nombre: formData.nombre, direccion: formData.direccion });
        toast({ title: "Obra creada", description: "La obra fue creada exitosamente." });
      } else if (modalType === "orden") {
        if (!formData.nombre || !formData.total) {
          toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
          return;
        }
        await createOrden({ nombre: formData.nombre, total: parseFloat(formData.total) });
        toast({ title: "Orden creada", description: "La orden fue creada exitosamente." });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "No se pudo guardar.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const totalInventory = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const pendingOrders = orders.filter((order) => order.status === "Pendiente" || order.status === "En proceso").length;
  const activeProjects = projects.filter((project) => project.status === "Activo").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido, {session.user.name}. Aquí tienes un resumen de tu inventario.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventario Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory}</div>
            <p className="text-xs text-muted-foreground">Unidades en stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Pendientes</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Órdenes por procesar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obras Activas</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">Proyectos en ejecución</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Accede rápidamente a las funciones principales</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild className="w-full">
              <Link href="/dashboard/inventory">
                <Package className="mr-2 h-4 w-4" />
                Ver Inventario
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/dashboard/orders">
                <ClipboardList className="mr-2 h-4 w-4" />
                Gestionar Órdenes
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/dashboard/projects">
                <Building className="mr-2 h-4 w-4" />
                Revisar Obras
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas actualizaciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center">
                  <div className="mr-4 rounded-full bg-primary/10 p-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Orden {order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.client} - {order.project}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button onClick={openCreateModal}>Nuevo Usuario</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Select value={formData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>Rol</SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Ejemplo de lista de usuarios */}
      <div>
        {/** Aquí se iteraría sobre la lista de usuarios */}
        <Button onClick={() => openEditModal({ id: 1, username: "test", role: "admin" })}>Editar Usuario</Button>
        <Button onClick={() => handleDelete(1)}>Eliminar Usuario</Button>
      </div>

      {/* Botones para abrir modales */}
      <Button onClick={() => openModal("inventario")}>Agregar Perfil</Button>
      <Button onClick={() => openModal("obra")}>Agregar Obra</Button>
      <Button onClick={() => openModal("orden")}>Nueva Orden</Button>
      <Button onClick={openCreateModal}>Nuevo Usuario</Button>

      {/* Modal genérico */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "inventario" ? "Agregar Perfil" : modalType === "obra" ? "Agregar Obra" : modalType === "orden" ? "Nueva Orden" : isEditMode ? "Editar Usuario" : "Crear Nuevo Usuario"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {modalType === "inventario" || modalType === "obra" || modalType === "orden" ? (
              <>
                <Input
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre || ""}
                  onChange={handleInputChange}
                />
                {modalType === "inventario" && (
                  <Input
                    name="stock"
                    placeholder="Stock"
                    type="number"
                    value={formData.stock || ""}
                    onChange={handleInputChange}
                  />
                )}
                {modalType === "obra" && (
                  <Input
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion || ""}
                    onChange={handleInputChange}
                  />
                )}
                {modalType === "orden" && (
                  <Input
                    name="total"
                    placeholder="Total"
                    type="number"
                    value={formData.total || ""}
                    onChange={handleInputChange}
                  />
                )}
              </>
            ) : (
              <>
                <Input
                  name="username"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>Rol</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={modalType ? handleSaveModal : handleSave} disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

