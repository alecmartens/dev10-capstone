import Nav from 'react-bootstrap/Nav';
import { Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect , useContext} from 'react';
import { useHistory } from 'react-router';
import { findAll } from '../services/serviceServices';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import LocationContext from '../contexts/LocationContext';
import AuthContext from '../contexts/AuthContext';
import { deleteById } from '../services/serviceServices';

function AllServiceListings() {
  const [show, setShow] = useState(false);
  const [colorMsg, setColorMsg] = useState("success");
  const [services, setServices] = useState([]);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const history = useHistory();
  const myLocation = useContext(LocationContext);
  const auth = useContext(AuthContext);

  if (!localStorage.getItem("cartCount")) { localStorage.setItem("cartCount", 0) }
  const [count, setCount] = useState(parseInt(localStorage.getItem("cartCount")));

  function handleCategoryChange(evt) {
    setCategory(evt.target.value);
  }

  function handlePriceChange(evt) {
    setPrice(evt.target.value);
  }

  useEffect(() => {
    updateServices();
  }, [category, price]);

  function updateServices() {
    findAll()
      .then((services) => {
        const nextServices = [];
        services.map((s) => { 
          let addService = true;
          if (!s.available  && !auth.user.hasRole("ADMIN")) { 
            addService = false;
          }
          if (myLocation.location && s.location !== myLocation.location) {
            addService = false;
          }
          if (category && category !== s.category) {
            addService = false;
          }
          if (price && s.pricePerHour > price) {
            addService = false;
          }

          if (addService) {
            nextServices.push(s);
          }

          });
        setServices(nextServices);
      })
      .catch(() => history.push("/error"));
  }

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
        <h1 className="col">Services</h1>
        <div className="col-6">
          <div className="container">
            <div className="bg-light rounded-1  w-75 p-4">
            <h4 className="text-center mb-3">Filter Results</h4>
            <div className="d-flex justify-content-evenly">
            <div className="dropdown me-4">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button className="dropdown-item" type="button" value="DELIVERY" onClick={handleCategoryChange}>Delivery</button></li>
                <li><button className="dropdown-item" type="button" value="DRIVING" onClick={handleCategoryChange}>Driving</button></li>
                <li><button className="dropdown-item" type="button" value="HOME_CLEANING" onClick={handleCategoryChange}>Home Cleaning</button></li>
                <li><button className="dropdown-item" type="button" value="PET_CARE" onClick={handleCategoryChange}>Pet Care</button></li>
                <li><button className="dropdown-item" type="button" value="REPAIR" onClick={handleCategoryChange}>Repair</button></li>
                <li><button className="dropdown-item" type="button" value="TRANSPORATION" onClick={handleCategoryChange}>Transporation</button></li>
                <li><button className="dropdown-item" type="button" value="OTHER" onClick={handleCategoryChange}>Other</button></li>
                <li><button className="dropdown-item" type="button" value="" onClick={handleCategoryChange}>All</button></li>
              </ul>
              {category && <div className="text-center mt-2">{category}</div>}
            </div>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                Price Range
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li><button className="dropdown-item" type="button" value="10" onClick={handlePriceChange}>$10 and down</button></li>
                <li><button className="dropdown-item" type="button" value="25" onClick={handlePriceChange}>$25 and down</button></li>
                <li><button className="dropdown-item" type="button" value="50" onClick={handlePriceChange}>$50 and down</button></li>
                <li><button className="dropdown-item" type="button" value="100" onClick={handlePriceChange}>$100 and down</button></li>
                <li><button className="dropdown-item" type="button" value="" onClick={handlePriceChange}>All</button></li>
              </ul>
              {price && <div className="text-center mt-2">${price} and down</div>}
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="col">
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
                  <br></br>
                  {s.location} <br/>
                  {auth.user.hasRole("ADMIN") && <span>Public: {String(s.available)}</span>}
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
                {auth.user.hasRole("ADMIN") && 
                <button className='btn btn-danger' onClick={() => {
                  deleteById(s.serviceId)
                  .then(() => updateServices())
                  .catch(() => history.push("/error"));
                }}>Delete</button>}
              </Card.Body>
            </Card>
          </Col>))}
          {services.length === 0 && 
          <div className="alert alert-danger">
            <h3>No search results found</h3>
            <p>Please consider broadening search and/or changing location.</p>
          </div>}
        </Row>
      </div>
    </div>
  );
}
export default AllServiceListings; 