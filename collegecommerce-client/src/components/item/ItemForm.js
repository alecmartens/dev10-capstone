import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { findByItemId, save } from "../../services/itemService";
import { getUniversitiesByName } from "../../services/universitiesService";

//user imports
import { findByUserName } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";

function ItemForm() {
    //get user
    const auth = useContext(AuthContext);
    const [user, setUser] = useState("");
    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);

    const [item, setItem] = useState({
        itemId: 0,
        name: "",
        price: 0,
        description: "",
        itemCondition: "",
        itemSold: false,
        category: "",
        imageUrl: "",
        userId: user.userId,
        available: false,
        location: ""
    });
    const [errs, setErrs] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    useEffect(() => {
        if (id) {
            findByItemId(id)
                .then((i) => {
                    setItem(i);
                    setLocation(i.location);
                })
                .catch(() => history.push("/invalid"));

            console.log(location);
        }
    }, []);

    function handleLocationChange(evt) {
        setLocation(evt.target.value);

        if (location && location.length > 0) {
            getUniversitiesByName(location)
                .then((loc) => setLocations(loc))
                .catch((error) => console.log(error));
        } 
    }

    function handleChange(evt) {
        const nextItem = { ...item };
        if (evt.target.name === "isAvailable") {
            nextItem.isAvailable = evt.target.checked;
        } else if (evt.target.name === "location") {
            nextItem[evt.target.name] = evt.target.value;
            setDisplayConfirmation(true);
        }
        else {
            nextItem[evt.target.name] = evt.target.value;
        }
        setItem(nextItem);
    }
    

    function handleSubmit(evt) {
        evt.preventDefault();
        item.userId = user.userId;
        save(item)
            // .then(() => history.push("/user/:username/items"))
            .then(() => history.push(`/user/${user.username}/items`))
            .catch(errs => {
                if (errs) {
                    setErrs(errs);
                } else {
                    history.push("/error")
                }
            });
    }

    return (
        <div className="container w-50 p-4">
        <form onSubmit={handleSubmit}>
            <h2>{id > 0 ? "Edit item" : "Add item"}</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" id="name" className="form-control"
                    value={item.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="price" id="price" className="form-control"
                    value={item.price} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" name="description" id="description" className="form-control"
                    value={item.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="itemCondition" className="form-label">Item Condition</label>
                <input type="text" name="itemCondition" id="itemCondition" className="form-control"
                    value={item.itemCondition} onChange={handleChange} />
            </div>
            {/* Not sure if we want to allow user to say if an item is sold, should be done automatically */}
            {/* <div className="mb-3">
                <label htmlFor="itemSold" className="form-label">Item Sold</label>
                <input type="text" name="itemSold" id="itemSold" className="form-control"
                    value={item.itemSold} onChange={handleChange} />
            </div> */}
            {/* <fieldset>
                <legend>Item Sold</legend>
                <div className="mb-3">
                    <label htmlFor="itemSold" className="form-label">True</label>
                    <input type="radio" id="itemSold" name="itemSold"
                        value={item.itemSold} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemSold" className="form-label">False</label>
                    <input type="radio" id="itemSold" name="itemSold"
                        value={item.itemSold} onChange={handleChange}></input>
                </div>
            </fieldset> */}
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" name="category" id="category" className="form-control"
                    value={item.category} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                <input type="imageUrl" name="imageUrl" id="imageUrl" className="form-control"
                    onChange={handleChange} />
            </div>
            {/* <div className="form-check mb-3">
                <label htmlFor="isAvailable" className="form-check-label">Is Available</label>
                <input type="checkbox" name="isAvailable" id="isAvailable" className="form-check-input"
                    onChange={handleChange} />
            </div> */}
            <div>
                <label htmlFor="available">Make Public</label>
                {(item.available) ? <select id="available" name="available"
                    value="YES" type="text" onChange={handleChange}>
                    <option value="true">YES</option>
                    <option value="false">NO</option>
                    {/* <option value="YES">YES</option>
                    <option value="NO">NO</option> */}
                </select> : <select id="available" name="available"
                    value="NO" type="text" onChange={handleChange}>
                    <option value="true">YES</option>
                    <option value="false">NO</option>
                    {/* <option value="YES">YES</option>
                    <option value="NO">NO</option> */}
                </select>}
            </div>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">University</label>
                    <input
                        type="text"
                        onChange={handleLocationChange}
                        id="location"
                        name="location"
                        value={location}
                        className="form-control"
                        autoComplete="on"
                    />
                    </div>
                    {locations && <div className="alert alert-secondary mt-3">
                    <div className="list-group list-group-flush">
                        {locations.filter((loc, index) => index < 10).map(loc => <button type="button" className="list-group-item list-group-item-action" 
                                                                                key={loc.name} value={loc.name} name="location" onClick={handleChange}>{loc.name}</button>)}
                    </div>
                </div>}
                {item.location && displayConfirmation && <div className="alert alert-primary mt-3">
                    {item.location} added as item location.
                </div>}
            {/* {
                errs.length !== 0 && <div className="alert alert-danger">
                    <ul>
                        {errs.map(err => <li key={err}>{err}</li>)}
                    </ul>
                </div>
            } */}
            <div className="mb-3">
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <Link to="/items" className="btn btn-warning">Cancel</Link>
            </div>
        </form >
        </div>
    );
}

export default ItemForm;