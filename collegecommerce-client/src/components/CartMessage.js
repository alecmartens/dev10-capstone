import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
function CartMessage({color, productName, setShow, show = true, setColor}){
    let msg = ""; 
    if(color == "success"){
        msg = productName + " added to shopping cart."; 
    }
    else {
        msg = productName + " removed from shopping cart."; 
    }
    if(show){
        return(
            <>
            <Alert variant={color} onClose={() => {setShow(false); setColor("success")}} dismissible>
                {msg}
            </Alert>
            </>
        ); 
    }
}; 
export default CartMessage; 