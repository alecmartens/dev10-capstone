import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { findById, save } from "../services/serviceServices";

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
        available:false

    });
    // userId: 0,
    // available: false


    const [errs, setErrs] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            findById(id)
                .then(setService)
                .catch(() => history.push("/invalid"));
        }
    }, []);
    function handleChange(evt) {
        const nextService = { ...service };
        if(evt.target.name === "available"){
            nextService["available"] = !nextService["available"];
        }
        else{
            nextService[evt.target.name] = evt.target.value;
        }
        setService(nextService);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const nextService = { ...service };
        nextService.category = "DELIVERY";
        setService(nextService);
        console.log(service);
        service.userId = user.userId;
        // setService(nextService); 
        // console.log(service); 
        save(service)
            .then(() => history.push("/user/:username/services"))
            // .catch(errs => {
            //     if (errs) {
            //         setErrs(errs);
            //     } else {
            //         history.push("/error")
            //     }
            // });
    }
    return (
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
            <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="category"
                    value={service.category} type="text" onChange={handleChange}>
                    <option value="DELIVERY">DELIVERY</option>
                    <option value="REPAIR">REPAIR</option>
                    <option value="OTHER">OTHER</option>
                </select>
            </div>
            <div>
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
            {errs.length !== 0 && <div className="alert alert-danger">
                <ul>
                    {errs.map(err => <li key={err}>{err}</li>)}
                </ul>
            </div>}
            <div className="mb-3">
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <Link to="/services" className="btn btn-warning">Cancel</Link>
            </div>
        </form>
    );


}
export default ServiceForm; 