import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { findById,findAll, save } from "../services/serviceServices";
function ServiceForm(){
    const [service, setService] = useState({
        serviceId: 0,
        name:"", 
        description:"", 
        pricePerHour:0, 
        category:""
    });
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
        nextService[evt.target.name] = evt.target.value;
        setService(nextService);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(service)
            .then(() => history.push("/services"))
            .catch(errs => {
                if (errs) {
                    setErrs(errs);
                } else {
                    history.push("/error")
                }
            });
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>{id > 0 ? "Edit service" : "Add service"}</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" name="name" id="name" className="form-control"
                    value={service.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" name="description" id="description" className="form-control"
                    value={service.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="pricePerHour" className="form-label">pricePerHour</label>
                <input type="number" name="pricePerHour" id="pricePerHour" className="form-control"
                    value={service.pricePerHour} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="category">category</label>
                <select id="category" name="category"
                    value={service.category} onChange={handleChange}>
                    <option>DELIVERY</option>
                    <option>REPAIR</option>
                    <option>OTHER</option>
                </select>
            </div>
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