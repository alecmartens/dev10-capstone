import { Link,Router } from "react-router-dom";
import { useState } from "react";
import CartMessage from "./CartMessage";
function Service({service}){
    const [show, setShow] = useState(false); 
    const [colorMsg, setColorMsg] = useState("success"); 
    return(
        <tr>
        <td>{service.serviceId}</td>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td>{service.pricePerHour}</td>
        <td>{service.category}</td>
        <td><Link to={`/services/delete/${service.serviceId}`} className="btn btn-danger me-2">Delete</Link></td>
        <td><Link to={`/services/edit/${service.serviceId}`} className="btn btn-secondary">Edit</Link></td>
        <td><button className="btn btn-primary" onClick={()=>{
            if(!localStorage.getItem("cartProducts")) {localStorage.setItem("cartProducts", JSON.stringify({})); }; 
            
            setShow(true);
             (localStorage.getItem("cartCount"))?localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount"))+ 1):localStorage.setItem("cartCount", 1); 
             let cart = JSON.parse(localStorage.getItem("cartProducts")); 
             if(cart[service.serviceId]){
                 cart[service.serviceId] += 1; 
             }
             else{
                 cart[service.serviceId] = 1; 
             }
             localStorage.setItem("cartProducts", JSON.stringify(cart));  }}>+</button></td>
        <td><button className="btn btn-warning" onClick={() => {setColorMsg("danger"); setShow(true); }}>-</button></td>
        {show && <td><CartMessage color={colorMsg} productName={service.name}/></td>}
    </tr>
    ); 
}

export default Service; 