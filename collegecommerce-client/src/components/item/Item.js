//FILE NOT USED
import { Link, Router } from "react-router-dom";

function Item({ item }) {
    return (
        <tr>
            <td>{item.itemId}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.itemCondition}</td>
            <td>{String(item.itemSold)}</td>
            <td>{item.category}</td>
            <td>{item.imageUrl}</td>
            <td>{item.userId}</td>
            <td>{String(item.available)}</td>
            <td><Link to={`/items/delete/${item.itemId}`} className="btn btn-danger me-2">Delete</Link></td>
            <td><Link to={`/items/edit/${item.itemId}`} className="btn btn-secondary">Edit</Link></td>
            <td><button className="btn btn-success me-2" onClick={() => {
                //Set isAvailable to true, to post listing
                //This posts listings for other users to see
                item.available = true;
                // setListing(l);
                console.log(item);
            }}>Show Item</button></td>
        </tr>
    );
}

export default Item;