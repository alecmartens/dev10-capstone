import React, { useContext } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
const ShoppingCart = () => { 
    // const [context, setContext] = useContext(CartContext); 
  return (
    <div>
    {/* {context} */}
    {localStorage.getItem("cartProducts")}
    </div>
  );
};
export default ShoppingCart; 