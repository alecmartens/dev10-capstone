import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NotFound from "./components/NotFound";
import Invalid from "./components/Invalid";
import Error from "./components/Error";
import { useState } from "react";
import jwtDecode from 'jwt-decode';
import { useEffect } from "react";
import AuthContext from "./contexts/AuthContext";
// item imports
import ItemForm from "./components/item/ItemForm";
import ItemConfirmDelete from "./components/item/ItemConfirmDelete";
import ItemGrid from "./components/item/ItemGrid";
import UserItemGrid from "./components/item/UserItemGrid";
//service imports
import ServiceForm from "./components/ServiceForm";
import ServiceConfirmDelete from "./components/ServiceConfirmDelete";
import ServiceGrid from "./components/ServiceGrid";
import UserServiceGrid from "./components/service/UserServiceGrid";

// listing imports
// import ListingConfirmDelete from "./components/listing/ListingConfirmDelete";
// import ListingItemGrid from "./components/listing/ListingItemGrid";
// import ListingServiceGrid from "./components/listing/ListingServiceGrid";
// import ListingItemForm from "./components/listing/ListingItemForm";
// import ListingServiceForm from "./components/listing/ListingServiceForm";


import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";
import CartMessage from "./components/CartMessage";
import NavBar2 from "./components/NavBar2";
import Login from "./components/Login";
import Register from "./components/Register";
import PaymentSuccess from "./components/PaymentSucess"; 
// import Payment from "./components/Payment";
import UserProfile from "./components/user/UserProfile";
import UserForm from "./components/user/UserForm";
import Home from "./components/Home";
import LocationContext from "./contexts/LocationContext";
import AllServiceListings from "./components/AllServiceListings";
import AllItemListings from "./components/AllItemListings";
import PaymentForm from "./checkout/PaymentForm";
import UserConfirmDelete from "./components/user/UserConfirmDelete";
function App() {

  const LOCAL_STORAGE_TOKEN_KEY = "collegeCommerceToken";
  const LOCAL_STORAGE_LOCATION_KEY = "collegeCommerceLocation";

  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      login(token);
    }
    setRestoreLoginAttemptCompleted(true);

    const location = localStorage.getItem(LOCAL_STORAGE_LOCATION_KEY);
    if (location) {
      setLocation(location);
    }
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
    setLocation(null);
    localStorage.removeItem(LOCAL_STORAGE_LOCATION_KEY);
  }

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  }

  function setMyLocation(location) {
    localStorage.setItem(LOCAL_STORAGE_LOCATION_KEY, location);
    setLocation(location);
  }

  let myLocation = {
    location,
    setMyLocation
  };

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
    <AuthContext.Provider value={auth}>
      <LocationContext.Provider value={myLocation} >
        <BrowserRouter>
          <div className="">
            <NavBar2 />
            <Switch>
              <Route path={["/services/add", "/services/edit/:id"]}>
                <ServiceForm />
              </Route>
              <Route path="/services/delete/:id">
                <ServiceConfirmDelete />
              </Route>

              <Route exact path="/">
                <Home />
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
              {/* <Route path={["/listings/items/add", "/listings/items/edit/:id"]}>
                <ListingItemForm />
              </Route>

              <Route path="/listings/items">
                <div className="row">
                  <h1 className="col-9">Item Listings</h1> */}
                  {/* <div className="col-3">
                  <Link to="/listings/items/add" className="btn btn-primary">Add an Item Listing</Link>
                </div> */}
                {/* </div>
                <ListingItemGrid />
              </Route>

              <Route path={["/listings/services/add", "/listings/services/edit/:id"]}>
                <ListingServiceForm />
              </Route>
              <Route path="/listings/services">
                <div className="row">
                  <h1 className="col-9">Service Listings</h1> */}
                  {/* <div className="col-3">
                  <Link to="/listings/services/add" className="btn btn-primary">Add a Service Listing</Link>
                </div> */}
                {/* </div>
                <ListingServiceGrid />
              </Route> */}

              {/* <Route path="/listings">
                <div className="row">
                  <div className="col-3">
                    <Link to="/listings/items" className="btn btn-primary">View Item Listings</Link>
                  </div>
                  <div className="col-3">
                    <Link to="/listings/services" className="btn btn-primary">View Service Listings</Link>
                  </div>
                </div>
              </Route> */}

              <Route path="/cart">
                {/* { localStorage.removeItem("cartProducts") } */}
                <ShoppingCart />
              </Route>
              <Route path="/checkout">
                <CheckoutForm />
              </Route>
              <Route path="/services">
                <div className="row">
                  {/* <h1 className="col-9">services</h1> */}
                  {/* <div className="col-3">
            <Link to="/cart" className="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg><Badge bg="secondary">{localStorage.getItem("cartCount")}</Badge></Link>
              <Link to="/services/add" className="btn btn-primary">Add a service</Link>
            </div> */}
                </div>
                <ServiceGrid />
              </Route>
              <Route exact path="/user/:username">
                {user ? <UserProfile /> : <Login />}
              </Route>
              <Route exact path="/user/edit/:username">
                {user ? <UserForm /> : <Login />}
              </Route>
              <Route exact path="/user/delete/:username">
                {user ? <UserConfirmDelete /> : <Login />}
              </Route>

              <Route path="/user/:username/items/add">
                {user ? <ItemForm /> : <Login />}
              </Route>

              <Route path="/user/:username/items">
              {user ?
                <div><div className="col-3">
                  <Link to={`/user/${user.username}/items/add`} className="btn btn-primary">Add an Item</Link>
                </div>
                 <UserItemGrid /> </div>: <Login />}
              </Route>

              <Route path="/user/:username/services/add">
                {user ? <ServiceForm /> : <Login />}
              </Route>

              <Route path={`/user/:username/services`}>
              {user ?<div><div className="col-3">
                  <Link to={`/user/${user.username}/services/add`} className="btn btn-primary">Add a Service</Link>
                </div>
                 <UserServiceGrid /> </div>: <Login />}
              </Route>
                <Route path="/paymentform">
                  <PaymentForm />
                </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route path="/error">
                <Error />
              </Route>
              <Route path="/invalid">
                <Invalid />
              </Route>
              <Route path="/paymentmsg">
                <PaymentSuccess />
              </Route>
              <Route path="/cartmsg">
                <CartMessage color="success" productName="petcare" />
              </Route>
              {/* <Route path="/payment">
              <Payment /> 
            </Route> */}
              <Route path="/allservicelistings">
                <AllServiceListings /> 
              </Route>
              <Route path="/allitemlistings">
                <AllItemListings />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </LocationContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;