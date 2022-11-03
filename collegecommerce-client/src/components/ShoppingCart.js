import React, { useContext, useState } from 'react';
// import { CartContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import { findAll } from '../services/serviceServices';
import { findAllItems } from '../services/itemService';
import { useEffect } from 'react';
const ShoppingCart = () => { 
  const [services, setServices] = useState([]); 
  const [items, setItems] = useState([]); 
  useEffect(() => {
    Promise.all([findAll(),findAllItems()]).then(data=>{
      setServices(data[0]); setItems(data[1]);
      if(!localStorage.getItem("cartProducts")){localStorage.setItem("cartProducts", JSON.stringify({})); }
      if(!localStorage.getItem("servicehm")){localStorage.setItem("servicehm", JSON.stringify({})); }
      {services.map(s => {
        if (!localStorage.getItem("servicehm")) { localStorage.setItem("servicehm", JSON.stringify({})); }
        let hm = JSON.parse(localStorage.getItem("servicehm"));
        hm[s.serviceId] = [s.name, s.description, s.pricePerHour];
        localStorage.setItem("servicehm", JSON.stringify(hm));
    })}
    {items.map(s => {
      if (!localStorage.getItem("itemhm")) { localStorage.setItem("itemhm", JSON.stringify({})); }
      let hm = JSON.parse(localStorage.getItem("itemhm"));
      hm[s.itemId] = [s.name, s.description, s.price];
      localStorage.setItem("itemhm", JSON.stringify(hm));
    })}
    setcartProds(JSON.parse(localStorage.getItem("cartProducts"))); 
    setservicemp(JSON.parse(localStorage.getItem("servicehm")));  
  setcartProdsItems( JSON.parse(localStorage.getItem("cartProductsForItems"))); 
  setitemmp(JSON.parse(localStorage.getItem("itemhm"))); 
      }).catch(() => history.push("/error"));

     
}, []);
    const [clearCart, setClearCart] = useState(false);
  const handleClear = () => {setClearCart(false); localStorage.clear();}; 
  const handleClose = () => setClearCart(false);
  const handleShow = () => setClearCart(true);
  const history = useHistory(); 
 const [cartProds, setcartProds] = useState([]); 
 const [servicemp, setservicemp] = useState([]); 
  const arr = Object.keys(cartProds); 
  let totalPrice = 0.0; 
  const [quantity, setQuantity] = useState(cartProds); 
  if(!localStorage.getItem("cartProductsForItems")){localStorage.setItem("cartProductsForItems", JSON.stringify({})); }
  if(!localStorage.getItem("itemhm")){localStorage.setItem("itemhm", JSON.stringify({})); }
  const [cartProdsItems, setcartProdsItems] = useState([]); 
  const [itemmp, setitemmp] = useState([]); 
  const arr2= Object.keys(cartProdsItems); 
  const [quantityForItems, setQuantityForItems] = useState(cartProdsItems); 
 
  return (
    <div className='container'>
    <h3>Shopping Cart</h3>
    <b>Services</b>
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
            
          <tr key={s}><td>{servicemp[s][0]}</td><td>{servicemp[s][1]}</td><td>{servicemp[s][2]}</td><td>{quantity[s]}<Button variant="secondary" size="sm" className='m-2'
        onClick={()=>{
          let cartProd2 = JSON.parse(localStorage.getItem("cartProducts")); 
            cartProd2[s]++; 
            localStorage.setItem("cartProducts", JSON.stringify(cartProd2)); 
            setQuantity(cartProd2); 
            if(localStorage.getItem("cartCount")){localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) + 1)}
        }}>+</Button><Button variant="danger" size="sm" className='m-2'onClick={()=>{
          let cartProd2 = JSON.parse(localStorage.getItem("cartProducts")); 
          if(cartProd2 && cartProd2[s] > 0){
            cartProd2[s]--; 
            localStorage.setItem("cartProducts", JSON.stringify(cartProd2)); 
            setQuantity(cartProd2); 
            if(localStorage.getItem("cartCount") && parseInt(localStorage.getItem("cartCount"))> 0){localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) - 1)}
           }
        }}>-</Button></td></tr>
           )}
           {arr.map(s =>  
          {totalPrice += servicemp[s][2]*cartProds[s]; 
          })}
          
          
      </tbody>     
    </Table>
    <b>Items</b>
    <Table striped bordered hover>
      <tbody>
          {arr2.map(i =>
            
          <tr key={i}><td>{itemmp[i][0]}</td><td>{itemmp[i][1]}</td><td>{itemmp[i][2]}</td><td>{quantityForItems[i]}<Button variant="secondary" size="sm" className='m-2'
        onClick={()=>{
          let cartProd2 = JSON.parse(localStorage.getItem("cartProductsForItems")); 
            cartProd2[i]++; 
            localStorage.setItem("cartProductsForItems", JSON.stringify(cartProd2)); 
            setQuantityForItems(cartProd2); 
            if(localStorage.getItem("cartCount")){localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) + 1)}
        }}>+</Button><Button variant="danger" size="sm" className='m-2'onClick={()=>{
          let cartProd2 = JSON.parse(localStorage.getItem("cartProductsForItems")); 
          if(cartProd2 && cartProd2[i] > 0){
            cartProd2[i]--; 
            localStorage.setItem("cartProductsForItems", JSON.stringify(cartProd2)); 
            setQuantityForItems(cartProd2); 
            if(localStorage.getItem("cartCount") && parseInt(localStorage.getItem("cartCount")) > 0){localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) - 1)}
           }
        }}>-</Button></td></tr>
           )}
           {arr2.map(i =>  
          {totalPrice += itemmp[i][2]*cartProdsItems[i]; 
          })}
          
          
      </tbody>     
    </Table>
    <h3>Total Price</h3>
    ${totalPrice}
    <br />
    <Button variant="warning" onClick={handleShow}>
        Clear Shopping Cart
      </Button>
      <Button variant="secondary" className='m-3' onClick={()=>{localStorage.setItem("totalPrice", totalPrice); history.push('/checkout')}}>
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