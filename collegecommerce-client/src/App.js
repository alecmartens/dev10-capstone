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
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";

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
    user: user ? {...user} : null,
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
              <Link to="/services" className="btn btn-primary">View services</Link>
            </div>
          </div>
            </Route>
            <Route path="/cart">
             {/* { localStorage.clear() } */}
              <ShoppingCart />
            </Route>
            <Route path="/checkout">
             <CheckoutForm />
            </Route>
            <Route  path="/services">
            <div className="row">
            <h1 className="col-9">services</h1>
            <div className="col-3">
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
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;