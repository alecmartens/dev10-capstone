import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteById,findByItemId } from "../../services/itemService";
function ItemConfirmDelete(){
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
            .then(() => history.push("/items"))
            .catch(() => history.push("/error"));
    }
    return (
        <div>
            <h2>Delete {item.name} {item.description} ?</h2>
            <div className="alert alert-danger">
                <p>
                    This will permanently delete {item.name} {item.description} .
                </p>
                <p>
                    Are you sure?
                </p>
            </div>
            <div>
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <Link to="/items" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    );
}
export default ItemConfirmDelete; 