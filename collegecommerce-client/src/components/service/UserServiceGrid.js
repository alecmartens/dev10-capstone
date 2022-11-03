import { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { findAll, save } from "../../services/serviceServices";
import { Card, Row, Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Badge } from 'react-bootstrap';

//user imports
import { findByUserName } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";

function ServiceGrid({ handleEdit, handleDelete }) {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState("");
    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);


    const [show, setShow] = useState(false);
    const [colorMsg, setColorMsg] = useState("success");

    const [userServices, setUserServices] = useState([]);
    const [services, setServices] = useState([]);

    const [service, setService] = useState({
        serviceId: 0,
        name: "",
        description: "",
        pricePerHour: 0,
        category: "OTHER",
        userId: 0,
        available: false,
        location: "North Dakota State University"
    })


    function handleChange(service) {
        return (evt) => {
            const nextService = { ...service };
            nextService["available"] = !nextService.available;
            save(nextService)
                .then(() => { history.push(`/user/${user.username}/services`) })
                .catch(errs => {
                    if (errs) {
                        console.log(errs);
                    } else {
                        history.push("/error")
                    }
                });


        }
    }
    const history = useHistory();
    if (!localStorage.getItem("cartCount")) { localStorage.setItem("cartCount", 0) }
    const [count, setCount] = useState(parseInt(localStorage.getItem("cartCount")));

    useEffect(() => {
        findAll()
            .then(setServices)
            .catch(() => history.push("/error"));
    }, []);

    useEffect(() => {
        // console.log("Services Size: " + services.length);
        let userServices = [];
        for (let i = 0; i < services.length; i++) {
            if (services[i].userId === user.userId) {
                userServices.push(services[i]);
            }
        }
        setUserServices(userServices);
        // setServices(userServices); 
        // console.log("UserServices Size: " + userServices.length);
    }, [user]);

    return (
        <div className='bg-light'>
        <div className='mx-4 pt-2'>
        <div className='d-flex justify-content-between'>
          <h1>My Items & Services</h1>
          <div className="me-4">
                <Link to={`/user/${user.username}/services/add`} className="btn btn-primary">Add a Service</Link>
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="/services">
          <Nav.Item>
            <Nav.Link href={`/user/${auth.user.username}/services`} className='border border-primary'>Services</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={`/user/${auth.user.username}/items`} className='border border-primary'>Items</Nav.Link>
          </Nav.Item>
        </Nav>
            <Row className="justify-content-md-center mt-4">
                {
                    userServices.map(s => (
                        <Card border="dark" style={{ width: '18rem' }} key={s.serviceId}>
                            <Card.Header>
                                <b>{s.category}</b>
                                <br></br>
                                <p>Is Available for Purchase?</p>
                                {s.available ? <Form.Check
                                    name="toggle-switch"
                                    type="switch"
                                    id="switch"
                                    label="" onChange={handleChange(setCount)} defaultChecked
                                /> :
                                    <Form.Check
                                        name="toggle-switch"
                                        type="switch"
                                        id="switch"
                                        label="" onChange={handleChange(s)}
                                    />}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{s.name}</Card.Title>
                                <Card.Text>
                                    <b>Description: </b>{s.description}<br />
                                    <b>Location: </b><br />{s.location}<br />
                                    ${s.pricePerHour}/hr
                                    <br></br>
                                    <Link to={`/services/delete/${s.serviceId}`} className="btn btn-danger m-2">Delete</Link>
                                    <Link to={`/services/edit/${s.serviceId}`} className="btn btn-secondary m-2">Edit</Link>
                                    <br></br>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Row>
        </div>
        </div>
    );

}
export default ServiceGrid; 