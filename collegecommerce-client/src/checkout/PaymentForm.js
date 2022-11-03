import React,{ useState, useEffect }  from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Card,Button } from "react-bootstrap";
import { Elements, CardElement, useStripe, useElements, PaymentElement, IdealBankElement, CardNumberElement  } from "@stripe/react-stripe-js";
export default function PaymentForm(){
    //test cards -- 3122 , 4242
    const elements = useElements();
    const stripe = useStripe(); 
    function handleChange(e){
    }
    async function handleSubmit(e){
        e.preventDefault(); 
        if(!stripe || !elements){
            return; 
        }
        console.log(elements.getElement(CardElement)); 
        let payment ={}; 
        payment["customerId"] = localStorage.getItem("customerId"); 
        const tempPrice = localStorage.getItem("totalPrice"); 
        let priceRes = ""; 
        if(tempPrice.includes('.')){
            const amt = tempPrice.split('.')[0]; 
            priceRes += amt; 
            const amt2 = tempPrice.split('.')[1]; 
            if(amt2.length == 1){
                priceRes+= amt2 + "0"; 
            }
            else if(amt2.length == 2){
                priceRes+= amt2; 
            }
            else{
                priceRes+= "00"; 
            }

        }
        else{
            const amt = tempPrice.split('.')[0]; 
            priceRes= amt + "00";  
        }
        payment["price"] = parseInt(priceRes); 
        const response = await fetch('http://localhost:8080/api/payments/create-payment-intent', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payment)
        });
        if (response.ok) {
            const res = await response.json(); 
            const clientSecret = res.client_secret; 
            const {error: paymentError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            })
            if(paymentError){
            }
            else{
            }

        } else {
            return Promise.reject();
        }
    
    }
    return(<div className="container py-4" style={{display: 'flex',
        justifyContent: 'center'}}>
    <Card variant="outlined" style={{ width: '25rem',height: '18rem' }} >
        <Card.Body>
    <form id="paymentform" onSubmit={handleSubmit}>
    <h4>Order Details</h4>
    Shipping Address: {localStorage.getItem("customerAddress")}
    <br/>
        Total Price: ${localStorage.getItem("totalPrice")}
        <br/>
        <label htmlFor="card-elem">Card</label>
        <CardElement id="card-elem" />
        <br></br>
        <center><Button className="btn btn-warning btn-small m-2" href="/checkout">Edit</Button> <Button className="btn btn-secondary btn-small" type="submit" href="/paymentmsg">Pay</Button></center>
        </form></Card.Body>
    </Card></div>); 
}