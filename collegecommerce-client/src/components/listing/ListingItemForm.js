import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { findById, findAllListings, save } from "../../services/listingService";
import { findAllItems } from "../../services/itemService";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
function ListingItemForm() {
    const [listing, setListing] = useState({
        listingId: 0,
        isAvailable: false,
        userId: 0,
        itemId: 0,
        serviceId: 0
    });
    const [errs, setErrs] = useState([]);
    const [listings, setListings] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    // useEffect(() => {
    //     if (id) {
    //         findById(id)
    //             .then(setListing)
    //             .catch(() => history.push("/invalid"));
    //     }
    // }, []);

    useEffect(() => {
        setLoading(true);
        const allListings = findAllListings();
        const allItems = findAllItems();
        Promise.all([allListings, allItems]).then(data => { setListings(data[0]); setItems(data[1]); }).catch(console.log);
    }, []);

    if (loading) {
        <span>loading...</span>
    }

    function handleChange(evt) {
        const nextListing = { ...listing };
        nextListing[evt.target.name] = evt.target.value;
        setListing(nextListing);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(listing)
            .then(() => history.push("/listings/items"))
            .catch(errs => {
                if (errs) {
                    setErrs(errs);
                } else {
                    history.push("/error")
                }
            });
    }

    const defaultItem = items[0];
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
        // <div class="dropdown">
        //     <button className="dropbtn">Dropdown</button>
        //     <div class="dropdown-content">
        //         <a href="#">Link 1</a>
        //         <a href="#">Link 2</a>
        //         <a href="#">Link 3</a>
        //     </div>
        // </div>
    );
    //<form onSubmit={handleSubmit}>
        //     <h2>{id > 0 ? "Edit item" : "Add item"}</h2>
        //     <div className="mb-3">
        //         <label htmlFor="name" className="form-label">Name</label>
        //         <input type="text" name="name" id="name" className="form-control"
        //             value={item.name} onChange={handleChange} />
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="price" className="form-label">Price</label>
        //         <input type="number" name="price" id="price" className="form-control"
        //             value={item.price} onChange={handleChange} />
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="description" className="form-label">Description</label>
        //         <input type="text" name="description" id="description" className="form-control"
        //             value={item.description} onChange={handleChange} />
        //     </div>
        //     <div className="mb-3">
        //         <label htmlFor="itemCondition" className="form-label">Item Condition</label>
        //         <input type="text" name="itemCondition" id="itemCondition" className="form-control"
        //             value={item.itemCondition} onChange={handleChange} />
        //     </div>
        // </form>

    // return (
    //     <div>ListingItemForm</div>
    // );
}

export default ListingItemForm;