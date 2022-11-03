import Nav from 'react-bootstrap/Nav';
import { Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { deleteById, findAllItems } from '../services/itemService';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import LocationContext from '../contexts/LocationContext';
import AuthContext from '../contexts/AuthContext';
function AllItemListings() {

  const [show, setShow] = useState(false);
  const [colorMsg, setColorMsg] = useState("success");
  const [items, setItems] = useState([]);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const history = useHistory();
  const myLocation = useContext(LocationContext);
  const auth = useContext(AuthContext);

  {
    items.map(i => {
      if (!localStorage.getItem("itemhm")) { localStorage.setItem("itemhm", JSON.stringify({})); }
      let hm = JSON.parse(localStorage.getItem("itemhm"));
      hm[i.itemId] = [i.name, i.description, i.price];
      localStorage.setItem("itemhm", JSON.stringify(hm));
    })
  }

  if (!localStorage.getItem("cartCount")) { localStorage.setItem("cartCount", 0) }
  const [count, setCount] = useState(parseInt(localStorage.getItem("cartCount")));

  function handleCategoryChange(evt) {
    setCategory(evt.target.value);
  }

  function handlePriceChange(evt) {
    setPrice(evt.target.value);
  }

  function handleConditionChange(evt) {
    setCondition(evt.target.value);
  }

  useEffect(() => {
    updateItems();
  }, [category, price, condition]);

  function updateItems() {
    findAllItems()
      .then((items) => {
        const nextItems = [];
        items.map((i) => {
          let addItem = true;
          if (!i.available && !auth.user.hasRole("ADMIN")) {
            addItem = false;
          }
          if (myLocation.location && i.location !== myLocation.location) {
            addItem = false;
          }
          if (category && category !== i.itemCategory) {
            addItem = false;
          }
          if (price && i.price > price) {
            addItem = false;
          }
          if (condition && i.itemCondition !== condition) {
            addItem = false;
          }

          if (addItem) {
            nextItems.push(i);
          }

        });
        setItems(nextItems);
      })
      .catch(() => history.push("/error"));
  }

  return (
    <>
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
          <h1 className="col">Items</h1>
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
                      <li><button className="dropdown-item" type="button" value="ART" onClick={handleCategoryChange}>Art</button></li>
                      <li><button className="dropdown-item" type="button" value="BOOKS" onClick={handleCategoryChange}>Books</button></li>
                      <li><button className="dropdown-item" type="button" value="ELECTRONICS" onClick={handleCategoryChange}>Electronics</button></li>
                      <li><button className="dropdown-item" type="button" value="CLOTHING" onClick={handleCategoryChange}>Clothing</button></li>
                      <li><button className="dropdown-item" type="button" value="FURNITURE" onClick={handleCategoryChange}>Furniture</button></li>
                      <li><button className="dropdown-item" type="button" value="GROCERY" onClick={handleCategoryChange}>Grocery</button></li>
                      <li><button className="dropdown-item" type="button" value="SCHOOL" onClick={handleCategoryChange}>School</button></li>
                      <li><button className="dropdown-item" type="button" value="SPORTS" onClick={handleCategoryChange}>Sports</button></li>
                      <li><button className="dropdown-item" type="button" value="TOYS" onClick={handleCategoryChange}>Toys</button></li>
                      <li><button className="dropdown-item" type="button" value="OTHER" onClick={handleCategoryChange}>Other</button></li>
                      <li><button className="dropdown-item" type="button" value="" onClick={handleCategoryChange}>All</button></li>
                    </ul>
                    {category && <div className="text-center mt-2">{category}</div>}
                  </div>
                  <div className="dropdown me-4">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                      Condition
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <li><button className="dropdown-item" type="button" value="NEW" onClick={handleConditionChange}>New</button></li>
                      <li><button className="dropdown-item" type="button" value="GOOD" onClick={handleConditionChange}>Good</button></li>
                      <li><button className="dropdown-item" type="button" value="USED" onClick={handleConditionChange}>Used</button></li>
                      <li><button className="dropdown-item" type="button" value="POOR" onClick={handleConditionChange}>Poor</button></li>
                      <li><button className="dropdown-item" type="button" value="" onClick={handleConditionChange}>All</button></li>
                    </ul>
                    {condition && <div className="text-center mt-2">{condition}</div>}
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
                      <li><button className="dropdown-item" type="button" value="250" onClick={handlePriceChange}>$250 and down</button></li>
                      <li><button className="dropdown-item" type="button" value="500" onClick={handlePriceChange}>$500 and down</button></li>
                      <li><button className="dropdown-item" type="button" value="" onClick={handlePriceChange}>All</button></li>
                    </ul>
                    {price && <div className="text-center mt-2">${price} and down</div>}
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
        </div>
        <div className="container">
          <Row xs={1} md={2} className="g-4">
            {items.map((i) => (<Col xs={6} md={5} key={i.itemId}>
              <Card border="dark" style={{ width: '18rem' }} >
                <Card.Header>{i.itemCategory}</Card.Header>
                <Card.Body>
                  <Card.Title>{i.name}</Card.Title>
                  <Card.Text>
                    <Card.Img variant="top" src={i.imageUrl} alt="image" rounded="true" />
                    <br></br>
                    <b>Description: </b>{i.description}<br />
                    <b>Condition: </b>{i.itemCondition}<br />
                    ${i.price}<br />
                    {i.location}<br />
                    {auth.user.hasRole("ADMIN") && <span>Public: {String(i.available)}</span>}
                  </Card.Text>
                  <button className="btn btn-primary" onClick={() => {
                    if (!localStorage.getItem("cartProductsForItems")) { localStorage.setItem("cartProductsForItems", JSON.stringify({})); };
                    setCount(count + 1);
                    setShow(true);
                    (localStorage.getItem("cartCount")) ? localStorage.setItem("cartCount", parseInt(localStorage.getItem("cartCount")) + 1) : localStorage.setItem("cartCount", 1);
                    let cart = JSON.parse(localStorage.getItem("cartProductsForItems"));
                    if (cart[i.itemId]) {
                      cart[i.itemId] += 1;
                    }
                    else {
                      cart[i.itemId] = 1;
                    }
                    localStorage.setItem("cartProductsForItems", JSON.stringify(cart));
                  }}>+</button><button className="btn btn-warning m-2" onClick={() => {
                    setShow(true);
                    setColorMsg("danger");
                    if (localStorage.getItem("cartProductsForItems")) {
                      let cart = JSON.parse(localStorage.getItem("cartProductsForItems"));
                      if (cart[i.itemId]) {
                        cart[i.itemId] -= 1;
                        setCount(count - 1);
                        localStorage.setItem("cartCount", count - 1);
                        console.log(cart[i.itemId]);
                      }
                      localStorage.setItem("cartProductsForItems", JSON.stringify(cart));
                    }
                  }}>-</button>
                  {auth.user.hasRole("ADMIN") &&
                    <button className='btn btn-danger' onClick={() => {
                      deleteById(i.itemId)
                        .then(() => updateItems())
                        .catch(() => history.push("/error"));
                    }}>Delete</button>}
                </Card.Body>
              </Card>
            </Col>))}
            {items.length === 0 &&
              <div className="alert alert-danger">
                <h3>No search results found</h3>
                <p>Please consider broadening search and/or changing location.</p>
              </div>
            }

          </Row>
        </div>
      </div>
    </>
  );
}

export default AllItemListings; 