import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { findAllListings } from "../../services/listingService";
import { findAllItems } from "../../services/itemService";
function ListingItemGrid({ handleEdit, handleDelete }) {
    const [listings, setListings] = useState([]);
    const [items, setItems] = useState([]);

    const history = useHistory();

    useEffect(() => {//Get all listings
        findAllListings()
            .then(setListings)
            .catch(() => history.push("/error"));
    }, [history]/*, []*/);

    useEffect(() => {//get all items
        findAllItems()
            .then(setItems)
            .catch(() => history.push("/error"));
    }/*, [history]*/)
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Listing Id</th>
                        <th>Is Available</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <td>Price</td>
                        <td>Description</td>
                        <th>Item Condition</th>
                        <th>Item Sold</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listings.map(l => (
                            <tr key={l.listingId}>
                                <td>{l.listingId}</td>
                                <td>{String(l.available)}</td>
                                <td>{l.userId}</td>
                                <td>{items.at(l.itemId).name}</td>
                                <td>{items.at(l.itemId).price}</td>
                                <td>{items.at(l.itemId).description}</td>
                                <td>{items.at(l.itemId).itemCondition}</td>
                                <td>{String(items.at(l.itemId).itemSold)}</td>
                                <td>{items.at(l.itemId).category}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}

export default ListingItemGrid;