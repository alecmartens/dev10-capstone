import Nav from 'react-bootstrap/Nav';
import { Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { findAll } from '../services/serviceServices';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
function AllServiceListings() {
  const [show, setShow] = useState(false);
  const [colorMsg, setColorMsg] = useState("success");
  const [services, setServices] = useState([]);
  const history = useHistory();
  if (!localStorage.getItem("cartCount")) { localStorage.setItem("cartCount", 0) }
  const [count, setCount] = useState(parseInt(localStorage.getItem("cartCount")));
  useEffect(() => {
    const nextServices = [];
    findAll()
      .then((services) => {
        const nextServices = [];
        services.map((s) => { if (s.available) { nextServices.push(s) } });
        setServices(nextServices);
      })
      .catch(() => history.push("/error"));
  }, []);
  return (
    <div>
      <h1>Items & Services</h1>
      <Nav variant="tabs" defaultActiveKey="/services">
        <Nav.Item>
          <Nav.Link href="/allservicelistings">Services</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/allitemlistings">Items</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="row">
        <h1 className="col-9">Services</h1>
        <div className="col-3">
          <Link to="/cart" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg><Badge bg="secondary">{count}</Badge></Link>
        </div>
      </div>
      <br></br>
      <div className="container">
        <Row xs={1} md={2} className="g-4">
          {services.map((s) => (<Col xs={6} md={5} key={s.serviceId}>
            <Card border="dark" style={{ width: '18rem' }} >
              <Card.Header>{s.category}</Card.Header>
              <Card.Body>
                <Card.Title>{s.name}</Card.Title>
                <Card.Text>
                  {s.description}
                  <br></br>
                  ${s.pricePerHour}/hr
                </Card.Text>
                <button className="btn btn-primary" onClick={() => {
                  if (!localStorage.getItem("cartProducts")) { localStorage.setItem("cartProducts", JSON.stringify({})); };
                  setCount(count + 1);
                  setShow(true);
                  (localStorage.getItem("cartCount")) ? localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) + 1) : localStorage.setItem("cartCount", 1);
                  let cart = JSON.parse(localStorage.getItem("cartProducts"));
                  if (cart[s.serviceId]) {
                    cart[s.serviceId] += 1;
                  }
                  else {
                    cart[s.serviceId] = 1;
                  }
                  localStorage.setItem("cartProducts", JSON.stringify(cart));
                }}>+</button><button className="btn btn-warning m-2" onClick={() => {
                  setShow(true);
                  setColorMsg("danger");
                  if (localStorage.getItem("cartProducts")) {
                    let cart = JSON.parse(localStorage.getItem("cartProducts"));
                    if (cart[s.serviceId]) {
                      cart[s.serviceId] -= 1;
                      setCount(count - 1);
                      localStorage.setItem("cartCount", count - 1);
                      console.log(cart[s.serviceId]);
                    }
                    localStorage.setItem("cartProducts", JSON.stringify(cart));
                  }
                }}>-</button>
              </Card.Body>
            </Card>
          </Col>))}

        </Row>
      </div>
    </div>
  );
}
export default AllServiceListings; 