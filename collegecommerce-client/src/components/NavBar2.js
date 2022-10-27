import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar2() {
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
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar2;