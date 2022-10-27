import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findAll } from "../../services/itemService";
import Item from "./Item";

import { Link, Router } from "react-router-dom";

function ItemGrid({ handleEdit, handleDelete }) {
    const [items, setItems] = useState([]);

    const history = useHistory();

    useEffect(() => {
        findAll()
            .then(setItems)
            .catch(() => history.push("/error"));
    }, []);

    return (
        <>
            <table>
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
            </table>
        </>
    );
}

export default ItemGrid;