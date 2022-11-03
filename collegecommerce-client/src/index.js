import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const root = ReactDOM.createRoot(document.getElementById('root')); 
const promise = loadStripe("pk_test_51LxcD3DVp5wBB9hkbloBScOVo1H4TQ8teQ0GRmLybkssde9u2vuPZxmR8uYfdwNSpF6bqqo6d0KxYWO4c8R8y2Gm00gkGGoM02");
// const promise = loadStripe("pk_test_51Lz4gaJfUrXUXwc8tjoJkQBYa7dWZCyQmcmoIOCOsAjCsvObWItCMRlViMxyhVW2vUw3WoCb9qLEAOraK4QgQKMa00WkqJtmJa");
root.render(
  <React.StrictMode>
    <Elements stripe={promise}> <App /></Elements>
  </React.StrictMode>
);


