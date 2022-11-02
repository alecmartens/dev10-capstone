import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { findByUserName } from "../../services/userService";
import { deleteById } from "../../services/userService";

function UserConfirmDelete(){
    const [user, setUser] = useState({});

    const auth = useContext(AuthContext);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        findByUserName(auth.user.username)
        .then((user) => setUser(user))
        .catch(() => history.pushState("/error"))
    }, [])

    function handleDelete() {
        deleteById(user.userId)
            .then(() => history.push("/"))
            .catch(() => history.push("/error"));

        auth.logout();
    }

    return (
        <div>
            <h2>Delete {user.username}?</h2>
            <div className="alert alert-danger">
                <p>
                    This will permanently delete User {user.username}.
                </p>
                <p>
                    Are you sure?
                </p>
            </div>
            <div>
                <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
                <Link to={`/user/${user.username}`} className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    );
}
export default UserConfirmDelete; 