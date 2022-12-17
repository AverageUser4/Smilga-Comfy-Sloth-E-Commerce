import React from 'react';
import css from './CartProductsTableHead.module.css';

function CartProductsTableHead() {
  return (
    <div className={css['container']}>
    
      <div className={`cart-products-layout`}>
        <span>Item</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
      </div>

      <div className="line"></div>

    </div>
  );
}

export default CartProductsTableHead;