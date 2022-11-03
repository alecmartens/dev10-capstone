
import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteById,findById } from "../services/serviceServices";
//user imports
import { findByUserName } from "../services/userService";
import AuthContext from "../contexts/AuthContext";
function ServiceConfirmDelete(){
    //get user
    const auth = useContext(AuthContext);
    const [user, setUser] = useState("");
    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);

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
            .then(() => history.push(`/user/${user.username}/services`))
            .catch(() => history.push("/error"));
    }
    return (
        <div className="float-left bg-light col-5 m-4 p-4 rounded">
            <h2>Delete {service.name} {service.description} ?</h2>
            <div className="alert alert-danger">
                <p>
                    This will permanently delete {service.name} {service.description}. <br /> Are you sure?
                </p>
            </div>
            <div>
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <Link to="/user/:username/services" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    );
}
export default ServiceConfirmDelete; 