import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import LocationContext from '../contexts/LocationContext';

function NavBar2() {

  const auth = useContext(AuthContext);
  const myLocation = useContext(LocationContext);

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">CollegeCommerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/services">Services</Nav.Link>
            {/* <Nav.Link href="/services/add">Add a Service</Nav.Link> */}
            <Nav.Link href="/items">Items</Nav.Link>
            {/* <Nav.Link href="/items/add">Add an Item</Nav.Link> */}
            <Nav.Link href="#">More</Nav.Link>
          </Nav>
          <div className="d-flex flex-column justfiy-content-around form-inline me-4">
        {auth.user && <div>Current User: {auth.user.username} </div>}
        {myLocation.location && <div>Location: {myLocation.location}</div>}
          </div>
          
          {auth.user ? (
            <form className="form-inline">
              <Link to={`/user/${auth.user.username}`} className="btn btn-outline-primary me-2">Profile</Link>
              <button className="btn btn-outline-success " type="button" onClick={auth.logout}>Logout</button>
            </form>
            ) : (
            <form className="form-inline">
              <Link to="/login" className="btn btn-outline-success " type="button">Login</Link>
            </form>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar2;