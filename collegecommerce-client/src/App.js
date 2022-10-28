import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ServiceForm from "./components/ServiceForm";
import ServiceConfirmDelete from "./components/ServiceConfirmDelete";
import NotFound from "./components/NotFound";
import Invalid from "./components/Invalid";
import Error from "./components/Error";
import ServiceGrid from "./components/ServiceGrid";
import { useState } from "react";
import jwtDecode from 'jwt-decode';
import { useEffect } from "react";
import AuthContext from "./contexts/AuthContext";
// item imports
import ItemForm from "./components/item/ItemForm";
import ItemConfirmDelete from "./components/item/ItemConfirmDelete";
import ItemGrid from "./components/item/ItemGrid";
// listing imports
import ListingConfirmDelete from "./components/listing/ListingConfirmDelete";
import ListingItemGrid from "./components/listing/ListingItemGrid";
import ListingServiceGrid from "./components/listing/ListingServiceGrid";

import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";
import CartMessage from "./components/CartMessage";
import { Badge } from "react-bootstrap";
import NavBar2 from "./components/NavBar2";
function App() {

  const LOCAL_STORAGE_TOKEN_KEY = "collegeCommerceToken";

  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);
  }, [])


  const login = (token) => {

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    const { sub: username, authorities: authoritiesString } = jwtDecode(token);

    const roles = authoritiesString.split(",");

    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      }
    };
    setUser(user);
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  }

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <div className="container">
          <NavBar2 />
          <Switch>
            <Route path={["/services/add", "/services/edit/:id"]}>
              <ServiceForm />
            </Route>
            <Route path="/services/delete/:id">
              <ServiceConfirmDelete />
            </Route>

            <Route exact path="/">
              <div className="row">
                <h1 className="col-9">Welcome</h1>
                <div className="col-3">
                  <Link to="/services" className="btn btn-primary">View Services</Link>
                  <br></br>
                  <br></br>
                  <Link to="/items" className="btn btn-primary">View Items</Link>
                  <br></br>
                  <br></br>
                  <Link to="/listings" className="btn btn-primary">View Listings</Link>
                </div>
              </div>
            </Route>

            {/* Item Paths */}
            <Route path={["/items/add", "/items/edit/:id"]}>
              <ItemForm />
            </Route>
            <Route path="/items/delete/:id">
              <ItemConfirmDelete />
            </Route>
            <Route path="/items">
              <div className="row">
                <h1 className="col-9">Items</h1>
                <div className="col-3">
                  <Link to="/items/add" className="btn btn-primary">Add an Item</Link>
                </div>
              </div>
              <ItemGrid />
            </Route>

            {/* Listing Paths */}
            {/* <Route path="/listings/delete/:id">
              <ListingConfirmDelete />
            </Route> */}
            <Route path="/listings/items">
              <h2>Items</h2>
              <div className="row">
                <h1 className="col-9">Item Listings</h1>
                <div className="col-3">
                  <Link to="/listings/items/add" className="btn btn-primary">Add an Item Listing</Link>
                </div>
                <h2 className="col-9">Items</h2>
              </div>
              <ListingItemGrid />
            </Route>
            
            <Route path="/listings">
              <div className="row">
                <div className="col-3">
                  <Link to="/listings/items" className="btn btn-primary">View Item Listings</Link>
                </div>
                <div className="col-3">
                  <Link to="/listings/services" className="btn btn-primary">View Service Listings</Link>
                </div>
              </div>
            </Route>


            <Route path="/cart">
              {/* { localStorage.removeItem("cartProducts") } */}
              <ShoppingCart />
            </Route>
            <Route path="/checkout">
              <CheckoutForm />
            </Route>
            <Route path="/services">
              <div className="row">
                <h1 className="col-9">services</h1>
                <div className="col-3">
                  <Link to="/cart" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg><Badge bg="secondary">{localStorage.getItem("cartCount")}</Badge></Link>
                  <Link to="/services/add" className="btn btn-primary">Add a service</Link>
                </div>
              </div>
              <ServiceGrid />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="/invalid">
              <Invalid />
            </Route>
            <Route path="/cartmsg">
              <CartMessage color="success" productName="petcare" />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
            {/* </Route> */}

          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;