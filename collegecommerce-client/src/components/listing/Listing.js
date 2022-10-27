import { Link,Router } from "react-router-dom";
function Listing({listing}) {
    return (
        <tr>
        <td>{listing.listingId}</td>
        <td>{listing.isAvailable}</td>
        <td>{listing.userId}</td>
        <td>{listing.itemId}</td>
        <td>{listing.serviceId}</td>
        <td><Link to={`/listings/delete/${listing.listingId}`} className="btn btn-danger me-2">Delete</Link></td>
        <td><Link to={`/listings/edit/${listing.listingId}`} className="btn btn-secondary">Edit</Link></td>
    </tr>
    );
}

export default Listing;