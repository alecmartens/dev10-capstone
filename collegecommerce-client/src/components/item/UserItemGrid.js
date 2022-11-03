import { useEffect, useState, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { findAllItems, save, update } from "../../services/itemService";
import { Card, Row, Col, Form, Table } from 'react-bootstrap';
//user imports
import { findByUserName } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";
import Nav from 'react-bootstrap/Nav';

function ItemGrid({ handleEdit, handleDelete, setAvailable }) {
    //get user
    const auth = useContext(AuthContext);
    const [user, setUser] = useState("");
    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);

    //items
    const [userItems, setUserItems] = useState([]);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState({
        itemId: 0,
        name: "",
        price: 0,
        description: "",
        itemCondition: "",
        itemSold: false,
        itemCategory: "",
        imageUrl: "",
        userId: "",
        available: false,
        location: ""
    });
    function handleChange(item) {
        return (evt) => {
            const nextitem = { ...item };
            nextitem["available"] = !nextitem.available;
            save(nextitem)
                .then(() => { console.log("updated"); history.push(`/user/${user.username}/items`) })
                .catch(errs => {
                    if (errs) {
                        console.log(errs);
                    } else {
                        history.push("/error")
                    }
                });


        }
    }

    const history = useHistory();

    useEffect(() => {
        findAllItems()
            .then(setItems)
            .catch(() => history.push("/error"));
    }, []);

    useEffect(() => {
        // console.log("Items Size: " + items.length);
        let userItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].userId == user.userId) {
                userItems.push(items[i]);
            }
        }
        setUserItems(userItems);
        // console.log("UserItems Size: " + userItems.length);
    }, [user]);

    return (
        <div className='bg-light'>
            <div className='mx-4 pt-2'>
            <div className='d-flex justify-content-between'>
            <h1>My Items & Services</h1>
                <div className="me-4">
                  <Link to={`/user/${user.username}/items/add`} className="btn btn-primary">Add an Item</Link>
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="/services">
            <Nav.Item>
                <Nav.Link href={`/user/${auth.user.username}/services`} className='border border-primary'>Services</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href={`/user/${auth.user.username}/items`} className='border border-primary'>Items</Nav.Link>
            </Nav.Item>
            </Nav>
            <Row className="justify-content-md-center mt-4">
                {
                    userItems.map(i => (
                        <Card border="dark" style={{ width: '18rem' }} key={i.itemId}>
                            <Card.Header>
                                <b>{i.itemCategory}</b>
                                <br></br>
                                <p>Is Available for Purchase?</p>
                                {i.available ? <Form.Check
                                    name="toggle-switch"
                                    type="switch"
                                    id="switch"
                                    label="" onChange={handleChange(i)} defaultChecked
                                /> :
                                    <Form.Check
                                        name="toggle-switch"
                                        type="switch"
                                        id="switch"
                                        label="" onChange={handleChange(i)}
                                    />}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i.name}</Card.Title>
                                <Card.Text>
                                    <Card.Img variant="top" src={i.imageUrl} alt="Image Unavailable" rounded="true" />
                                    <br></br>
                                    <b>Description: </b>{i.description}<br />
                                    <b>Condition: </b>{i.itemCondition}<br />
                                    <b>Location: </b><br />{i.location}<br />
                                    ${i.price}
                                    <br></br>
                                    <Link to={`/items/delete/${i.itemId}`} className="btn btn-danger me-2">Delete</Link>
                                    <Link to={`/items/edit/${i.itemId}`} className="btn btn-secondary">Edit</Link>
                                    <br></br>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Row>
            </div>
            </div>
    );
}

export default ItemGrid;