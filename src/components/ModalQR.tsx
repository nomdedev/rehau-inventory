import React from 'react';
import QRCode from 'react-qr-code';

interface ModalQRProps {
  isOpen: boolean;
  onClose: () => void;
  productCode: string;
}

const ModalQR: React.FC<ModalQRProps> = ({ isOpen, onClose, productCode }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Código QR del Producto</h2>
        <QRCode value={productCode} />
      </div>
    </div>
  );
};

export default ModalQR;
