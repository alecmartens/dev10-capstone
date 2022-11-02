import { useEffect, useState, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { findAllItems, save, update } from "../../services/itemService";
import { Card, Row, Col, Form, Table } from 'react-bootstrap';
//user imports
import { findByUserName } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";

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
        <>
            <div className="row">
                <h1 className="col-9">Items</h1>
            </div>

            {/* <Table striped bordered hover> */}
            {/* <thead>
                    <tr>
                        {/* <th>Item Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Item Condition</th>
                        <th>Item Sold</th>
                        <th>Category</th>
                        <th>Image URL</th>
                        <th>User ID</th>
                        <th>Location</th>
                        <th>Is Available</th>
                    </tr>
                </thead> */}

            {/* <tbody> */}
            {/* xs={1} md={2} className="g-4" */}
            <Row className="justify-content-md-center">
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





            {/* // items.map(i => (
                        // userItems.map(i => (
                        //     <tr key={i.itemId}>
                        //         <td>{i.itemId}</td>
                        //         <td>{user.username}</td>
                        //         <td>{i.name}</td>
                        //         <td>{i.price}</td>
                        //         <td>{i.description}</td>
                        //         <td>{i.itemCondition}</td>
                        //         <td>{String(i.itemSold)}</td>
                        //         <td>{i.itemCategory}</td>
                        //         <td>{i.location}</td>
                        //         {/* <td>{i.imageUrl}</td> }
                        //         {/* <td>{i.userId}</td> }
                        //         <td>
                        //             {/* {String(i.available)} }
                        //             <Form>
                        //             {i.available ? <Form.Check
                        //                 name="toggle-switch"
                        //                 type="switch"
                        //                 id="switch"
                        //                 label=""  onChange={handleChange(i)} defaultChecked
                        //             /> :
                        //                 <Form.Check
                        //                     name="toggle-switch"
                        //                     type="switch"
                        //                     id="switch"
                        //                     label="" onChange={handleChange(i)}
                        //                 />}</Form>
                        //             </td>
                        //         <td><Link to={`/items/delete/${i.itemId}`} className="btn btn-danger me-2">Delete</Link></td>
                        //         <td><Link to={`/items/edit/${i.itemId}`} className="btn btn-secondary">Edit</Link></td>
                                

                        //     </tr>
                        // )) */}

            {/* {items.map(i => <Item key={i.itemId} 
                    item={i} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete} />)} */}
            {/* </tbody> */}
            {/* </Table> */}
        </>
    );
}

export default ItemGrid;