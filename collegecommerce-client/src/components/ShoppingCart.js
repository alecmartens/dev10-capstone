import React, { useContext, useState } from 'react';
// import { CartContext } from '../App';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ShoppingCart = () => { 
    // const [context, setContext] = useContext(CartContext); 
    const [clearCart, setClearCart] = useState(false);
  const handleClear = () => {setClearCart(false); localStorage.clear();}; 
  const handleClose = () => setClearCart(false);
  const handleShow = () => setClearCart(true);
  return (
    <div className='container'>
    {localStorage.getItem("cartProducts")}
    <table>
      <thead>
        <tr>
          <th>
            product name
          </th>
          <th>
            price
          </th>
          <th>
            quantity
          </th>
        </tr>
      </thead>
      <tbody>
      </tbody>     
    </table>
    <h3>Total Price</h3>
    <br />
    <Button variant="warning" onClick={handleShow}>
        Clear Shopping Cart
      </Button>
      <Modal show={clearCart} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Clear Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove all items?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClear}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};
export default ShoppingCart; 