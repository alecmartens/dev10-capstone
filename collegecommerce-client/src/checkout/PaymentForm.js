import React,{ useState, useEffect }  from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Card,Button } from "react-bootstrap";
import { Elements, CardElement, useStripe, useElements, PaymentElement, IdealBankElement, CardNumberElement  } from "@stripe/react-stripe-js";
//TODO attach payment to customer, param for price
export default function PaymentForm(){
    //test cards -- 3122 , 4242
    const elements = useElements(); //locate & access mounted elements on pg
    const stripe = useStripe(); //stripe instance passed on into elements provider
    //use to interact with stripe api
    function handleChange(e){

    }
    async function handleSubmit(e){
        e.preventDefault(); 
        if(!stripe || !elements){
            //stripe doesn't exist
            return; 
        }
        console.log(elements.getElement(CardElement)); 
        //create payment intent on server
        const response = await fetch('http://localhost:8080/api/payments/create-payment-intent');
        if (response.ok) {
            const res = await response.json(); 
            const clientSecret = res.client_secret; 
            //then confirm payment intent on client
            const {error: paymentError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            })
            if(paymentError){
                //TODO error msg
            }

        } else {
            return Promise.reject();
        }
        

    }
    return(<div className="container py-4" style={{display: 'flex',
        justifyContent: 'center'}}>
    <Card variant="outlined" style={{ width: '25rem',height: '18rem' }} rounded>
        <Card.Body>
    <form id="paymentform" onSubmit={handleSubmit}>
    <h4>Order Details</h4>
    Shipping Address: 
    <br/>
        Total Price: ${localStorage.getItem("totalPrice")}
        <br/>
        <label htmlFor="card-elem">Card</label>
        <CardElement id="card-elem" />
        <br></br>
        <center><Button className="btn btn-warning btn-small m-2" href="/checkout">Edit</Button> <Button className="btn btn-secondary btn-small" type="submit">Pay</Button></center>
        </form></Card.Body>
        </Card></div>); 
}