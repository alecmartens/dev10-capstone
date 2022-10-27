import React, { useContext, useState } from 'react';
// import { CartContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
const ShoppingCart = () => { 
    // const [context, setContext] = useContext(CartContext); 
    const [clearCart, setClearCart] = useState(false);
  const handleClear = () => {setClearCart(false); localStorage.clear();}; 
  const handleClose = () => setClearCart(false);
  const handleShow = () => setClearCart(true);
  //TODO useState for adding, removing items
  const history = useHistory(); 
  if(!localStorage.getItem("cartProducts")){localStorage.setItem("cartProducts", JSON.stringify({})); }
  if(!localStorage.getItem("servicehm")){localStorage.setItem("servicehm", JSON.stringify({})); }
  const cartProds = JSON.parse(localStorage.getItem("cartProducts")); 
  const servicemp = JSON.parse(localStorage.getItem("servicehm")); 
  const arr = Object.keys(cartProds); 
  let totalPrice = 0.0; 
  return (
    <div className='container'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            name
          </th>
          <th>
            description
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
          {arr.map(s =>
            
          <tr><td>{servicemp[s][0]}</td><td>{servicemp[s][1]}</td><td>{servicemp[s][2]}</td><td>{cartProds[s]}<Button variant="secondary" size="sm" className='m-2'>+</Button><Button variant="danger" size="sm" className='m-2'>-</Button></td></tr>
           )}
           {arr.map(s =>  
          {totalPrice += servicemp[s][2]*cartProds[s];})}
          
      </tbody>     
    </Table>
    <h3>Total Price</h3>
    ${totalPrice}
    <br />
    <Button variant="warning" onClick={handleShow}>
        Clear Shopping Cart
      </Button>
      <Button variant="primary" className='m-3' onClick={()=>{localStorage.setItem("totalPrice", totalPrice); history.push('/checkout')}}>
        Checkout
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