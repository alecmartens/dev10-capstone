import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { findAll } from "../services/serviceServices";
import Service from "./Service";
import { Table } from "react-bootstrap";
function ServiceGrid({ handleEdit, handleDelete }) {
    const [services, setServices] = useState([]);

    const [service, setService] = useState({
        serviceId: 0,
        name: "",
        description: "",
        pricePerHour: 0,
        category: "",
        userId: 0,
        available: false
    })

    const history = useHistory();

    useEffect(() => {
        findAll()
            .then(setServices)
            .catch(() => history.push("/error"));
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Service ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price per Hour</th>
                        <th>Category</th>
                        <th>Is Available</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map(s => (
                            <tr key={s.serviceId}>
                                <td>{s.serviceId}</td>
                                <td>{s.userId}</td>
                                <td>{s.name}</td>
                                <td>{s.description}</td>
                                <td>{s.pricePerHour}</td>
                                <td>{s.category}</td>
                                <td>{String(s.available)}</td>
                                <td><Link to={`/services/delete/${s.serviceId}`} className="btn btn-danger me-2">Delete</Link></td>
                                <td><Link to={`/services/edit/${s.serviceId}`} className="btn btn-secondary">Edit</Link></td>
                                <td><button className="btn btn-success me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This posts services for other users to see
                                    s.available = true;
                                    setService(s);
                                    console.log(s);
                                }}>List Service</button></td>
                                <td><button className="btn btn-danger me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This hides services for other users to not see
                                    s.available = true;
                                    setService(s);
                                    console.log(s);
                                }}>Unlist Service</button></td>
                                {/* <td><Link to={`/services/delete/${service.serviceId}`} className="btn btn-danger m-2">Delete</Link></td> */}
                            </tr>
                        ))
                    }
                    {/* {services.map(s =>
                        <Service key={s.serviceId} service={s} handleEdit={handleEdit} handleDelete={handleDelete} />)} */}
                    {services.map(s => {
                        if (!localStorage.getItem("servicehm")) { localStorage.setItem("servicehm", JSON.stringify({})); }
                        let hm = JSON.parse(localStorage.getItem("servicehm"));
                        hm[s.serviceId] = [s.name, s.description, s.pricePerHour];
                        localStorage.setItem("servicehm", JSON.stringify(hm));
                    })}

                </tbody>
            </Table>
        </>
    );

}
export default ServiceGrid; 