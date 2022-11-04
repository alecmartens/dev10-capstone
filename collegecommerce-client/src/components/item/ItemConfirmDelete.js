import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteById,findByItemId } from "../../services/itemService";
//user imports
import { findByUserName } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";
function ItemConfirmDelete(){
    //get user
    const auth = useContext(AuthContext);
    const [user, setUser] = useState("");
    useEffect(() => {
        findByUserName(auth.user.username)
            .then((user) => setUser(user))
            .catch(() => history.pushState("/error"))
    }, []);
    
    const [item, setItem] = useState({});

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            history.push("/items");
        }
        findByItemId(id)
            .then(setItem)
            .catch(() => history.push("/invalid"));
    }, [])
    function handleDelete() {
        deleteById(item.itemId)
            .then(() => history.push(`/user/${user.username}/items`))
            .catch(() => history.push("/error"));
    }
    return (
        <div className="float-left bg-light col-5 m-4 p-4 rounded">
            <h2>Delete {item.name} {item.description} ?</h2>
            <div className="alert alert-danger">
                <p>
                    This will permanently delete {item.name} {item.description}. <br /> Are you sure?
                </p>
            </div>
            <div>
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <Link to="/user/:username/items" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    );
}
export default ItemConfirmDelete; 