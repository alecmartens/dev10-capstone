import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { findById, save } from "../services/serviceServices";
import { getUniversitiesByName } from "../services/universitiesService";

//user imports
import { findByUserName } from "../services/userService";
import AuthContext from "../contexts/AuthContext";

function ServiceForm() {
    //get user
    const auth = useContext(AuthContext);
    const [user, setUser] = useState("");
    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);

    const [service, setService] = useState({
        serviceId: 0,
        name: "",
        description: "",
        pricePerHour: 0,
        category: "OTHER",
        userId:user.userId,
        available:false,
        location:"North Dakota State University"

    });
    // userId: 0,
    // available: false

//TODO add location
    const [errs, setErrs] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    useEffect(() => {
        if (id) {
            findById(id)
                .then((s) => {
                    setService(s);
                    setLocation(s.location);
                })
                .catch(() => history.push("/invalid"));
        }
    }, []);

    function handleLocationChange(evt) {
        setLocation(evt.target.value);
        console.log(locations);

        if (location && location.length > 0) {
            getUniversitiesByName(location)
                .then((loc) => setLocations(loc))
                .catch((error) => console.log(error));
        } 
    }

    function handleChange(evt) {
        const nextService = { ...service };
        if(evt.target.name === "available"){
            nextService["available"] = !nextService["available"];
        } else if (evt.target.name === "location") {
            nextService[evt.target.name] = evt.target.value;
            setDisplayConfirmation(true);
        }
        else{
            nextService[evt.target.name] = evt.target.value;
        }
        setService(nextService);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const nextService = { ...service };
        // nextService.category = "DELIVERY";
        setService(nextService);
        console.log(service);
        service.userId = user.userId;
        // setService(nextService); 
        // console.log(service); 
        save(service)
            .then(() => history.push("/user/:username/services"))
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
                <h2>{id > 0 ? "Edit service" : "Add service"}</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name="name" id="name" className="form-control"
                        value={service.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name="description" id="description" className="form-control"
                        value={service.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pricePerHour" className="form-label">Price Per Hour</label>
                    <input type="number" name="pricePerHour" id="pricePerHour" className="form-control"
                        value={service.pricePerHour} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category"
                        value={service.category} type="text" onChange={handleChange}>
                        <option value="DELIVERY">DELIVERY</option>
                        <option value="REPAIR">REPAIR</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="available">Make Public</label>
                    {(service.available)?<select id="available" name="available"
                        value="YES" type="text" onChange={handleChange}>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select>:<select id="available" name="available"
                        value="NO" type="text" onChange={handleChange}>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                    </select> }
                    
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="isAvailable">Is Available</label>
                    <input type="text" name="isAvailable" id="isAvailable" className="form-control"
                        onChange={handleChange} />
                </div> */}
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
                    {locations && locations.length > 0 && <div className="alert alert-secondary mt-3">
                    <div className="list-group list-group-flush">
                        {locations.filter((loc, index) => index < 10).map(loc => <button type="button" className="list-group-item list-group-item-action" 
                                                                                key={loc.name} value={loc.name} name="location" onClick={handleChange}>{loc.name}</button>)}
                    </div>
                </div>}
                {service.location && displayConfirmation && <div className="alert alert-primary mt-3">
                    {service.location} added as service location.
                </div>}
                {errs.length !== 0 && <div className="alert alert-danger">
                    <ul>
                        {errs.map(err => <li key={err}>{err}</li>)}
                    </ul>
                </div>}
                <div className="mb-3">
                    <button className="btn btn-primary me-2" type="submit">Save</button>
                    <Link to="/user/:username/services" className="btn btn-warning">Cancel</Link>
                </div>
            </form>
        </div>
    );


}
export default ServiceForm; 