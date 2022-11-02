// import { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { findAllListings } from "../../services/listingService";
// import { findAll } from "../../services/serviceServices";
// import { Table } from "react-bootstrap";

// function ListingServiceGrid({ handleEdit, handleDelete }) {
//     const [listings, setListings] = useState([]);
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const history = useHistory();
//     useEffect(()=>{
//         setLoading(true); 
//         const allListings = findAllListings(); 
//         const allServices = findAll(); 
//         Promise.all([allListings, allServices]).then(data=>{setListings(data[0]); setServices(data[1]);}).catch(console.log); 
//     },[]); 

//     const [listing, setListing] = useState();

//     useEffect(() => {
//         setLoading(true);
//         const allListings = findAllListings();
//         const allServices = findAll();
//         Promise.all([allListings, allServices]).then(data => { setListings(data[0]); setServices(data[1]); }).catch(console.log);
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
//                         <th>Description</th>
//                         <th>Price per Hour</th>
//                         <th>Category</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {console.log("services" + services)}
//                     {console.log("listings" + listings)}
//                     {
//                         listings.map(l => (
//                             console.log(l),
//                             <tr key={l.listingId}>
//                                 <td>{l.listingId}</td>
//                                 <td>{String(l.available)}</td>
//                                 <td>{l.userId}</td>
//                                 <td>{services.at(l.serviceId).name}</td>
//                                 <td>{services.at(l.serviceId).description}</td>
//                                 <td>{services.at(l.serviceId).pricePerHour}</td>
//                                 <td>{services.at(l.serviceId).category}</td>
//                                 <td><button className="btn btn-success me-2" onClick={() => {
//                                     //Set isAvailable to true, to post listing
//                                     //This posts listings for other users to see
//                                     l.available = true;
//                                     setListing(l);
//                                     // console.log(l);
//                                 }}>Show Listing</button></td>
//                                 <td><button className="btn btn-danger me-2" onClick={() => {
//                                     //Set isAvailable to false, to hide listing
//                                     //This hides listings for other users not to see
//                                     l.available = false;
//                                     setListing(l);
//                                     // console.log(l);
//                                 }}>Hide Listing</button></td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </Table>
//         </>
//     );
// }

// export default ListingServiceGrid;