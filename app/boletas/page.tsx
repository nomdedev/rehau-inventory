import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Select, Table } from '@/components/ui'; // Asegúrate de que estos componentes existan o ajusta la importación.

const OrderHistoryPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    proveedor: '',
    fecha: '',
    estado: '',
  });

  useEffect(() => {
    // Fetch inicial de órdenes
    fetch('/api/ordenes')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Filtrar órdenes según los filtros aplicados
    const filtered = orders.filter((order) => {
      const matchesProveedor = filters.proveedor
        ? order.proveedor.toLowerCase().includes(filters.proveedor.toLowerCase())
        : true;
      const matchesFecha = filters.fecha
        ? new Date(order.fecha).toLocaleDateString() === filters.fecha
        : true;
      const matchesEstado = filters.estado
        ? order.estado.toLowerCase() === filters.estado.toLowerCase()
        : true;
      return matchesProveedor && matchesFecha && matchesEstado;
    });
    setFilteredOrders(filtered);
  }, [filters, orders]);

  const handlePrint = (id) => {
    router.push(`/boletas/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Boletas</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          name="proveedor"
          placeholder="Buscar por proveedor"
          value={filters.proveedor}
          onChange={handleFilterChange}
        />
        <Input
          name="fecha"
          type="date"
          value={filters.fecha}
          onChange={handleFilterChange}
        />
        <Select
          name="estado"
          value={filters.estado}
          onChange={handleFilterChange}
        >
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Completada">Completada</option>
        </Select>
      </div>

      {/* Tabla de órdenes */}
      {filteredOrders.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Proveedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.proveedor}</td>
                <td>{new Date(order.fecha).toLocaleDateString()}</td>
                <td>${order.total}</td>
                <td>{order.estado}</td>
                <td>
                  <Button onClick={() => handlePrint(order.id)}>Imprimir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">No hay órdenes registradas.</p>
      )}
    </div>
  );
};

export default OrderHistoryPage;
