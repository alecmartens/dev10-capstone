
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteById,findById } from "../services/serviceServices";
function ServiceConfirmDelete(){
    const [service, setService] = useState({});

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            history.push("/services");
        }
        findById(id)
            .then(setService)
            .catch(() => history.push("/invalid"));
    }, [])
    function handleDelete() {
        deleteById(service.serviceId)
            .then(() => history.push("/services"))
            .catch(() => history.push("/error"));
    }
    return (
        <div>
            <h2>Delete {service.name} {service.description} ?</h2>
            <div className="alert alert-danger">
                <p>
                    This will permanently delete {service.name} {service.description} .
                </p>
                <p>
                    Are you sure?
                </p>
            </div>
            <div>
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <Link to="/services" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    );
}
export default ServiceConfirmDelete; 