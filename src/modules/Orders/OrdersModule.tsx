import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify'; // Importar toast para notificaciones.

const OrdersModule: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState({
    id: 123,
    logo: '/path/to/logo.png',
    materials: [
      { nombre: 'Material A', cantidad: 10, precio: 100 },
      { nombre: 'Material B', cantidad: 5, precio: 50 },
    ],
    total: 750,
    firma: '/path/to/signature.png',
  });

  const [isLoading, setIsLoading] = useState(false); // Estado de carga.

  const handleGeneratePDF = () => {
    const element = document.getElementById('order-pdf');
    if (!element) return;

    const options = {
      margin: 1,
      filename: `Orden_${orderDetails.id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createOrden({
        proveedor: 'Proveedor X',
        proyecto: 'Proyecto Y',
        estado: 'Pendiente',
        total: 1000,
      });
      toast.success('Orden creada con éxito');
      onOrderAdded(); // Actualizar la lista de órdenes.
      onClose(); // Cerrar el formulario.
    } catch (error) {
      toast.error('Error al crear la orden');
      console.error('Error al crear la orden:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Gestión de Órdenes</h1>
      <div id="order-pdf" style={{ padding: '20px', background: 'white' }}>
        <img src={orderDetails.logo} alt="Logo" style={{ width: '100px' }} />
        <h2>Orden #{orderDetails.id}</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Material</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Cantidad</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.materials.map((material, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{material.nombre}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{material.cantidad}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>${material.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total: ${orderDetails.total}</h3>
        <img src={orderDetails.firma} alt="Firma" style={{ width: '150px', marginTop: '20px' }} />
      </div>
      <button onClick={handleGeneratePDF}>Generar PDF</button>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
};

export default OrdersModule;
