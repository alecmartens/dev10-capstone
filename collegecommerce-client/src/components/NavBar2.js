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
    <div className="border-bottom border-secondary text-white">
      <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand href="/">
          <img src={require("../images/college-commerce-logo-small.png")} alt="logo" /> 
          </Navbar.Brand>
          <Nav className="">
            <Nav.Link href="/allservicelistings" className='text-white'>Services</Nav.Link>
            <Nav.Link href="/allitemlistings" className='text-white'>Items</Nav.Link>
          </Nav>
          <div className="d-flex flex-column justfiy-content-around form-inline me-4">
            {auth.user && <div><b>Current User: </b>{auth.user.username} </div>}
            {myLocation.location && <div><b>Location: </b>{myLocation.location}</div>}
          </div>

          {auth.user ? (
            <form className="form-inline">
              <Link to={`/user/${auth.user.username}`} className="btn btn-info me-2">Profile</Link>
              <button className="btn btn-success " type="button" onClick={auth.logout}>Logout</button>
            </form>
          ) : (
            <form className="form-inline">
              <Link to="/login" className="btn btn-success " type="button">Login</Link>
            </form>
          )}
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar2;