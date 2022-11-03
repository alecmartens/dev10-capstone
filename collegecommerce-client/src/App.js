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
              <Route path="/cart">
                {/* { localStorage.removeItem("cartProducts") } */}
                <ShoppingCart />
              </Route>
              <Route path="/checkout">
                <CheckoutForm />
              </Route>
              <Route path="/services">
                <div className="row">
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
                <div>
                 <UserItemGrid /> </div>: <Login />}
              </Route>

              <Route path="/user/:username/services/add">
                {user ? <ServiceForm /> : <Login />}
              </Route>

              <Route path={`/user/:username/services`}>
              {user ?<div>
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