import { Button, Card } from "react-bootstrap";
function CheckoutForm(){
    function handleChange(){
    }
    function handleSubmit(evt){
        evt.preventDefault(); 
    }
    return (
        <div className="container py-4" style={{display: 'flex',
        justifyContent: 'center'}}>
    <Card variant="outlined" style={{ width: '25rem',height: '50rem' }} rounded>
        <Card.Body>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <h4>Enter a shipping address:</h4>
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
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" name="address" id="address" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="zipcode" className="form-label">Zip Code</label>
                <input type="number" name="zipcode" id="zipcode" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" name="city" id="city" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" name="state" id="state" className="form-control"
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
            <Button variant="secondary" className="btn-sm" href="/paymentform">Proceed</Button>
        </form>
        </Card.Body>
        </Card>
        </div>
    ); 
}
export default CheckoutForm; 