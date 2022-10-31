// import { useEffect, useState } from "react";
import { Link, Router } from "react-router-dom";
import { findByItemId } from "../../services/itemService";
import { findById } from "../../services/serviceServices";

// const [item, setItem] = useState();

function Listing({ listing }) {
    if (listing.itemId > 0) {//This means the listing is an item
        // const item = findByItemId(listing.itemId);
        return (
            <tr>
                <td>{listing.listingId}</td>
                <td>{String(listing.available)}</td>
                <td>{listing.userId}</td>
                {/* <td>{item.name}</td> */}
                {/* <td>{item.price}</td> */}
                {/* <td>{item.description}</td> */}
                {/* <td>{item.itemCondition}</td> */}
                {/* <td>{String(item.itemSold)}</td> */}
                {/* <td>{item.category}</td> */}
                {/* <td>{item.imageUrl}</td> */}
                {/* <td><Link to={`/listings/delete/${listing.listingId}`} className="btn btn-danger me-2">Delete</Link></td>
                <td><Link to={`/listings/edit/${listing.listingId}`} className="btn btn-secondary">Edit</Link></td> */}
            </tr>
        );
    }

    // else if (listing.serviceId > 0) {//this means the listing is a service
    //     // const service = findById(listing.serviceId);//service
    //     return (
    //         <tr>
    //             <td>{listing.listingId}</td>
    //             <td>{String(listing.available)}</td>
    //             <td>{listing.userId}</td>
    //             {/* <td>{service.name}</td> */}
    //             {/* <td>{service.description}</td> */}
    //             {/* <td>{service.pricePerHour}</td>
    //             <td>{service.category}</td> */}
    //             {/* <td><Link to={`/listings/delete/${listing.listingId}`} className="btn btn-danger me-2">Delete</Link></td> */}
    //             {/* <td><Link to={`/listings/edit/${listing.listingId}`} className="btn btn-secondary">Edit</Link></td> */}
    //         </tr>
    //     );
    // }
    // else {//API should prevent this from happening

    // }
}

export default Listing;