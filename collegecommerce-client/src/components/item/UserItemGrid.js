import { useEffect, useState, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { findAllItems, save, update } from "../../services/itemService";
import Item from "./Item";
import { Table } from "react-bootstrap";

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
        category: "",
        imageUrl: "",
        userId: "",
        available: false
    });

    // itemCondition: "",
    // category: "",

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
            {/* <div className="col-3">
                <Link to={`/user/${user.username}/items/add`} className="btn btn-primary">Add an Item</Link>
            </div> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Item Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Item Condition</th>
                        <th>Item Sold</th>
                        <th>Category</th>
                        <th>Image URL</th>
                        {/* <th>User ID</th> */}
                        <th>Is Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // items.map(i => (
                        userItems.map(i => (
                            <tr key={i.itemId}>
                                <td>{i.itemId}</td>
                                <td>{user.username}</td>
                                <td>{i.name}</td>
                                <td>{i.price}</td>
                                <td>{i.description}</td>
                                <td>{i.itemCondition}</td>
                                <td>{String(i.itemSold)}</td>
                                <td>{i.category}</td>
                                <td>{i.imageUrl}</td>
                                {/* <td>{i.userId}</td> */}
                                <td>{String(i.available)}</td>
                                <td><Link to={`/items/delete/${i.itemId}`} className="btn btn-danger me-2">Delete</Link></td>
                                <td><Link to={`/items/edit/${i.itemId}`} className="btn btn-secondary">Edit</Link></td>
                                <td><button className="btn btn-success me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This posts items for other users to see
                                    i.available = true;
                                    setItem(i);
                                    save(i);
                                    console.log(i);
                                }}>List Item</button></td>
                                <td><button className="btn btn-danger me-2" onClick={() => {
                                    //Set isAvailable to true, to post listing
                                    //This hides items for other users to see
                                    i.available = false;
                                    setItem(i);
                                    save(i);
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