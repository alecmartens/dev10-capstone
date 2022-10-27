import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';

function NavBar2() {

  const auth = useContext(AuthContext);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">CollegeCommerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/services/add">Add Service</Nav.Link>
            <Nav.Link href="#">More</Nav.Link>
          </Nav>
          {auth.user ? (
            <form className="form-inline">
              <button className="btn btn-outline-success " type="button" onClick={auth.logout}>Logout</button>
            </form>
            ) : (
            <form className="form-inline">
              <Link to="/login" className="btn btn-outline-success " type="button">Login</Link>
            </form>
          )}
        </Container>
      </Navbar>
      {auth.user && <p>Current User: {auth.user.username}</p>}
    </>
  );
}

export default NavBar2;