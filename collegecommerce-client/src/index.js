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
const promise = loadStripe("REACT_APP_STRIPE_PUBLIC_KEY");
root.render(
  <React.StrictMode>
    <Elements stripe={promise}> <App /></Elements>
  </React.StrictMode>
);


