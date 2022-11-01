import Nav from 'react-bootstrap/Nav';
import { Card, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { findAllItems } from '../services/itemService';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
function AllItemListings() {

  const [show, setShow] = useState(false);
  const [colorMsg, setColorMsg] = useState("success");
  const [items, setItems] = useState([]);
  const history = useHistory();
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
  useEffect(() => {
    const nextItems = [];
    findAllItems()
      .then((items) => {
        const nextItems = [];
        items.map((i) => { if (i.available) { nextItems.push(i) } });
        setItems(nextItems);
      })
      .catch(() => history.push("/error"));
  }, []);
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
          <h1 className="col-9">items</h1>
          <div className="col-3">
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
              <Card.Header>{i.category}</Card.Header>
              <Card.Body>
                <Card.Title>{i.name}</Card.Title>
                <Card.Text>
                  <Card.Img variant="top" src={i.imageUrl} alt="image" rounded="true" />
                  <br></br>
                  <b>Description:</b>{i.description}<br />
                  <b>Condition:</b>{i.itemCondition}<br />

                  ${i.price}
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
              </Card.Body>
            </Card>
          </Col>))}

        </Row>
      </div>
    </>
  );
}
export default AllItemListings; 