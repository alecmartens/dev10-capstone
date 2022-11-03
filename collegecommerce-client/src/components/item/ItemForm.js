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
        itemCondition: "NEW",
        itemSold: false,
        itemCategory: "OTHER",
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
        <div className="bg-light p-4">
        <div className="container w-50 p-4 bg-white rounded-2">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">{id > 0 ? "Edit item" : "Add item"}</h2>
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
                    <label htmlFor="itemCondition" className="me-2">Condition:</label>
                    <select id="itemCondition" name="itemCondition"
                        value={item.itemCondition} type="text" onChange={handleChange}>
                        <option value="NEW">NEW</option>
                        <option value="GOOD">GOOD</option>
                        <option value="USED">USED</option>
                        <option value="POOR">POOR</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemCategory" className="me-2">Category:</label>
                    <select id="itemCategory" name="itemCategory"
                        value={item.itemCategory} type="text" onChange={handleChange}>
                        <option value="ART">ART</option>
                        <option value="BOOKS">BOOKS</option>
                        <option value="ELECTRONICS">ELECTRONICS</option>
                        <option value="CLOTHING">CLOTHING</option>
                        <option value="FURNITURE">FURNITURE</option>
                        <option value="GROCERY">GROCERY</option>
                        <option value="PET">PET</option>
                        <option value="SCHOOL">SCHOOL</option>
                        <option value="SPORTS">SPORTS</option>
                        <option value="TOYS">TOYS</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input type="imageUrl" name="imageUrl" id="imageUrl" className="form-control"
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="available" className="me-2">Make Public:</label>
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
                <div className="form-group mb-3 mt-2">
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
                    {locations && locations.length > 0 && <div className="alert alert-secondary mt-3">
                    <div className="list-group list-group-flush">
                        {locations.filter((loc, index) => index < 10).map((loc, index) => <button type="button" className="list-group-item list-group-item-action"
                            key={index} value={loc.name} name="location" onClick={handleChange}>{loc.name}</button>)}
                    </div>
                </div>}
                {item.location && displayConfirmation && <div className="alert alert-primary mt-3">
                    {item.location} added as item location.
                </div>}
            {
                errs.length !== 0 && <div className="alert alert-danger">
                    <ul>
                        {errs.map(err => <li key={err}>{err}</li>)}
                    </ul>
                </div>
            }
            <div className="mb-3">
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <Link to="/user/:username/items" className="btn btn-warning">Cancel</Link>
            </div>
        </form >
        </div>
        </div>
    );
}

export default ItemForm;