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
                    {/* <Link to="/cart" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg><Badge bg="secondary">{count}</Badge></Link> */}
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
                                {/* <td><Link to={`/services/delete/${s.serviceId}`} className="btn btn-danger me-2">Delete</Link></td> */}
                                {/* <td><Link to={`/services/edit/${s.serviceId}`} className="btn btn-secondary">Edit</Link></td> */}
                                <td><Link to={`/services/delete/${service.serviceId}`} className="btn btn-danger m-2">Delete</Link>
                                    <Link to={`/services/edit/${service.serviceId}`} className="btn btn-secondary m-2">Edit</Link>
                                    {/* <button className="btn btn-primary" onClick={() => {
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
                                    }}>-</button> */}
                                </td>
                                {/* <td><Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="make listing public"
      /></Form>
</td> */}
                                {/* <td><button className="btn btn-success me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This posts services for other users to see
                                    s.available = true;
                                    setService(s);
                                    console.log(s);
                                }}>List Service</button></td>
                                <td><button className="btn btn-danger me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This hides services for other users to not see
                                    s.available = false;
                                    setService(s);
                                    console.log(s);
                                }}>Unlist Service</button></td> */}
                                {/* <td><Link to={`/services/delete/${service.serviceId}`} className="btn btn-danger m-2">Delete</Link></td> */}

                            </tr>
                        ))
                    }
                    {/* {services.map(s =>
                        <Service key={s.serviceId} service={s} count={count} setCount={setCount} handleEdit={handleEdit} handleDelete={handleDelete} />)} */}
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