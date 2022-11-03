import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const publicKey = await fetch("http:localhost:8080/api/payments/stripe-public-key"); 
// console.log(publicKey); 
// console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY); 
const promise = loadStripe("pk_test_51LxcD3DVp5wBB9hkbloBScOVo1H4TQ8teQ0GRmLybkssde9u2vuPZxmR8uYfdwNSpF6bqqo6d0KxYWO4c8R8y2Gm00gkGGoM02");
root.render(
  <React.StrictMode>
    <Elements stripe={promise}> <App /></Elements>
  </React.StrictMode>
);


