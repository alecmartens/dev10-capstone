import { useEffect, useState, useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { findAll } from "../services/serviceServices";
import Service from "./Service";
import { Table, Badge } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { save } from "../services/serviceServices";

function ServiceGrid({ handleEdit, handleDelete }) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);
    const [colorMsg, setColorMsg] = useState("success");

    const [services, setServices] = useState([]);
    function handleChange(service) {
        return (evt) => {// const nextService = { ...service };
            // nextService[evt.target.name] = evt.target.value;
            // setService(nextService);
            console.log(evt.target);
            console.log(service);
            const nextService = { ...service };
            nextService["available"] = !nextService.available;
            save(nextService)
                .then(() => { console.log("updated"); history.push("/services") })
                .catch(errs => {
                    if (errs) {
                        console.log(errs);
                    } else {
                        history.push("/error")
                    }
                });


        }
    }
    const [service, setService] = useState({
        serviceId: 0,
        name: "",
        description: "",
        pricePerHour: 0,
        category: "OTHER",
        userId: 0,
        available: false
    })

    const history = useHistory();
    if (!localStorage.getItem("cartCount")) { localStorage.setItem("cartCount", 0) }
    const [count, setCount] = useState(parseInt(localStorage.getItem("cartCount")));
    useEffect(() => {
        console.log(ref.current);
        findAll()
            .then(setServices)
            .catch(() => history.push("/error"));
    }, []);

    return (
        <>

            <div className="row">
                <h1 className="col-9">services</h1>
                <div className="col-3">
                    <Link to="/services/add" className="btn btn-primary">Add a service</Link>
                </div>
            </div>

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
                                {/* <td>{String(s.available)}</td> */}
                                {/* TODO: useRef */}
                                <td><Form>
                                    {s.available ? <Form.Check
                                        name="toggle-switch"
                                        type="switch"
                                        id="switch"
                                        label="" ref={ref} onChange={handleChange(s)} defaultChecked
                                    /> :
                                        <Form.Check
                                            name="toggle-switch"
                                            type="switch"
                                            id="switch"
                                            label="" ref={ref} onChange={handleChange(s)}
                                        />}</Form></td>
                                <td><Link to={`/services/delete/${s.serviceId}`} className="btn btn-danger m-2">Delete</Link>
                                    <Link to={`/services/edit/${s.serviceId}`} className="btn btn-secondary m-2">Edit</Link>
                                </td>
                            </tr>
                        ))
                    }
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