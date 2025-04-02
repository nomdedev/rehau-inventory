import React, { useState, useEffect } from 'react';
import ModalQR from '../../components/ModalQR';
import NewInventoryForm from './NewInventoryForm';
import EditStockModal from './EditStockModal';
import MaterialMovementModal from './MaterialMovementModal';

const InventoryModule: React.FC = () => {
  const [isQRModalOpen, setQRModalOpen] = useState(false);
  const [selectedProductCode, setSelectedProductCode] = useState<string | null>(null);
  const [isNewFormOpen, setNewFormOpen] = useState(false);
  const [isEditStockModalOpen, setEditStockModalOpen] = useState(false);
  const [isMovementModalOpen, setMovementModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [movementType, setMovementType] = useState<'entrada' | 'salida' | null>(null);
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const productos = await prisma.inventario.findMany();
      setInventory(productos);
    } catch (error) {
      console.error('Error al cargar el inventario:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleOpenQRModal = (productCode: string) => {
    setSelectedProductCode(productCode);
    setQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setQRModalOpen(false);
    setSelectedProductCode(null);
  };

  const handleOpenNewForm = () => {
    setNewFormOpen(true);
  };

  const handleCloseNewForm = () => {
    setNewFormOpen(false);
  };

  const handleOpenEditStockModal = (product: any) => {
    setSelectedProduct(product);
    setEditStockModalOpen(true);
  };

  const handleCloseEditStockModal = () => {
    setEditStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenMovementModal = (product: any, type: 'entrada' | 'salida') => {
    setSelectedProduct(product);
    setMovementType(type);
    setMovementModalOpen(true);
  };

  const handleCloseMovementModal = () => {
    setMovementModalOpen(false);
    setSelectedProduct(null);
    setMovementType(null);
  };

  return (
    <div>
      <button onClick={handleOpenNewForm}>Agregar nuevo perfil</button>
      <NewInventoryForm isOpen={isNewFormOpen} onClose={handleCloseNewForm} />
      <ul>
        {inventory.map((product) => (
          <li key={product.id}>
            {product.nombre} - Stock: {product.cantidad}
            <button onClick={() => handleOpenMovementModal(product, 'entrada')}>Entrada</button>
            <button onClick={() => handleOpenMovementModal(product, 'salida')}>Salida</button>
            <button onClick={() => handleOpenQRModal(product.codigo)}>Mostrar QR</button>
          </li>
        ))}
      </ul>
      <ModalQR
        isOpen={isQRModalOpen}
        onClose={handleCloseQRModal}
        productCode={selectedProductCode || ''}
      />
      {selectedProduct && movementType && (
        <MaterialMovementModal
          isOpen={isMovementModalOpen}
          onClose={handleCloseMovementModal}
          product={selectedProduct}
          type={movementType}
          onMovementCompleted={fetchInventory}
        />
      )}
    </div>
  );
};

export default InventoryModule;
