import { Button } from "react-bootstrap";
function CheckoutForm(){
    function handleChange(){

    }
    function handleSubmit(evt){
        evt.preventDefault(); 
    }
    //https://api.collegeai.com/v1/docs/overview/sample-site -- college locations
    //https://developer.squareup.com/reference/square/payments-api -- payments
    return (
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <h4>Enter a shipping address:</h4>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" name="name" id="name" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" name="address" id="address" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="zipcode" className="form-label">zipcode</label>
                <input type="number" name="zipcode" id="zipcode" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="city" className="form-label">city</label>
                <input type="text" name="city" id="city" className="form-control"
                 onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="state" className="form-label">state</label>
                <input type="text" name="state" id="state" className="form-control"
                 onChange={handleChange} />
            </div>
            <h4>Order Details:</h4>
            <h6>Total Price:</h6>
            ${localStorage.getItem("totalPrice")}
            <br></br>
            <Button variant="primary">Submit</Button>
        </form>
    ); 
}
export default CheckoutForm; 