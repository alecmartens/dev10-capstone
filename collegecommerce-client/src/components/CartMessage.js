import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
function CartMessage({color, productName}){
    const [show, setShow] = useState(true);
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
            <Alert variant={color} onClose={() => setShow(false)} dismissible>
                {msg}
            </Alert>
            </>
        ); 
    }
}; 
export default CartMessage; 