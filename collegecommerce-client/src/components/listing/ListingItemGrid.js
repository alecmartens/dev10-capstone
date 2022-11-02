// //FILE NOT USED
// import { useEffect, useState } from "react";
// import { useHistory, Link } from "react-router-dom";
// import { findAllListings } from "../../services/listingService";
// import { findAllItems } from "../../services/itemService";
// import { Table } from "react-bootstrap";
// function ListingItemGrid({ handleEdit, handleDelete }) {
//     const [listings, setListings] = useState([]);
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const history = useHistory();

//     const [listing, setListing] = useState({
//         listingId: 0,
//         available: false,
//         userId: 0,
//         itemId: 0,
//         serviceId: 0
//     });

//     useEffect(() => {
//         setLoading(true);
//         const allListings = findAllListings();
//         const allItems = findAllItems();
//         Promise.all([allListings, allItems]).then(data => { setListings(data[0]); setItems(data[1]); }).catch(console.log);
//     }, []);

//     if (loading) {
//         <span>loading...</span>
//     }


//     return (
//         <>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Listing Id</th>
//                         <th>Is Available</th>
//                         <th>User Id</th>
//                         <th>Name</th>
//                         <td>Price</td>
//                         <td>Description</td>
//                         <th>Item Condition</th>
//                         <th>Item Sold</th>
//                         <th>Category</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         listings.map(l => (
//                             <tr key={l.listingId}>
//                                 <td>{l.listingId}</td>
//                                 <td>{String(l.available)}</td>
//                                 <td>{l.userId}</td>
//                                 <td>{items.at(l.itemId).name}</td>
//                                 <td>{items.at(l.itemId).price}</td>
//                                 <td>{items.at(l.itemId).description}</td>
//                                 <td>{items.at(l.itemId).itemCondition}</td>
//                                 <td>{String(items.at(l.itemId).itemSold)}</td>
//                                 <td>{items.at(l.itemId).category}</td>
//                                 <td><button className="btn btn-success me-2" onClick={() => {
//                                     //Set isAvailable to true, to post listing
//                                     //This posts listings for other users to see
//                                     l.available = true;
//                                     setListing(l);
//                                     console.log(l);
//                                 }}>Show Listing</button></td>
//                                 <td><button className="btn btn-danger me-2" onClick={() => {
//                                     //Set isAvailable to false, to hide listing
//                                     //This hides listings for other users not to see
//                                     l.available = false;
//                                     setListing(l);
//                                     console.log(l);
//                                 }}>Hide Listing</button></td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </Table>
//         </>
//     );
// }

// export default ListingItemGrid;