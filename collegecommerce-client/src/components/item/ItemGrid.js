import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findAllItems } from "../../services/itemService";
import Item from "./Item";
import { Table } from "react-bootstrap";

import { Link, Router } from "react-router-dom";

import AuthContext from "../../contexts/AuthContext";

function ItemGrid({ handleEdit, handleDelete, setAvailable }) {
    const auth = useContext(AuthContext);
    //auth.user.username;

    const [items, setItems] = useState([]);

    const [item, setItem] = useState({
        itemId:0,
        name:"",
        price:0,
        description:"",
        itemCondition:"",
        itemSold:false,
        category:"",
        imageUrl:"",
        userId:"",
        available:false
    });

    const history = useHistory();

    useEffect(() => {
        findAllItems()
            .then(setItems)
            .catch(() => history.push("/error"));
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Item Id</th>
                        {/* <th>Username</th> */}
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Item Condition</th>
                        <th>Item Sold</th>
                        <th>Category</th>
                        <th>Image URL</th>
                        <th>User ID</th>
                        <th>Is Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(i => (
                            <tr key={i.itemId}>
                                <td>{i.itemId}</td>
                                {/* <td>{auth.user.username}</td> */}
                                <td>{i.name}</td>
                                <td>{i.price}</td>
                                <td>{i.description}</td>
                                <td>{i.itemCondition}</td>
                                <td>{String(i.itemSold)}</td>
                                <td>{i.category}</td>
                                <td>{i.imageUrl}</td>
                                <td>{i.userId}</td>
                                <td>{String(i.available)}</td>
                                <td><Link to={`/items/delete/${i.itemId}`} className="btn btn-danger me-2">Delete</Link></td>
                                <td><Link to={`/items/edit/${i.itemId}`} className="btn btn-secondary">Edit</Link></td>
                                <td><button className="btn btn-success me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This posts items for other users to see
                                    i.available = true;
                                    setItem(i);
                                    console.log(i);
                                }}>List Item</button></td>
                                <td><button className="btn btn-danger me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This hides items for other users to see
                                    i.available = false;
                                    setItem(i);
                                    console.log(i);
                                }}>Unlist Item</button></td>

                            </tr>
                        ))
                    }
                    {/* {items.map(i => <Item key={i.itemId} 
                    item={i} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete} />)} */}
                </tbody>
            </Table>
        </>
    );
}

export default ItemGrid;