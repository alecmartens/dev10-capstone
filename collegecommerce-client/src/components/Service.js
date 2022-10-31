import { Link, Router } from "react-router-dom";
import { useState } from "react";
import CartMessage from "./CartMessage";
function Service({ service, setCount, count }) {
    const [show, setShow] = useState(false);
    const [colorMsg, setColorMsg] = useState("success");
    //localStorage -- cartCount, cartProducts
    return (
        <tr>
            <td>{service.serviceId}</td>
            <td>{service.name}</td>
            <td>{service.description}</td>
            <td>{service.pricePerHour}</td>
            <td>{service.category}</td>
            <td><Link to={`/services/delete/${service.serviceId}`} className="btn btn-danger m-2">Delete</Link>
                <Link to={`/services/edit/${service.serviceId}`} className="btn btn-secondary m-2">Edit</Link><button className="btn btn-primary" onClick={() => {
                    if (!localStorage.getItem("cartProducts")) { localStorage.setItem("cartProducts", JSON.stringify({})); };
                    setCount(count + 1);
                    setShow(true);
                    (localStorage.getItem("cartCount")) ? localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) + 1) : localStorage.setItem("cartCount", 1);
                    let cart = JSON.parse(localStorage.getItem("cartProducts"));
                    if (cart[service.serviceId]) {
                        cart[service.serviceId] += 1;
                    }
                    else {
                        cart[service.serviceId] = 1;
                    }
                    localStorage.setItem("cartProducts", JSON.stringify(cart));
                }}>+</button><button className="btn btn-warning m-2" onClick={() => {
                    setShow(true);
                    setColorMsg("danger");
                    if (localStorage.getItem("cartProducts")) {
                        let cart = JSON.parse(localStorage.getItem("cartProducts"));
                        if (cart[service.serviceId]) {
                            cart[service.serviceId] -= 1;
                            setCount(count - 1);
                            localStorage.setItem("cartCount", count - 1);
                            console.log(cart[service.serviceId]);
                        }
                        localStorage.setItem("cartProducts", JSON.stringify(cart));
                    }
                }}>-</button></td>
            {show && <td><CartMessage color={colorMsg} setColor={setColorMsg} setShow={setShow} productName={service.name} /></td>}
        </tr>
    );
}

export default Service; 