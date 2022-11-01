import Nav from 'react-bootstrap/Nav';
import { Card } from 'react-bootstrap';
function AllItemListings(){
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
        </div>
        </>
      );
}
export default AllItemListings; 