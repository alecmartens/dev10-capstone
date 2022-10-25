import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ServiceForm from "./components/ServiceForm";
import ServiceConfirmDelete from "./components/ServiceConfirmDelete";
import NotFound from "./components/NotFound";
import Invalid from "./components/Invalid";
import Error from "./components/Error";
import ServiceGrid from "./components/ServiceGrid";
function App() {
  return (
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
  );
}

export default App;