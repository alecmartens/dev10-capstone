import { Button, Card } from "react-bootstrap";
import { useEffect, useRef,useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
function CheckoutForm(){
    const history = useHistory(); 
    const addressRef = useRef("1825 4th Street, San Francisco, CA, USA"); 
    const [addressState, setAddressState] = useState(addressRef.current.value); 
    const [custName, setCustName] = useState(""); 
    const [custEmail, setcustEmail] = useState(""); 
    let autocomplete; 
useEffect(()=>{
    
    autocomplete = new window.google.maps.places.Autocomplete(
        addressRef.current
        ,
        {
            types: ['geocode'], 
            componentRestrictions:{'country':['US']}, 
            fields:['place_id', 'geometry', 'name']
        }
    )
    let listener = new window.google.maps.event.addListener(autocomplete, 'place_changed', function(){
        setAddressState(addressRef.current.value); 

    }); 
    return; 
},[])
   
    function handleChange(e){
        if(e.target.name === "autocomplete"){
            setAddressState(addressRef.current.value); 
        }
        if(e.target.name === "name"){
            setCustName(e.target.value); 
        }
        if(e.target.name === "email"){
            setcustEmail(e.target.value); 
        }
        return; 
    
    }
    async function handleSubmit(e){
        e.preventDefault(); 
        if(e.target.name === "autocomplete"){
            setAddressState(addressRef.current.value); 
        }
        if(e.target.name === "name"){
            setCustName(e.target.value); 
        }
        if(e.target.name === "email"){
            setcustEmail(e.target.value); 
        }
        let customer = {}; 
        customer["name"] = custName; 
        customer["email"] = custEmail; 
        customer["address"] = addressState; 
        const response = await fetch("http://localhost:8080/api/customers/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        }); 
        if (response.ok) {
            const res = await response.json(); 
            localStorage.setItem("customerId", res.customerId); 
            localStorage.setItem("customerAddress", res.address); 
            Promise.resolve().then(history.push("/paymentform"));
            
        } else if (response.status === 400) {

            const errs = await response.json();
            return Promise.reject(errs);
        } else {
            
            return Promise.reject();
        }

    }
    return (
        <div className="container py-4" style={{display: 'flex',
        justifyContent: 'center'}}>
    <Card variant="outlined" style={{ width: '25rem',height: '35rem' }} >
        <Card.Body>
        <form onSubmit={handleSubmit}>

            <h2>Checkout</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" name="name" id="name" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" name="email" id="email" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="autocomplete" className="form-label">Shipping Address</label>
                <input type="text" ref={addressRef} name="autocomplete" id="autocomplete" className="form-control"
                 onChange={handleChange} />
            </div>
            <h4>Order Details:</h4>
            <h6>No. Items:</h6>
            {localStorage.getItem("cartCount")}
            <br></br>
            <h6>Total Price:</h6>
            ${localStorage.getItem("totalPrice")}
            <br></br>
            <Button variant="warning" className="m-2 btn-sm" href="/cart">Edit Shopping Cart</Button>
            <Button variant="secondary" className="btn-sm" type="submit">Proceed</Button>
        </form>
        </Card.Body>
        </Card>
        </div>
    ); 
}
export default CheckoutForm; 