import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findAllListings } from "../../services/listingService";
import { findAll } from "../../services/serviceServices";
function ListingServiceGrid({ handleEdit, handleDelete }) {
    const [listings, setListings] = useState([]);
    const [services, setServices] = useState([]);

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true); 
        const allListings = findAllListings(); 
        const allServices = findAll(); 
        Promise.all([allListings, allServices]).then(data=>{setListings(data[0]); setServices(data[1]);}).catch(console.log); 
    },[]); 

    if(loading){
        <span>loading...</span>
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Listing Id</th>
                        <th>Is Available</th>
                        <th>User Id</th>
                        <th>name</th>
                        <th>description</th>
                        <th>pricePerHour</th>
                        <th>category</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log("services" + services)}
                    {console.log("listings" + listings)}
                    {
                        listings.map(l => (
                            <tr key={l.listingId}>
                                <td>{l.listingId}</td>
                                <td>{String(l.available)}</td>
                                <td>{l.userId}</td>
                                <td>{services.at(l.serviceId).name}</td>
                                <td>{services.at(l.serviceId).description}</td>
                                <td>{services.at(l.serviceId).pricePerHour}</td>
                                <td>{services.at(l.serviceId).category}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
    // return (
    //     <div>ListingServiceGrid</div>
    // );
}

export default ListingServiceGrid;