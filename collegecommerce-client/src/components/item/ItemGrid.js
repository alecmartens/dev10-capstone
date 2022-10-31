import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findAllItems } from "../../services/itemService";
import Item from "./Item";
import { Table } from "react-bootstrap";

import { Link, Router } from "react-router-dom";

function ItemGrid({ handleEdit, handleDelete }) {
    const [items, setItems] = useState([]);

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
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Item Condition</th>
                        <th>Item Sold</th>
                        <th>Category</th>
                        <th>Image URL</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(i => <Item key={i.itemId} item={i} handleEdit={handleEdit} handleDelete={handleDelete} />)}
                </tbody>
            </Table>
        </>
    );
}

export default ItemGrid;