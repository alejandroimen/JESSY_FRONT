import React from 'react';
import PropTypes from 'prop-types';

const PurchaseItem = ({ product, provider, price, quantity, date }) => {
  return (
    <div className="purchase-item">
      <div className="purchase-product-image"></div>
      <div className="purchase-product-details">
        <p>Producto: {product}</p>
        <p>Proveedor: {provider}</p>
        <p>Precio: ${price}</p>
        <p>Cantidad: {quantity}</p>
        <p>Fecha: {date}</p>
      </div>
    </div>
  );
};

PurchaseItem.propTypes = {
  product: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default PurchaseItem;
