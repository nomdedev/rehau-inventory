import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const OrderReceiptPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/ordenes/${id}`)
        .then((res) => res.json())
        .then((data) => setOrderData(data))
        .catch((err) => console.error('Error fetching order data:', err));
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!orderData) {
    return <div>Cargando datos de la orden...</div>;
  }

  return (
    <div className="p-8">
      {/* Logo de la empresa */}
      <div className="text-center mb-8">
        <img
          src="/logo.png"
          alt="Logo Empresa"
          className="mx-auto w-32"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallbackText = document.createElement('p');
            fallbackText.textContent = 'Rehau Inventory Manager';
            fallbackText.className = 'text-xl font-bold';
            e.currentTarget.parentNode?.appendChild(fallbackText);
          }}
        />
      </div>

      {/* Datos de la orden */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Remito de Orden</h1>
        <p><strong>ID Orden:</strong> {orderData.id}</p>
        <p><strong>Fecha:</strong> {new Date(orderData.fecha).toLocaleDateString()}</p>
        <p><strong>Cliente:</strong> {orderData.cliente}</p>
        <p><strong>Proveedor:</strong> {orderData.proveedor}</p>
      </div>

      {/* Tabla de productos */}
      <table className="w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Código</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orderData.productos.map((producto) => (
            <tr key={producto.codigo}>
              <td className="border border-gray-300 px-4 py-2">{producto.codigo}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.descripcion}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.cantidad}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total de la orden */}
      <div className="mb-8">
        <p className="text-lg font-bold">Total: ${orderData.total}</p>
      </div>

      {/* Firma */}
      <div className="mb-8">
        <p className="border-t border-gray-300 pt-4 text-center">Firma del Responsable / Cliente</p>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Imprimir
        </button>
        {/* Botón para exportar como PDF (opcional) */}
        {/* <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
          Exportar como PDF
        </button> */}
      </div>
    </div>
  );
};

export default OrderReceiptPage;
