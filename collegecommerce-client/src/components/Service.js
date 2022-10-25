import { Link,Router } from "react-router-dom";
function Service({service}){
    return(
        <tr>
        <td>{service.serviceId}</td>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td>{service.pricePerHour}</td>
        <td>{service.category}</td>
        <td><Link to={`/services/delete/${service.serviceId}`} className="btn btn-danger me-2">Delete</Link></td>
        <td><Link to={`/services/edit/${service.serviceId}`} className="btn btn-secondary">Edit</Link></td>
    </tr>
    ); 
}

export default Service; 